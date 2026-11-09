#!/usr/bin/env node
// Adiciona à Temporada 4 (seasonData.s4 em src/App.jsx) os episódios novos do feed RSS.
// Uso: npm run episodes            -> atualiza o arquivo
//      npm run episodes -- --dry-run -> só mostra o que seria adicionado
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const RSS_URL = "https://anchor.fm/s/b411a8c8/podcast/rss";
const SHOW_URL = "https://open.spotify.com/show/5zHeJgaZsj9WCMXfJoCVmD";
const APP_FILE =
  process.env.APP_FILE ?? fileURLToPath(new URL("../src/App.jsx", import.meta.url));
const DRY_RUN = process.argv.includes("--dry-run");

const decode = (s) =>
  s
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/[⁠​]/g, "") // word joiners que o Spotify insere nos títulos
    .trim();

const epNumber = (title) => Number(title.match(/^#(\d+)/)?.[1] ?? NaN);

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 pullrecast-site" } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.text();
}

// Episódios do RSS: { n, title, link }
async function rssEpisodes() {
  const xml = await fetchText(RSS_URL);
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, item]) => ({
      title: decode(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ""),
      link: decode(item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? ""),
    }))
    .map((e) => ({ ...e, n: epNumber(e.title) }))
    .filter((e) => Number.isFinite(e.n));
}

// Links open.spotify.com por número do episódio (a página do programa traz os ~12 mais recentes)
async function spotifyLinks() {
  const links = new Map();
  try {
    const html = await fetchText(SHOW_URL);
    for (const [, id, inner] of html.matchAll(/href="\/episode\/([A-Za-z0-9]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
      const n = epNumber(decode(inner.replace(/<[^>]+>/g, "")));
      if (Number.isFinite(n) && !links.has(n)) links.set(n, `https://open.spotify.com/episode/${id}`);
    }
  } catch (err) {
    console.warn(`Aviso: não consegui ler a página do Spotify (${err.message}); usando links do RSS.`);
  }
  return links;
}

async function main() {
  const src = await readFile(APP_FILE, "utf8");

  const s4Start = src.indexOf("  s4: {");
  if (s4Start < 0) throw new Error("Bloco s4 não encontrado em App.jsx");
  const arrStart = src.indexOf("episodes: [", s4Start);
  const arrEnd = src.indexOf("\n    ]", arrStart);
  if (arrStart < 0 || arrEnd < 0) throw new Error("Lista de episódios do s4 não encontrada");

  const existing = [...src.slice(arrStart, arrEnd).matchAll(/title: "#(\d+)/g)].map((m) => +m[1]);
  const maxN = Math.max(...existing);

  const [episodes, links] = await Promise.all([rssEpisodes(), spotifyLinks()]);
  const fresh = episodes.filter((e) => e.n > maxN).sort((a, b) => a.n - b.n);

  if (!fresh.length) {
    console.log(`Nada novo: o site já vai até o #${maxN}.`);
    return;
  }

  const entries = fresh.map((e) => {
    const url = links.get(e.n) ?? e.link.replace("podcasters.spotify.com", "creators.spotify.com");
    if (!links.has(e.n)) console.warn(`Aviso: #${e.n} sem link open.spotify.com; usando ${url}`);
    return `      {\n        title: ${JSON.stringify(e.title)},\n        url: ${JSON.stringify(url)},\n      },`;
  });

  for (const e of fresh) console.log(`+ ${e.title}`);
  if (DRY_RUN) {
    console.log(`(dry-run) ${fresh.length} episódio(s) seriam adicionados.`);
    return;
  }

  // Garante vírgula após o último item existente antes de inserir
  let before = src.slice(0, arrEnd).replace(/\}\s*$/, (m) => m.replace("}", "},"));
  await writeFile(APP_FILE, `${before}\n${entries.join("\n")}${src.slice(arrEnd)}`);
  console.log(`${fresh.length} episódio(s) adicionados a ${APP_FILE}.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
