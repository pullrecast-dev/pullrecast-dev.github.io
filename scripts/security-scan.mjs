import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SCAN_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx", ".html"]);
const EXCLUDE_DIRS = new Set(["node_modules", "dist", "build", ".git"]);

const findings = [];

function toLineNumber(content, index) {
  return content.slice(0, index).split("\n").length;
}

function addFinding(filePath, index, rule, message, snippet) {
  findings.push({
    filePath,
    line: toLineNumber(fs.readFileSync(filePath, "utf8"), index),
    rule,
    message,
    snippet,
  });
}

function walkDir(dir, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) {
        continue;
      }
      walkDir(path.join(dir, entry.name), out);
      continue;
    }
    const ext = path.extname(entry.name);
    if (SCAN_EXTENSIONS.has(ext)) {
      out.push(path.join(dir, entry.name));
    }
  }
}

function scanForTargetBlank(filePath, content) {
  const anchorRegex = /<a\b[^>]*>/gis;
  let match;
  while ((match = anchorRegex.exec(content))) {
    const tag = match[0];
    if (!/target\s*=\s*["']_blank["']/i.test(tag)) {
      continue;
    }
    const relMatch = tag.match(/rel\s*=\s*["']([^"']*)["']/i);
    if (!relMatch) {
      addFinding(
        filePath,
        match.index,
        "noopener-missing",
        "External links with target=\"_blank\" should include rel=\"noopener\" to prevent tabnabbing.",
        tag.trim()
      );
      continue;
    }
    const relParts = relMatch[1].split(/\s+/);
    if (!relParts.includes("noopener")) {
      addFinding(
        filePath,
        match.index,
        "noopener-missing",
        "External links with target=\"_blank\" should include rel=\"noopener noreferrer\".",
        tag.trim()
      );
    }
  }
}

function scanForInlineHtmlRisk(filePath, content) {
  const dangerousPatterns = [
    {
      rule: "dangerously-set-inner-html",
      regex: /dangerouslySetInnerHTML\s*=/g,
      message: "Use of dangerouslySetInnerHTML can introduce XSS if content is not sanitized.",
    },
    {
      rule: "inner-html-assignment",
      regex: /\binnerHTML\s*=/g,
      message: "Avoid assigning to innerHTML without strict sanitization.",
    },
    {
      rule: "document-write",
      regex: /\bdocument\.write\s*\(/g,
      message: "document.write can enable XSS and should be avoided.",
    },
    {
      rule: "eval-usage",
      regex: /\beval\s*\(/g,
      message: "Avoid eval; it can execute untrusted code.",
    },
    {
      rule: "new-function",
      regex: /\bnew\s+Function\s*\(/g,
      message: "Avoid new Function; it can execute untrusted code.",
    },
  ];

  for (const pattern of dangerousPatterns) {
    pattern.regex.lastIndex = 0;
    let match;
    while ((match = pattern.regex.exec(content))) {
      addFinding(filePath, match.index, pattern.rule, pattern.message, match[0]);
    }
  }
}

function scanForInsecureHttp(filePath, content) {
  const httpRegex = /\bhttp:\/\//g;
  let match;
  while ((match = httpRegex.exec(content))) {
    addFinding(
      filePath,
      match.index,
      "insecure-http",
      "Use https:// for external resources to avoid MITM risks.",
      "http://"
    );
  }
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  scanForTargetBlank(filePath, content);
  scanForInlineHtmlRisk(filePath, content);
  scanForInsecureHttp(filePath, content);
}

function buildFileList() {
  const files = [];
  const srcDir = path.join(ROOT, "src");
  const publicDir = path.join(ROOT, "public");
  const indexFile = path.join(ROOT, "index.html");

  if (fs.existsSync(srcDir)) {
    walkDir(srcDir, files);
  }
  if (fs.existsSync(publicDir)) {
    walkDir(publicDir, files);
  }
  if (fs.existsSync(indexFile)) {
    files.push(indexFile);
  }

  return files;
}

function report() {
  if (findings.length === 0) {
    console.log("Security scan results: no findings.");
    return;
  }

  console.log("Security scan results:");
  for (const finding of findings) {
    const relPath = path.relative(ROOT, finding.filePath);
    console.log(
      `- [${finding.rule}] ${relPath}:${finding.line} ${finding.message} (${finding.snippet})`
    );
  }
  console.log(`Total findings: ${findings.length}`);
}

const files = buildFileList();
for (const filePath of files) {
  scanFile(filePath);
}

report();
process.exit(findings.length > 0 ? 1 : 0);
