import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { chromium } from "playwright";
import pRetry from "p-retry";
import { z } from "zod";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(helmet());
app.use(rateLimit({ windowMs: 60_000, max: 20 }));

// Raiz e health para evitar "Application loading"
app.get("/", (_req, res) => res.type("text/plain").send("ok"));
app.get("/health", (_req, res) => res.json({ ok: true }));

const ORIGIN = "https://www.radarsebrae.com.br";

async function withBrowser(fn) {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 900 },
    userAgent: "Mozilla/5.0 Chrome"
  });
  const page = await context.newPage();
  try {
    const out = await fn(page);
    await context.close();
    await browser.close();
    return out;
  } catch (e) {
    await context.close();
    await browser.close();
    throw e;
  }
}

async function waitStable(page) {
  await page.goto(ORIGIN, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => {});
}
async function clickSearch(page) {
  await page.getByRole("button", { name: /buscar|pesquisar|aplicar|ver/i }).first().click().catch(() => {});
  await page.waitForLoadState("networkidle").catch(() => {});
}
async function setLocal(page, uf, municipio) {
  const ufField = page.getByLabel(/UF/i).or(page.getByPlaceholder(/UF/i));
  const munField = page.getByLabel(/Munic|Cidade/i).or(page.getByPlaceholder(/Munic|Cidade/i));
  await ufField.fill(uf).catch(() => {});
  await munField.fill(municipio).catch(() => {});
}

const Body = z.object({
  tipo: z.enum(["opportunities", "demographics", "competition"]),
  uf: z.string().length(2),
  municipio: z.string().min(2),
  setor: z.string().optional(),
  termo: z.string().optional(),
  cnae: z.string().optional(),
  raio_km: z.number().optional()
});

app.post("/api/radar", async (req, res) => {
  const body = Body.parse(req.body);
  try {
    const data = await pRetry(
      () =>
        withBrowser(async (page) => {
          await waitStable(page);

          if (body.tipo === "opportunities") {
            await page.getByRole("link", { name: /negócios|oportunidades/i }).first().click().catch(() => {});
            await page.waitForLoadState("networkidle").catch(() => {});
            await setLocal(page, body.uf, body.municipio);
            if (body.setor) {
              const setor = page.getByLabel(/Setor|Segmento/i).or(page.getByPlaceholder(/Setor|Segmento/i));
              await setor.fill(body.setor).catch(() => {});
            }
            if (body.termo) {
              const termo = page.getByLabel(/Busca|Pesquisar|Termo/i).or(page.getByPlaceholder(/Buscar|Pesquisar/i));
              await termo.fill(body.termo).catch(() => {});
            }
            await clickSearch(page);

            const rows = await page.locator("table tbody tr").all().catch(() => []);
            let resultados = [];
            if (rows.length) {
              for (const r of rows.slice(0, 60)) resultados.push({ cols: await r.locator("td").allInnerTexts() });
            } else {
              const cards = await page.locator('[role="article"], .card, .MuiCard-root').all().catch(() => []);
              for (const c of cards.slice(0, 60)) {
                const title = await c.getByRole("heading").first().textContent().catch(() => null);
                const text = await c.textContent().catch(() => null);
                if (title || text) resultados.push({ title: title?.trim() ?? null, text: text?.trim() ?? null });
              }
            }
            return { origem: "opportunities", filtros: body, resultados };
          }

          if (body.tipo === "demographics") {
            await page.getByRole("link", { name: /público|consumidor|demografia/i }).first().click().catch(() => {});
            await page.waitForLoadState("networkidle").catch(() => {});
            await setLocal(page, body.uf, body.municipio);
            await clickSearch(page);

            const sections = await page.locator("section,[role='region']").all().catch(() => []);
            const paineis = [];
            for (const s of sections) {
              const h = await s.getByRole("heading").first().textContent().catch(() => null);
              const nums = await s.locator("strong,.value,.metric,.counter").allInnerTexts().catch(() => []);
              const txt = await s.textContent().catch(() => "");
              if (h && (nums.length || txt)) {
                paineis.push({
                  titulo: h.trim(),
                  valores: nums.map((t) => t.trim()).filter(Boolean),
                  texto: (txt || "").trim().slice(0, 1500)
                });
              }
              if (paineis.length > 40) break;
            }
            return { origem: "demographics", filtros: { uf: body.uf, municipio: body.municipio }, paineis };
          }

          if (body.tipo === "competition") {
            await page.getByRole("link", { name: /concorr(ê|e)ncia|empresas|estabelecimentos/i }).first().click().catch(() => {});
            await page.waitForLoadState("networkidle").catch(() => {});
            await setLocal(page, body.uf, body.municipio);
            if (body.cnae) {
              const cnae = page.getByLabel(/CNAE|Atividade/i).or(page.getByPlaceholder(/CNAE|Atividade/i));
              await cnae.fill(body.cnae).catch(() => {});
            }
            if (body.raio_km) {
              const raio = page.getByLabel(/raio|dist(â|a)ncia/i).or(page.getByPlaceholder(/km/i));
              await raio.fill(String(body.raio_km)).catch(() => {});
            }
            await clickSearch(page);

            const rows = await page.locator("table tbody tr").all().catch(() => []);
            let empresas = [];
            if (rows.length) {
              for (const r of rows.slice(0, 100)) empresas.push({ cols: await r.locator("td").allInnerTexts() });
            } else {
              const cards = await page.locator('[role="article"], .card, .MuiCard-root').all().catch(() => []);
              for (const c of cards.slice(0, 100)) {
                const title = await c.getByRole("heading").first().textContent().catch(() => null);
                const lines = ((await c.textContent().catch(() => "")) || "")
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean);
                empresas.push({ titulo: title?.trim() ?? null, linhas: lines });
              }
            }
            return {
              origem: "competition",
              filtros: { uf: body.uf, municipio: body.municipio, cnae: body.cnae ?? null, raio_km: body.raio_km ?? null },
              empresas
            };
          }

          return { error: "tipo inválido" };
        }),
      { retries: 2 }
    );

    res.json(data);
  } catch (e) {
    res.status(400).json({ error: String(e.message || e) });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => console.log("up:" + PORT));
