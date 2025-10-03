import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { chromium } from "playwright";
import pRetry from "p-retry";
import { z } from "zod";
import path from "path";
import fs from "fs";
import XLSX from "xlsx";

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(helmet());
app.use(rateLimit({ windowMs: 60_000, max: 20 }));

// Raiz e health
app.get("/", (_req, res) => res.type("text/plain").send("ok"));
app.get("/health", (_req, res) => res.json({ ok: true }));

// Servir arquivos estáticos das planilhas
app.use("/assets", express.static(path.join(process.cwd(), "assets"), { maxAge: "1d" }));

// ---------- Playwright util ----------
async function withBrowser(fn, { originUA = "Mozilla/5.0 Chrome", width = 1366, height = 900 } = {}) {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });
  const context = await browser.newContext({
    viewport: { width, height },
    userAgent: originUA
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

async function waitIdle(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle").catch(() => {});
}

// ---------- Radar Sebrae (já existente) ----------
const RadarBody = z.object({
  tipo: z.enum(["opportunities", "demographics", "competition"]),
  uf: z.string().length(2),
  municipio: z.string().min(2),
  setor: z.string().optional(),
  termo: z.string().optional(),
  cnae: z.string().optional(),
  raio_km: z.number().optional()
});

app.post("/api/radar", async (req, res) => {
  const body = RadarBody.parse(req.body);
  const ORIGIN = "https://www.radarsebrae.com.br";

  function setLocal(page, uf, municipio) {
    return (async () => {
      const ufField = page.getByLabel(/UF/i).or(page.getByPlaceholder(/UF/i));
      const munField = page.getByLabel(/Munic|Cidade/i).or(page.getByPlaceholder(/Munic|Cidade/i));
      await ufField.fill(uf).catch(() => {});
      await munField.fill(municipio).catch(() => {});
    })();
  }
  async function clickSearch(page) {
    await page.getByRole("button", { name: /buscar|pesquisar|aplicar|ver/i }).first().click().catch(() => {});
    await page.waitForLoadState("networkidle").catch(() => {});
  }

  try {
    const data = await pRetry(() => withBrowser(async (page) => {
      await page.goto(ORIGIN, { waitUntil: "domcontentloaded" });
      await waitIdle(page);

      if (body.tipo === "opportunities") {
        await page.getByRole("link", { name: /negócios|oportunidades/i }).first().click().catch(() => {});
        await waitIdle(page);
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
        await waitIdle(page);
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
        await waitIdle(page);
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
              .split("\n").map((s) => s.trim()).filter(Boolean);
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
    }), { retries: 2 });

    res.json(data);
  } catch (e) {
    res.status(400).json({ error: String(e.message || e) });
  }
});

// ---------- NOVA ACTION: Planejadora Sebrae ----------
const PlanejadoraBody = z.object({
  uf: z.string().length(2),
  municipio: z.string().min(2).optional(),
  termo: z.string().optional(),
  etapa: z.enum(["ideacao","modelo","plano","validacao"]).optional() // rótulos genéricos
});

app.post("/api/planejadora", async (req, res) => {
  const body = PlanejadoraBody.parse(req.body);
  const ORIGIN = "https://planejadora.sebrae.com.br";

  try {
    const data = await pRetry(() => withBrowser(async (page) => {
      await page.goto(ORIGIN, { waitUntil: "domcontentloaded" });
      await waitIdle(page);

      // Se houver menu/guia por etapas, tentar clicar
      if (body.etapa) {
        await page.getByRole("link", { name: new RegExp(body.etapa, "i") }).first().click().catch(() => {});
        await waitIdle(page);
      }

      // Busca/termo se disponível
      if (body.termo) {
        const search = page.getByLabel(/buscar|busca|pesquisar/i).or(page.getByPlaceholder(/buscar|pesquisar/i));
        await search.fill(body.termo).catch(() => {});
        await page.keyboard.press("Enter").catch(() => {});
        await waitIdle(page);
      }

      // Coleta blocos principais
      const blocks = [];
      const cards = await page.locator('article, .card, [role="article"], section').all().catch(() => []);
      for (const c of cards.slice(0, 60)) {
        const h = await c.getByRole("heading").first().textContent().catch(() => null);
        const txt = await c.textContent().catch(() => null);
        if ((h && h.trim()) || (txt && txt.trim())) blocks.push({
          titulo: h?.trim() ?? null,
          texto: (txt || "").trim().slice(0, 1200)
        });
      }

      return { origem: "planejadora", filtros: body, blocos: blocks };
    }), { retries: 2 });

    res.json(data);
  } catch (e) {
    res.status(400).json({ error: String(e.message || e) });
  }
});

// ---------- NOVA ACTION: PNBox (Plano de Negócio) ----------
const PNBoxBody = z.object({
  uf: z.string().length(2).optional(),
  municipio: z.string().min(2).optional(),
  segmento: z.string().optional(),
  termo: z.string().optional(),
  etapa: z.string().optional()
});

app.post("/api/pnbox", async (req, res) => {
  const body = PNBoxBody.parse(req.body);
  const ORIGIN = "https://pnbox.sebrae.com.br/planoNegocio";

  try {
    const data = await pRetry(() => withBrowser(async (page) => {
      await page.goto(ORIGIN, { waitUntil: "domcontentloaded" });
      await waitIdle(page);

      // Se houver wizard/etapas
      if (body.etapa) {
        await page.getByRole("link", { name: new RegExp(body.etapa, "i") }).first().click().catch(() => {});
        await waitIdle(page);
      }

      if (body.termo) {
        const search = page.getByLabel(/buscar|busca|pesquisar/i).or(page.getByPlaceholder(/buscar|pesquisar/i));
        await search.fill(body.termo).catch(() => {});
        await page.keyboard.press("Enter").catch(() => {});
        await waitIdle(page);
      }

      // Extrai cards/seções
      const sections = [];
      const cards = await page.locator('article, .card, [role="article"], section').all().catch(() => []);
      for (const c of cards.slice(0, 60)) {
        const h = await c.getByRole("heading").first().textContent().catch(() => null);
        const txt = await c.textContent().catch(() => null);
        if ((h && h.trim()) || (txt && txt.trim())) sections.push({
          titulo: h?.trim() ?? null,
          texto: (txt || "").trim().slice(0, 1200)
        });
      }

      return { origem: "pnbox", filtros: body, secoes: sections };
    }), { retries: 2 });

    res.json(data);
  } catch (e) {
    res.status(400).json({ error: String(e.message || e) });
  }
});

// ---------- NOVAS ACTIONS: Planilhas (análise) ----------
// Observação: macros (.xlsm) não executam no servidor. Lemos dados das planilhas.

app.post("/api/persona/analyze", async (_req, res) => {
  try {
    const filePath = path.join(process.cwd(), "assets", "gerador_de_personas_2022.xlsm");
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Arquivo de persona não encontrado em /assets" });

    const wb = XLSX.read(fs.readFileSync(filePath));
    const sheets = wb.SheetNames;
    const preview = {};
    for (const s of sheets.slice(0, 3)) { // limita preview
      const aoa = XLSX.utils.sheet_to_json(wb.Sheets[s], { header: 1, defval: "" });
      preview[s] = aoa.slice(0, 20); // primeiras 20 linhas
    }
    res.json({ origem: "persona_xlsm", sheets, preview, download: "/assets/gerador_de_personas_2022.xlsm" });
  } catch (e) {
    res.status(400).json({ error: String(e.message || e) });
  }
});

const FinanceBody = z.object({
  sheet: z.string().optional(),     // nome da aba a inspecionar
  rangeA1: z.string().optional()    // intervalo A1 opcional
});

app.post("/api/finance/analyze", async (req, res) => {
  try {
    const body = FinanceBody.parse(req.body ?? {});
    const filePath = path.join(process.cwd(), "assets", "Calculadora_Planejamento_Financeiro_VF1.xlsx");
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Arquivo financeiro não encontrado em /assets" });

    const wb = XLSX.read(fs.readFileSync(filePath));
    const sheets = wb.SheetNames;

    let dataOut;
    if (body.sheet && wb.Sheets[body.sheet]) {
      if (body.rangeA1) {
        const range = XLSX.utils.decode_range(body.rangeA1);
        const aoa = XLSX.utils.sheet_to_json(wb.Sheets[body.sheet], { header: 1, defval: "" });
        const slice = [];
        for (let r = range.s.r; r <= Math.min(range.e.r, aoa.length - 1); r++) {
          slice.push(aoa[r].slice(range.s.c, range.e.c + 1));
        }
        dataOut = { sheet: body.sheet, rangeA1: body.rangeA1, values: slice };
      } else {
        const aoa = XLSX.utils.sheet_to_json(wb.Sheets[body.sheet], { header: 1, defval: "" });
        dataOut = { sheet: body.sheet, preview: aoa.slice(0, 50) };
      }
    } else {
      // preview das 2 primeiras abas
      const preview = {};
      for (const s of sheets.slice(0, 2)) {
        const aoa = XLSX.utils.sheet_to_json(wb.Sheets[s], { header: 1, defval: "" });
        preview[s] = aoa.slice(0, 30);
      }
      dataOut = { preview };
    }

    res.json({ origem: "finance_xlsx", sheets, ...dataOut, download: "/assets/Calculadora_Planejamento_Financeiro_VF1.xlsx" });
  } catch (e) {
    res.status(400).json({ error: String(e.message || e) });
  }
});

// ---- start
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => console.log("up:" + PORT));
