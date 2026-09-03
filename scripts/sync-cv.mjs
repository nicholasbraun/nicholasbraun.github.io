/**
 * Pulls the public CV from the local Reactive Resume instance into
 * public/nicholas-braun-cv.pdf, which is committed and shipped by the normal
 * GitHub Pages deploy.
 *
 * Reactive Resume runs in Docker on this machine only, so CI can't reach it —
 * the PDF has to be generated here and committed rather than built in Actions.
 *
 * Usage: npm run sync-cv
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MCP_CONFIG =
  process.env.RXRESUME_MCP_CONFIG ??
  path.join(homedir(), "Documents/bewerbung/freelance/.mcp.json");

// The resume is found by tag rather than id so that rebuilding it in the app
// doesn't silently break this script.
const TAG = "public";

const OUT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "nicholas-braun-cv.pdf",
);

function fail(message) {
  console.error(`sync-cv: ${message}`);
  process.exit(1);
}

async function readConfig() {
  if (!existsSync(MCP_CONFIG)) {
    fail(
      `no MCP config at ${MCP_CONFIG} (set RXRESUME_MCP_CONFIG to override)`,
    );
  }
  let cfg;
  try {
    cfg = JSON.parse(await readFile(MCP_CONFIG, "utf8"));
  } catch (error) {
    fail(`could not read ${MCP_CONFIG}: ${error.message}`);
  }
  const server = cfg.mcpServers?.["reactive-resume"];
  if (!server?.url) fail(`no "reactive-resume" server in ${MCP_CONFIG}`);
  return { url: server.url, key: server.headers?.["x-api-key"] };
}

/**
 * Confirms the port actually belongs to Reactive Resume. `nuxt dev` binds
 * localhost:3000 on this machine, so an unchecked request can reach the blog's
 * own dev server and fail in ways that look like a bad API key.
 */
async function assertInstanceIsUp(baseUrl) {
  let res;
  try {
    res = await fetch(`${baseUrl}/api/health`, {
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    fail(
      `no response from ${baseUrl} — start it with ` +
        `(cd ~/Documents/bewerbung/freelance/rxresume && docker compose up -d)`,
    );
  }
  const body = await res.json().catch(() => ({}));
  if (body.service !== "reactive-resume") {
    fail(
      `${baseUrl} answered, but it is not Reactive Resume ` +
        `(service: ${body.service ?? "unknown"}) — something else holds that port`,
    );
  }
}

async function mcp(url, key, tool, args = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": key,
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name: tool, arguments: args },
    }),
    signal: AbortSignal.timeout(120000),
  });
  const payload = await res.json();
  if (payload.error) fail(`${tool}: ${payload.error.message}`);
  const text = payload.result.content[0].text;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

const { url, key } = await readConfig();
const baseUrl = new URL(url).origin;
await assertInstanceIsUp(baseUrl);

const resumes = await mcp(url, key, "list_resumes", { tags: [TAG] });
const matches = Array.isArray(resumes) ? resumes : [];
if (matches.length === 0) fail(`no resume tagged "${TAG}"`);
if (matches.length > 1) {
  fail(
    `${matches.length} resumes tagged "${TAG}": ` +
      matches.map((r) => r.slug).join(", "),
  );
}

const [resume] = matches;
const { downloadUrl } = await mcp(url, key, "download_resume_pdf", {
  id: resume.id,
});

const res = await fetch(downloadUrl, { signal: AbortSignal.timeout(120000) });
if (!res.ok) fail(`download failed: HTTP ${res.status}`);
const pdf = Buffer.from(await res.arrayBuffer());

// A PDF that renders as an error page would still be written happily, so check
// the magic bytes before overwriting a good copy.
if (!pdf.subarray(0, 5).equals(Buffer.from("%PDF-"))) {
  fail(`downloaded ${pdf.length} bytes, but they are not a PDF`);
}

/**
 * Every render embeds a fresh random trailer /ID and a fresh creation
 * timestamp, so two PDFs of identical content never compare equal byte for
 * byte. Blanking both keeps an unchanged CV from producing a 53 KB binary diff
 * on every sync. Renders are otherwise deterministic.
 */
function withoutVolatileFields(buffer) {
  return Buffer.from(
    buffer
      .toString("latin1")
      .replace(/\/ID\s*\[[^\]]*\]/g, "/ID []")
      .replace(/\(D:\d{14}[Z+\-\d']*\)/g, "(D:)"),
    "latin1",
  );
}

const previous = existsSync(OUT) ? await readFile(OUT) : null;
const size = `${(pdf.length / 1024).toFixed(1)} KB`;
const relative = path.relative(process.cwd(), OUT);

if (
  previous &&
  withoutVolatileFields(previous).equals(withoutVolatileFields(pdf))
) {
  console.log(`sync-cv: unchanged (${size})`);
} else {
  await writeFile(OUT, pdf);
  const verb = previous ? "updated" : "wrote";
  const hint = previous ? " — commit it to publish" : "";
  console.log(`sync-cv: ${verb} ${relative} (${size})${hint}`);
}
