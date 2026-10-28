# Graph Report - radar-sebrae-action  (2026-10-28)

## Corpus Check
- 11 files · ~5,033 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .xlsm 1)

## Summary
- 142 nodes · 151 edges · 13 communities (12 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c6bfdc14`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- CLAUDE.md - fmunizmcorp/radar-sebrae-action
- ATENCAO CLAUDE - LEIA E OBEDECA ESTE BLOCO ANTES DE QUALQUER OUTRA COISA
- Prompts e Templates - fmunizmcorp/radar-sebrae-action
- graphify.yml
- Aprendizados - fmunizmcorp/radar-sebrae-action
- Historico de Sessoes - fmunizmcorp/radar-sebrae-action
- server.js
- steps
- 10. CHECKLIST DE ENTREGA OBRIGATORIO
- Orquestrador - fmunizmcorp/radar-sebrae-action
- Skills aplicaveis (Node.js / TypeScript)
- README.md

## God Nodes (most connected - your core abstractions)
1. `CLAUDE.md - fmunizmcorp/radar-sebrae-action` - 13 edges
2. `Orquestrador - fmunizmcorp/radar-sebrae-action` - 10 edges
3. `ATENCAO CLAUDE - LEIA E OBEDECA ESTE BLOCO ANTES DE QUALQUER OUTRA COISA` - 10 edges
4. `Prompts e Templates - fmunizmcorp/radar-sebrae-action` - 7 edges
5. `steps` - 6 edges
6. `10. CHECKLIST DE ENTREGA OBRIGATORIO` - 6 edges
7. `with` - 5 edges
8. `on` - 4 edges
9. `graphify` - 4 edges
10. `Skills aplicaveis (Node.js / TypeScript)` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Estruturas centrais (God Nodes pelo Graphify)` --references--> `waitIdle()`  [INFERRED]
  CLAUDE.md → server.js
- `Estruturas centrais (God Nodes pelo Graphify)` --references--> `clickSearch()`  [INFERRED]
  CLAUDE.md → server.js

## Import Cycles
- None detected.

## Communities (13 total, 1 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.12
Nodes (22): dependencies, express@4.19.2, express-rate-limit@7.4.0, helmet@7.1.0, p-retry@6.2.0, pdf-parse@1.1.1, playwright@1.47.2, xlsx@0.18.5 (+14 more)

### Community 1 - "CLAUDE.md - fmunizmcorp/radar-sebrae-action"
Cohesion: 0.10
Nodes (20): 11. REFERENCIAS RAPIDAS, 1. IDENTIDADE DO PROJETO, 2. SEU PAPEL - ORQUESTRADOR, 3. SQUAD DE IAs (skills aplicaveis), 4. METODOLOGIA DE TRABALHO, 6. STACK TECNOLOGICO (de `package.json`), 7. ESTRUTURA DO REPO, 9. APRENDIZADO E ATUALIZACAO CONTINUA (+12 more)

### Community 2 - "ATENCAO CLAUDE - LEIA E OBEDECA ESTE BLOCO ANTES DE QUALQUER OUTRA COISA"
Cohesion: 0.15
Nodes (12): ATENCAO CLAUDE - LEIA E OBEDECA ESTE BLOCO ANTES DE QUALQUER OUTRA COISA, Fluxo padrao quando o usuario pede arquivo, Padroes Brasil obrigatorios em cada arquivo gerado, REGRA 0 - VOCE E O LIDER + ORQUESTRADOR DESTE REPO. ATIVO. AGORA., REGRA -1 - O USUARIO E LEIGO. NUNCA PERGUNTE SOBRE PERSONA, SKILL OU CONFIGURACAO., REGRA 1 - SKILLS BASAIS - SEMPRE ON. NAO PERGUNTE. NAO ESCOLHA., REGRA 2.5 - GERACAO DE ARQUIVOS (Excel, PDF, DOCX, PPTX) - SKILLS XLSX/PDF/DOCX/PPTX, REGRA 2 - SKILLS CONDICIONAIS PARA REPO DE DESENVOLVIMENTO (+4 more)

### Community 3 - "Prompts e Templates - fmunizmcorp/radar-sebrae-action"
Cohesion: 0.25
Nodes (7): Prompts e Templates - fmunizmcorp/radar-sebrae-action, Template 1: Comeco de sessao, Template 2: Implementacao de feature, Template 3: Bug fix, Template 4: Auditoria/revisao, Template 5: Deploy e validacao, Template 7: Atualizacao de skills

### Community 4 - "graphify.yml"
Cohesion: 0.13
Nodes (14): name, runs-on, jobs, graphify, name, on, push, schedule (+6 more)

### Community 5 - "Aprendizados - fmunizmcorp/radar-sebrae-action"
Cohesion: 0.40
Nodes (4): Aprendizados, Aprendizados - fmunizmcorp/radar-sebrae-action, Como usar, YYYY-MM-DD - Titulo do aprendizado [#categoria]

### Community 6 - "Historico de Sessoes - fmunizmcorp/radar-sebrae-action"
Cohesion: 0.40
Nodes (4): Como usar, Historico, Historico de Sessoes - fmunizmcorp/radar-sebrae-action, YYYY-MM-DD - vX.Y.Z - Titulo da sessao

### Community 7 - "server.js"
Cohesion: 0.13
Nodes (10): 5. CONHECIMENTO ESPECIFICO DO PROJETO, Estruturas centrais (God Nodes pelo Graphify), app, clickSearch(), FinanceBody, PdfBody, PlanejadoraBody, PNBoxBody (+2 more)

### Community 8 - "steps"
Cohesion: 0.20
Nodes (10): steps, continue-on-error, name, run, uses, with, fetch-depth, key (+2 more)

### Community 9 - "10. CHECKLIST DE ENTREGA OBRIGATORIO"
Cohesion: 0.33
Nodes (6): 10. CHECKLIST DE ENTREGA OBRIGATORIO, Codigo, Deploy, Documentacao, Sinalizar conclusao, Testes

### Community 12 - "Orquestrador - fmunizmcorp/radar-sebrae-action"
Cohesion: 0.15
Nodes (12): Criticidade, Decisoes que NAO sao suas, Decisoes que voce (orquestrador) toma, Dominio de atuacao, Especialistas deste projeto, Missao, Orquestrador - fmunizmcorp/radar-sebrae-action, Persona (+4 more)

### Community 13 - "Skills aplicaveis (Node.js / TypeScript)"
Cohesion: 0.40
Nodes (4): Basais (sempre), Condicionais, Padroes obrigatorios Node/TS, Skills aplicaveis (Node.js / TypeScript)

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CLAUDE.md - fmunizmcorp/radar-sebrae-action` connect `CLAUDE.md - fmunizmcorp/radar-sebrae-action` to `10. CHECKLIST DE ENTREGA OBRIGATORIO`, `ATENCAO CLAUDE - LEIA E OBEDECA ESTE BLOCO ANTES DE QUALQUER OUTRA COISA`, `server.js`?**
  _High betweenness centrality (0.214) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11857707509881422 - nodes in this community are weakly interconnected._
- **Why does `5. CONHECIMENTO ESPECIFICO DO PROJETO` connect `server.js` to `CLAUDE.md - fmunizmcorp/radar-sebrae-action`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Should `CLAUDE.md - fmunizmcorp/radar-sebrae-action` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `graphify.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `server.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1323529411764706 - nodes in this community are weakly interconnected._