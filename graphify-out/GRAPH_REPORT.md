# Graph Report - radar-sebrae-action  (2026-07-17)

## Corpus Check
- 9 files · ~5,033 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 99 nodes · 60 edges · 41 communities (8 shown, 33 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6c0a5489`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server.js
- slice
- code:block2 (.claude)
- Aprendizados - fmunizmcorp/radar-sebrae-action
- Historico de Sessoes - fmunizmcorp/radar-sebrae-action
- dependencies
- code:block1 (Trabalhando em fmunizmcorp/radar-sebrae-action. Como Engenhe)
- code:block2 (Feature nova em fmunizmcorp/radar-sebrae-action: <DESCRICAO>)
- Orquestrador - fmunizmcorp/radar-sebrae-action
- Skills aplicaveis (Node.js / TypeScript)
- code:block3 (Bug em fmunizmcorp/radar-sebrae-action: <DESCRICAO + STACK T)
- README.md
- code:block4 (Auditoria em fmunizmcorp/radar-sebrae-action: <ESCOPO>)
- code:block5 (Deploy em fmunizmcorp/radar-sebrae-action: versao <X.Y.Z>)
- code:block6 (Descobri novo padrao em fmunizmcorp/radar-sebrae-action que )
- code:block1 ({)
- code:block3 (.gitignore)
- aoa
- blocos
- body
- c0
- c1
- chaves
- cnae
- empresas
- lines
- m
- out
- p
- paineis
- preview
- raio
- resultados
- search
- secoes
- setor
- termo
- urls
- wb
- package.json

## God Nodes (most connected - your core abstractions)
1. `Orquestrador - fmunizmcorp/radar-sebrae-action` - 10 edges
2. `Skills aplicaveis (Node.js / TypeScript)` - 4 edges
3. `Squad sob sua coordenacao` - 3 edges
4. `Aprendizados - fmunizmcorp/radar-sebrae-action` - 3 edges
5. `Historico de Sessoes - fmunizmcorp/radar-sebrae-action` - 3 edges
6. `scripts` - 2 edges
7. `express` - 2 edges
8. `express-rate-limit` - 2 edges
9. `helmet` - 2 edges
10. `playwright` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (41 total, 33 thin omitted)

### Community 0 - "server.js"
Cohesion: 0.17
Nodes (8): app, clickSearch(), FinanceBody, PdfBody, PlanejadoraBody, PNBoxBody, RadarBody, waitIdle()

### Community 5 - "Aprendizados - fmunizmcorp/radar-sebrae-action"
Cohesion: 0.40
Nodes (4): Aprendizados, Aprendizados - fmunizmcorp/radar-sebrae-action, Como usar, YYYY-MM-DD - Titulo do aprendizado [#categoria]

### Community 6 - "Historico de Sessoes - fmunizmcorp/radar-sebrae-action"
Cohesion: 0.40
Nodes (4): Como usar, Historico, Historico de Sessoes - fmunizmcorp/radar-sebrae-action, YYYY-MM-DD - vX.Y.Z - Titulo da sessao

### Community 8 - "dependencies"
Cohesion: 0.12
Nodes (17): express, express-rate-limit, helmet, p-retry, dependencies, express, express-rate-limit, helmet (+9 more)

### Community 12 - "Orquestrador - fmunizmcorp/radar-sebrae-action"
Cohesion: 0.15
Nodes (12): Criticidade, Decisoes que NAO sao suas, Decisoes que voce (orquestrador) toma, Dominio de atuacao, Especialistas deste projeto, Missao, Orquestrador - fmunizmcorp/radar-sebrae-action, Persona (+4 more)

### Community 13 - "Skills aplicaveis (Node.js / TypeScript)"
Cohesion: 0.40
Nodes (4): Basais (sempre), Condicionais, Padroes obrigatorios Node/TS, Skills aplicaveis (Node.js / TypeScript)

### Community 44 - "package.json"
Cohesion: 0.33
Nodes (5): name, scripts, start, type, version

## Knowledge Gaps
- **68 isolated node(s):** `name`, `version`, `type`, `start`, `express` (+63 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `name`, `version`, `type` to the rest of the system?**
  _68 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._