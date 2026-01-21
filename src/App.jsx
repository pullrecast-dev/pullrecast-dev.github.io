import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const seasonData = {
  s1: {
    label: "Temporada 1 (2022-2023)",
    platform: "YouTube • Videocast",
    description: "21 episódios com convidados e cases de carreira.",
    cta: {
      label: "Abrir playlist completa",
      url: "https://www.youtube.com/playlist?list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
    },
    episodes: [
      {
        title:
          "Pull reCast #20 • KARINA TRONKOS @ninatalks, UX Designer, influencer, 5x campeã Apple Scholarship",
        url: "https://www.youtube.com/watch?v=Uo2N-dXP3EY&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title:
          "Pull reCast #19 • Pachi Parra, de babá a gestora da maior comunidade open-source do mundo",
        url: "https://www.youtube.com/watch?v=vdHVQCEeD4Q&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title:
          "Pull reCast #18 • Fillipe Dornelas, de estagiário em IA a criador de aplicativo de relacionamento",
        url: "https://www.youtube.com/watch?v=H21KZy3JS7I&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title:
          "Pull reCast #17 • Danne Aguiar, confiabilidade além do monitoramento na carreira e nas nuvens",
        url: "https://www.youtube.com/watch?v=d0a5PF9qKEs&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title:
          "Pull reCast #16 • Emiliano Agazzoni, da CM School, e o futuro do marketing de comunidades",
        url: "https://www.youtube.com/watch?v=6vJQLV8-gCc&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title: "Pull reCast #15 • Laura Damaceno, a carreira de uma cientista de dados",
        url: "https://www.youtube.com/watch?v=fubLgR1W47A&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title:
          "Pull reCast #14 • Sérgio Gama, CTO da GFT Technology - A revolução da IA generativa (parte 2)",
        url: "https://www.youtube.com/watch?v=qDB_d4fnTP4&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title:
          "Pull reCast #14 • Sérgio Gama, CTO da GFT Technology - A revolução da IA generativa (parte 1)",
        url: "https://www.youtube.com/watch?v=2YAvUBoz7jg&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title: "Pull reCast #13 • Felipe Prado, Hacker Ético há 23 anos",
        url: "https://www.youtube.com/watch?v=uaCA9x21Uds&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title:
          "Pull reCast #12 • Mari Moreira, Technical Writer - Uma jornalista que migrou para documentação técnica",
        url: "https://www.youtube.com/watch?v=aYEdWyQF02o&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title:
          "Pull reCast #11 • Caio Calado, Conversation Designer e Community Manager BotsBrasil",
        url: "https://www.youtube.com/watch?v=qaYTkgGBgiY&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title: "Pull reCast #10 • Beatriz Barbosa, User Experience Designer (UX)",
        url: "https://www.youtube.com/watch?v=M79cLCIV-8s&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title: "Pull reCast #9 • Otávio Santana, Java Champion do Open Source",
        url: "https://www.youtube.com/watch?v=lD4jngLc_4k&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title: "Pull reCast #8 • Lourenço Taborda, Senior Solution Architect",
        url: "https://www.youtube.com/watch?v=a374wK5_6v4&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title: "Pull reCast #7 • Mariana Mendonça, Tech Recruiter",
        url: "https://www.youtube.com/watch?v=xiXUxe2R5fs&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title:
          "Pull reCast #6 • Gilson Magalhães, presidente da Red Hat Brasil - A virtude do Open Source",
        url: "https://www.youtube.com/watch?v=rSJ5Hvq-Pt0&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title: "Pull reCast #5 • Samurai Brito - Quantumania: computação quântica pode salvar o mundo",
        url: "https://www.youtube.com/watch?v=ETPXYkN0G9I&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title:
          "Pull reCast #4 • Yara Mascarenhas - Comunidades: o que são, onde vivem, do que se alimentam",
        url: "https://www.youtube.com/watch?v=XKzsiiylNas&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title: "Pull reCast #3 • Matheus Haddad - Agile: além da salvação",
        url: "https://www.youtube.com/watch?v=Qavyj7Cp2sc&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title: "Pull reCast #2 • Renato Asse - NoCode e o fim da carreira dos desenvolvedores",
        url: "https://www.youtube.com/watch?v=eAk9guHYHkI&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
      {
        title: "Pull reCast #1 • Tiago Avelino - Quem não quer ser um milionário com Open Source",
        url: "https://www.youtube.com/watch?v=OdZ0vnV_F4E&list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK",
      },
    ],
  },
  s2: {
    label: "Temporada 2 (2024)",
    platform: "Instagram • Lives",
    description: "6 encontros ao vivo sobre IA na prática com convidados influentes.",
    cta: {
      label: "Abrir Instagram",
      url: "https://instagram.com/pullrecast",
    },
    episodes: [
      { title: "Live 01 • Papo livre com Sérgio Gama, Flávia Beo e Gil Giardelli", url: "https://www.instagram.com/p/C_JutjrRo18/" },
      { title: "Live 02 • Início de Carreias com @osestagiarios__ Anthony Thomas e Izailma Santos", url: "https://www.instagram.com/p/C_d9f49RlVp/" },
      { title: "Live 03 • Segurança com Gabriela Colaço", url: "https://www.instagram.com/p/C_tzUXnxBNV/" },
      { title: "Live 04 • Carreira Tech além do Senior com Bruno Souza, o Java Man", url: "https://www.instagram.com/p/DAB717JxJym/" },
      { title: "Live 05 • Dev-Enzo com Rodrigo Cardoso, o famoso @pokemaobr", url: "https://www.instagram.com/p/DAR7EMlxlgT/" },
      { title: "Live 06 • Encerramento com Alan e Matheus", url: "https://www.instagram.com/p/DAj0KR7xCC5/" },
    ],
  },
  s3: {
    label: "Temporada 3 (2025)",
    platform: "Spotify • Áudio",
    description: "40 episódios curtos, diretos, semanais, com participação da comunidade.",
    cta: {
      label: "Abrir no Spotify",
      url: "https://open.spotify.com/show/5zHeJgaZsj9WCMXfJoCVmD",
    },
    episodes: [
      {
        title: "2025 #40 - Retrospectiva IA 2025: comunidade, hype, agentes e o que realmente funcionou",
        url: "https://open.spotify.com/episode/5VmK3a2tb2pIGoBxoSKqnX",
      },
      {
        title: "2025 #39 - AGI não virá no Natal! Panetone, Maratona de IA, Palavras do Ano!",
        url: "https://open.spotify.com/episode/768CKf2uNP4B0ElbEGTHTz",
      },
      {
        title: "2025 #38 - Caos da IA: todo mundo usando, quase ninguém sabendo!",
        url: "https://open.spotify.com/episode/2QrMRAmKcwGwzDMKXMCFEY",
      },
      {
        title: "2025 #37 - Dezembrou! Maratona IA, Estratégia e Carreira: Como se Preparar para 2026",
        url: "https://open.spotify.com/episode/5Odar0j3qINjMTAuyiwmG0",
      },
      {
        title: "2025 #36 – Black Friday dos Agentes: IA, Excel com Claude e a Maratona que vai turbinar sua carreira em 2026",
        url: "https://open.spotify.com/episode/1iYFsnT4cKMiOKy7G3La7u",
      },
      {
        title: "2025 #35 – Bolha da IA, Nvidia, Google e o Futuro do Trabalho",
        url: "https://open.spotify.com/episode/0QzmGMyBMz7hJNG6bgaGYH",
      },
      {
        title: "2025 #34 - Maratona IA: delegar, criar e permanecer humano na era dos agentes autônomos",
        url: "https://open.spotify.com/episode/2hgwUu9VZdBls2dqxChvUH",
      },
      {
        title: "2025 #33 - Da “Vibe Coding” aos Robôs Domésticos: o que realmente está mudando com a IA",
        url: "https://open.spotify.com/episode/4EkjWkLDVhpqaawkZBwErh",
      },
      {
        title: "2025 #32 - IA no dia a dia: hábitos, futebol, browsers e o uso “do jeito certo”",
        url: "https://open.spotify.com/episode/7gpYiODlj4KpGWnaSaR0tZ",
      },
      {
        title: "2025 #31 - Navegadores com IA, Novos Grupos na Comunidade e o Futuro da Produtividade de forma certa!",
        url: "https://open.spotify.com/episode/2d8QX9nkg5TI3JgCQeL7S2",
      },
      {
        title: "2025 #30 - IA do Playground à Reunião de Diretoria: Como a IA está transformando todas as idades e todas as profissões",
        url: "https://open.spotify.com/episode/490TWLrBOcml0OybFOxSlz",
      },
      {
        title:
          "2025 #29 - Humanos Alucinando! Desleixo ao não revisar IA gera prejuízo! Mudança de API do Google impacta, e o futuro do trabalho impulsionado por IA",
        url: "https://open.spotify.com/episode/6TEQJcVtY3ZMTvwaV8Ws3P",
      },
      {
        title: "2025 #28 - IA sem cuidado vira ENTULHO digital, Granite 4, acabaram os dados gerados por pessoas!",
        url: "https://open.spotify.com/episode/30vL7LGX2CHiZpyjQTccJm",
      },
      {
        title: "2025 #27 - IA em Documentos PDF | Como estamos usando o ChatGPT? | Novo protocolo AP2 de pagamento de Agentes!",
        url: "https://open.spotify.com/episode/65nP0MolxfdmfJnRObms4M",
      },
      {
        title: "2025 #26 - Do TDC à Maratona de IA: Casos Reais, Agentes e Comunidade em Alta",
        url: "https://open.spotify.com/episode/2CzsWslfBD2LDomljfplDA",
      },
      {
        title: "2025 #25 - IA em alta: dos laboratórios da IBM ao TDC São Paulo",
        url: "https://open.spotify.com/episode/0rDDBWpyXXts5sMI8Cgd1s",
      },
      {
        title: "2025 #24 - podcast.ia.br chegou! Encontros, Agentes e os desafios de validar IA",
        url: "https://open.spotify.com/episode/22tuFHrE5giyZkRAfD5uoP",
      },
      {
        title: "2025 #23 - IA, Segurança, Workshops e Networking – Setembro Surreal!",
        url: "https://open.spotify.com/episode/3QEXtIBlzSp1rEptxGtvOf",
      },
      {
        title: "2025 #22 - Superinteligência em 2027? Desmistificando a ficção e mostrando a realidade da IA.",
        url: "https://open.spotify.com/episode/6qZBmAhWt5n6oJkirAwDU9",
      },
      {
        title: "2025 #21 - Sistemas Multi-agentes são o Futuro?",
        url: "https://open.spotify.com/episode/5YbhcAMrMAgm44NPowvpI3",
      },
      {
        title: "2025 #20 - GPT-5 é um Super Agente de IA? Não terceirize sua inteligência!",
        url: "https://open.spotify.com/episode/2xUZBnTioBMXoBKTszbIQf",
      },
      {
        title: "2025 #19 - A década dos Agentes! Palestra do criador do termo Vibe Coding",
        url: "https://open.spotify.com/episode/7MveWWgk8Fngm1TelGlgib",
      },
      {
        title: "2025 #18 - Busca de sites mudou! AI Action Plan dos EUA",
        url: "https://open.spotify.com/episode/3Ly8NtwErstZhWmlxsFC71",
      },
      {
        title: "2025 #17 - Agentes de IA com segurança e explicabilidade?",
        url: "https://open.spotify.com/episode/7A1Rm8G8BtbIa5EW1K54H2",
      },
      {
        title: "2025 #16 - Vibe Coding atrapalha desenvolvedores, Projetos de Agentes de IA tendem a falhar!",
        url: "https://open.spotify.com/episode/3tfJVmUkiSinxV3dOYz4p6",
      },
      {
        title: "2025 #15 - Futuro das Carreiras de TI | Agentes de IA seguros!",
        url: "https://open.spotify.com/episode/6asIarVE5kf5Wxq190fLzp",
      },
      {
        title: "2025 #14 - Agentes de IA vs Agentic AI, Brasil liderando no cenário Global?",
        url: "https://open.spotify.com/episode/2S0kj6sWSxH0PBEyYoloYn",
      },
      {
        title: "2025 #13 - Estamos emburrecendo? VIP grátis na AI Agents Conference",
        url: "https://open.spotify.com/episode/56J8YkA21Cdx8qtkF7U3ZN",
      },
      {
        title: "2025 #12 - Febraban Tech, Campinas Innovation Week, IBM Think",
        url: "https://open.spotify.com/episode/6a5gJWg5AXV8ICSux8mTB9",
      },
      {
        title: "2025 #11 - IA NÃO Pensa! Marca d'água e ética nos vídeos ultra-realistas",
        url: "https://open.spotify.com/episode/6zPxfrPhKtda9D1xpredce",
      },
      {
        title: "2025 #10 - DeepFake! Medo! Agentes pra negócios!",
        url: "https://open.spotify.com/episode/6m9Bj07eL5J48iJt3ayUzX",
      },
      {
        title: "2025 #09 - FOMO, Ansiedade, Agentes e Small models!",
        url: "https://open.spotify.com/episode/6OkazwmMpGn4oGC1q1ut8p",
      },
      {
        title: "2025 #08 - Explicando IA para os avós! Futuro incerto!",
        url: "https://open.spotify.com/episode/68IsmVZ5pqCAn8QoO8tBPu",
      },
      {
        title: "2025 #07 - Vibe coding, NotebookLM, IBM Think!",
        url: "https://open.spotify.com/episode/3psOe4GnHPmE3IaLZ1GKqM",
      },
      {
        title: "2025 #06 - WebSummit, aplicação de IA e Agentes! Estamos todos perdidos!",
        url: "https://open.spotify.com/episode/5LpeUjTtFxokVGFWmuZjCM",
      },
      {
        title: "2025 #05 - Disciplina, melhorando 0.001s por dia! Robôs Maratonistas! Eventos marcantes.",
        url: "https://open.spotify.com/episode/0Rn0jRtBp8b359dtYFiaYA",
      },
      {
        title: "2025 #04 - Quem manda na IA? TI ou funcionários? Hamburguer artesanal!",
        url: "https://open.spotify.com/episode/0yvZ0L4JsU2DZQWVFSF4Up",
      },
      {
        title: "2025 #03 - MCP, Agentes, RPA, Futuro Quântico!",
        url: "https://open.spotify.com/episode/38fhlyOUUSQ410VhEqlfrb",
      },
      {
        title: "2025 #02 - Agentes, CrewAI, Empreendedores, Filmes!",
        url: "https://open.spotify.com/episode/2d716T6ou63GvaYdOnL2nK",
      },
      {
        title: "2025 #01 - Voltamos! Eventos, casos, dados e muita IA",
        url: "https://open.spotify.com/episode/5fjg2P1tYa9pQn8CJUgxvy",
      },
    ],
    note: "Procurando episódios anteriores? A lista completa está no Spotify.",
  },
};

const navItems = [
  { label: "Manifesto", href: "/#manifesto" },
  { label: "Programas", href: "/#programas" },
  { label: "Hosts", href: "/#hosts" },
  { label: "Temporadas", href: "/#temporadas" },
  { label: "Parcerias", href: "/#parcerias" },
  { label: "Episódios", href: "/seasons" },
];

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(location.hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.pathname, location.hash]);

  return null;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderNavItems = (onClick) =>
    navItems.map((item) =>
      item.href.startsWith("/") ? (
        <Link key={item.label} to={item.href} onClick={onClick}>
          {item.label}
        </Link>
      ) : (
        <a
          key={item.label}
          href={item.href}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label}
        </a>
      )
    );

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/">
          <img src="/logo_pullrecast.png" alt="Logo PullreCast" />
        </Link>
        <nav className="site-nav">{renderNavItems()}</nav>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Abrir menu</span>
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        className={`menu-scrim ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />
      <div id="mobile-menu" className={`menu-panel ${menuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <span>Menu</span>
          <button type="button" className="menu-close" onClick={() => setMenuOpen(false)}>
            Fechar
          </button>
        </div>
        <nav className="menu-links">{renderNavItems(() => setMenuOpen(false))}</nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img src="/logo_pullrecast.png" alt="Logo PullreCast" />
          <p>
            PullreCast é o podcast de conversas sobre IA aplicada, carreira e
            comunidade. Conteúdo independente, feito para gente que constrói o
            futuro.
          </p>
        </div>
        <div>
          <h4>Plataformas</h4>
          <a href="https://podcast.ia.br" target="_blank" rel="noopener noreferrer">
            Spotify
          </a>
          <a
            href="https://www.youtube.com/@pullrecast"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
          <a href="https://instagram.com/pullrecast" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
        <div>
          <h4>Comunidade</h4>
          <a href="https://comece.ia.br" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href="https://www.linkedin.com/company/pullrecast/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:contato@podcast.ia.br" target="_blank" rel="noopener noreferrer">
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main id="conteudo">
      <section className="hero">
        <div className="hero-glow" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Podcast sobre IA aplicada</p>
            <h1>Conversas que viram estratégia real.</h1>
            <p>
              Um podcast independente que conecta IA, open source e carreira. Sem
              promessas vazias: só relatos, experimentos e decisões que funcionam na
              prática.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="https://comece.ia.br" target="_blank" rel="noopener noreferrer">
                Entre na comunidade
              </a>
              <a
                className="btn ghost"
                href="https://podcast.ia.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ouvir no Spotify
              </a>
              <a
                className="btn ghost"
                href="https://www.youtube.com/playlist?list=PLvTYEo3BhTV7Vc5UwHDemwZBEWxFTtANK"
                target="_blank"
                rel="noopener noreferrer"
              >
                Assistir 1ª temporada no Youtube
              </a>
              <a
                className="btn ghost"
                href="https://reserva.ink/pullrecast"
                target="_blank"
                rel="noopener noreferrer"
              >
                Loja de camiseta Reserva
              </a>
            </div>
            <div className="hero-links">
              <a
                className="icon-link"
                href="https://comece.ia.br"
                aria-label="Comunidade"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Comunidade</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M7.5 12a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm9 1.5a3 3 0 110-6 3 3 0 010 6z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M3 19c.7-2.4 2.9-4 5.5-4s4.8 1.6 5.5 4m1-2.5c1.2-1.1 2.8-1.7 4.5-1.7 2.1 0 3.9.9 5 2.4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
              <a
                className="icon-link"
                href="https://podcast.ia.br"
                aria-label="Spotify"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Spotify</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 3.6a8.4 8.4 0 100 16.8 8.4 8.4 0 000-16.8z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M7.2 9.6c3.3-1 6.6-.7 9.6.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7.6 12.4c2.6-.7 5.2-.4 7.6.7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 15c2-.4 3.9-.2 5.6.6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
              <a
                className="icon-link"
                href="https://www.youtube.com/@pullrecast?sub_confirmation=1"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">YouTube</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="3.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path d="M10 9l6 3-6 3z" fill="currentColor" />
                </svg>
              </a>
              <a
                className="icon-link"
                href="https://instagram.com/pullrecast"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Instagram</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8 4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="12" r="3.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a
                className="icon-link"
                href="https://www.linkedin.com/company/pullrecast/about/?viewAsMember=true"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4.5 9H8v11H4.5V9zm1.7-5.2a2 2 0 110 4 2 2 0 010-4zM11.5 9H15v1.5c.5-1 1.7-2 3.6-2 3 0 3.9 2 3.9 5.3V20H19v-5.3c0-1.4-.5-2.4-1.8-2.4-1 0-1.6.7-1.9 1.4-.1.3-.1.7-.1 1.2V20h-3.5V9z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="hero-visual">
            {/* <div className="signal-card">
              <span className="signal-title">ON AIR</span>
              <p>
                Episódios curtos, semanais, com convidados e insights para quem quer
                liderar a nova onda da IA.
              </p>
              <div className="signal-stats">
                <div>
                  <strong>+50k</strong>
                  <span>plays/mês</span>
                </div>
                <div>
                  <strong>+740%</strong>
                  <span>crescimento</span>
                </div>
              </div>
            </div> */}
            <a
              className="logo-frame"
              href="https://maratona.ia.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/chamada_2a_maratona.png" alt="Chamada da Maratona de IA" />
              <div className="logo-glow" />
            </a>
          </div>
        </div>
      </section>

      <section id="manifesto" className="section">
        <div className="container">
          <div className="section-head">
            <span className="tag">Manifesto</span>
            <h2>Clareza para o que importa.</h2>
            <p>
              O PullreCast nasceu para iluminar o que é real: impacto, carreira e
              comunidade. Não seguimos hype, seguimos resultado.
            </p>
          </div>
          <div className="card-grid">
            {[
              {
                title: "Sem filtro, com contexto",
                text: "Conversas diretas sobre agentes, modelos abertos, custo real e o que está por trás da tecnologia.",
              },
              {
                title: "Comunidade que participa",
                text: "Participações da audiência em áudio, os \"PRs\", e convidados de diferentes áreas da tecnologia.",
              },
              {
                title: "Carreira em primeiro plano",
                text: "Episódios para líderes, especialistas e pessoas em transição que querem construir longevidade.",
              },
            ].map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="stat-grid">
            {[
              { value: "+1600", label: "inscritos no YouTube" },
              { value: "+500h", label: "conteúdo publicado" },
              { value: "+273%", label: "crescimento no Spotify" },
              { value: "+740%", label: "crescimento da comunidade" },
            ].map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programas" className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="tag">Programas</span>
            <h2>Experiências para ativar IA na sua carreira.</h2>
            <p>
              Do palco ao laboratório, criamos formatos que aceleram times e
              profissionais com estratégia, prática e mentorias de alto nível.
            </p>
          </div>
          <div className="card-grid">
            {[
              {
                title: "Palestras & keynotes",
                text: "Narrativas que conectam tecnologia, produto e negócio com exemplos reais.",
                action: { label: "Solicitar agenda", url: "mailto:contato@podcast.ia.br?subject=Solicitar palestras" },
              },
              {
                title: "Mentorias IA",
                text: "Planos personalizados para líderes e squads que querem destravar IA sem ruído.",
                action: { label: "Entrar na lista", url: "mailto:contato@podcast.ia.br?subject=Agendar mentoria" },
              },
              {
                title: "Maratona IA",
                text: "Programa intensivo com desafios, entregas e suporte para aplicação real.",
                action: { label: "Conhecer maratona", url: "https://maratona.ia.br" },
              },
            ].map((item) => (
              <article key={item.title} className="card card-highlight">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a className="btn primary" href={item.action.url} target="_blank" rel="noopener noreferrer">
                  {item.action.label}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="hosts" className="section">
        <div className="container">
          <div className="section-head">
            <span className="tag">Hosts</span>
            <h2>Duas visões, uma voz.</h2>
            <p>
              Alan Braz e Matheus Bitencourt combinam laboratório e estratégia,
              engenharia e negócio para guiar cada episódio.
            </p>
          </div>
          <div className="host-grid">
            <article className="host-card">
              <img src="/host_alan.jpg" alt="Alan Braz" />
              <div>
                <h3>Alan Braz</h3>
                <span>AI Systems Architect • Open-Source Advocate</span>
                <p>
                  Mestre em Ciência da Computação, autor de papers e patentes, líder
                  de arquiteturas de IA e confiabilidade.
                </p>
                <div className="host-links">
                  <a
                    className="icon-link"
                    href="https://alan.ia.br"
                    aria-label="Website do Alan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">Website do Alan</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      <path
                        d="M3.6 12h16.8M12 3.6c2.6 2.8 2.6 13.9 0 16.8M12 3.6c-2.6 2.8-2.6 13.9 0 16.8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </a>
                  <a
                    className="icon-link"
                    href="https://www.linkedin.com/in/alanbraz"
                    aria-label="LinkedIn do Alan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">LinkedIn do Alan</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M4.5 9H8v11H4.5V9zm1.7-5.2a2 2 0 110 4 2 2 0 010-4zM11.5 9H15v1.5c.5-1 1.7-2 3.6-2 3 0 3.9 2 3.9 5.3V20H19v-5.3c0-1.4-.5-2.4-1.8-2.4-1 0-1.6.7-1.9 1.4-.1.3-.1.7-.1 1.2V20h-3.5V9z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    className="icon-link"
                    href="mailto:alan@podcast.ia.br"
                    aria-label="Email do Alan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">Email do Alan</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect
                        x="3.5"
                        y="6"
                        width="17"
                        height="12"
                        rx="2.4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M4 7l8 6 8-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
            <article className="host-card">
              <img src="/host_matheus.jpg" alt="Matheus Bitencourt" />
              <div>
                <h3>Matheus Bitencourt</h3>
                <span>Solution Architect • Professor de MBA</span>
                <p>
                  Especialista em Multi AI Agents, estratégia e governança. Mentor
                  de carreira e comunidades técnicas.
                </p>
                <div className="host-links">
                  <a
                    className="icon-link"
                    href="https://matheus.ia.br"
                    aria-label="Website do Matheus"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">Website do Matheus</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      <path
                        d="M3.6 12h16.8M12 3.6c2.6 2.8 2.6 13.9 0 16.8M12 3.6c-2.6 2.8-2.6 13.9 0 16.8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </a>
                  <a
                    className="icon-link"
                    href="https://www.linkedin.com/in/matheusbitencourt-ai"
                    aria-label="LinkedIn do Matheus"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">LinkedIn do Matheus</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M4.5 9H8v11H4.5V9zm1.7-5.2a2 2 0 110 4 2 2 0 010-4zM11.5 9H15v1.5c.5-1 1.7-2 3.6-2 3 0 3.9 2 3.9 5.3V20H19v-5.3c0-1.4-.5-2.4-1.8-2.4-1 0-1.6.7-1.9 1.4-.1.3-.1.7-.1 1.2V20h-3.5V9z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    className="icon-link"
                    href="mailto:matheus@podcast.ia.br"
                    aria-label="Email do Matheus"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">Email do Matheus</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect
                        x="3.5"
                        y="6"
                        width="17"
                        height="12"
                        rx="2.4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M4 7l8 6 8-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          </div>
          <div className="impact-banner">
            Parcerias com comunidades que movimentam milhares de desenvolvedores,
            trilhas do TDC e conselho de IA na FDC.
          </div>
        </div>
      </section>

      <section id="temporadas" className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="tag">Temporadas</span>
            <h2>Três plataformas, a mesma vibe.</h2>
            <p>Videocast, lives e áudio para quem quer acompanhar IA do jeito certo.</p>
          </div>
          <div className="season-grid">
            {[seasonData.s1, seasonData.s2, seasonData.s3].map((season) => (
              <article key={season.label} className="season-card">
                <span>{season.label}</span>
                <h3>{season.platform}</h3>
                <p>{season.description}</p>
              </article>
            ))}
          </div>
          <div className="cta-row">
            <Link className="btn primary" to="/seasons">
              Ver episódios completos
            </Link>
            <a className="btn ghost" href="https://podcast.ia.br" target="_blank" rel="noopener noreferrer">
              Abrir Spotify
            </a>
          </div>
        </div>
      </section>

      <section id="parcerias" className="section">
        <div className="container">
          <div className="section-head">
            <span className="tag">Parcerias</span>
            <h2>Marcas que querem conversar com líderes reais.</h2>
            <p>
              O PullreCast conecta audiências técnicas e decisoras com formatos
              estratégicos, eventos e episódios especiais.
            </p>
          </div>
          <div className="card-grid">
            {[
              {
                title: "Público técnico e decisor",
                text: "Brasil, EUA e Europa com foco em liderança técnica, dados e engenharia.",
              },
              {
                title: "Presença multiplataforma",
                text: "Spotify, YouTube, Instagram e comunidade ativa com conversas de alto nível.",
              },
              {
                title: "Formatos sob medida",
                text: "Cotas de episódios, séries especiais, workshops e eventos proprietários.",
              },
            ].map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="cta-row">
            <a className="btn primary" href="mailto:contato@podcast.ia.br?subject=Parceria" target="_blank" rel="noopener noreferrer">
              Falar com o time
            </a>
            {/* <a className="btn ghost" href="https://pullrecast.dev/" target="_blank" rel="noopener noreferrer">
              Mídia kit
            </a> */}
          </div>
        </div>
      </section>
    </main>
  );
}

function Seasons() {
  const [activeTab, setActiveTab] = useState("s1");
  const activeSeason = seasonData[activeTab];
  const tabs = useMemo(() => Object.entries(seasonData), []);

  return (
    <main id="conteudo" className="season-page">
      <section className="season-hero">
        <div className="container">
          <span className="eyebrow">Temporadas</span>
          <h1>Episódios por plataforma.</h1>
          <p>
            Explore cada formato do PullreCast. Cada aba abre um mapa de links
            diretos para ouvir ou assistir.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tab-list">
            {tabs.map(([key, season]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`tab-button ${key === activeTab ? "active" : ""}`}
              >
                {season.label}
              </button>
            ))}
          </div>
          <div className="season-panel">
            <div className="season-header">
              <div>
                <span className="tag">{activeSeason.label}</span>
                <h2>{activeSeason.platform}</h2>
                <p>{activeSeason.description}</p>
              </div>
              <a className="btn primary" href={activeSeason.cta.url} target="_blank" rel="noopener noreferrer">
                {activeSeason.cta.label}
              </a>
            </div>
            <ol className="episode-list">
              {activeSeason.episodes.map((episode) => (
                <li key={episode.url}>
                  <a href={episode.url} target="_blank" rel="noopener noreferrer">
                    {episode.title}
                  </a>
                </li>
              ))}
            </ol>
            {activeSeason.note ? <p className="episode-note">{activeSeason.note}</p> : null}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seasons" element={<Seasons />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
