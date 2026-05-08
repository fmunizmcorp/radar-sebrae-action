# Graph Report - radar-sebrae-action  (2026-05-08)

## Corpus Check
- 5 files · ~4,121 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 93 nodes · 90 edges · 11 communities (8 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `494be48a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]

## God Nodes (most connected - your core abstractions)
1. `CLAUDE.md - fmunizmcorp/radar-sebrae-action` - 13 edges
2. `ATENCAO CLAUDE - LEIA E OBEDECA ESTE BLOCO ANTES DE QUALQUER OUTRA COISA` - 10 edges
3. `10. CHECKLIST DE ENTREGA OBRIGATORIO` - 6 edges
4. `3. SQUAD DE IAs (skills aplicaveis)` - 4 edges
5. `REGRA 2.5 - GERACAO DE ARQUIVOS (Excel, PDF, DOCX, PPTX) - SKILLS XLSX/PDF/DOCX/PPTX` - 3 edges
6. `4. METODOLOGIA DE TRABALHO` - 3 edges
7. `7. ESTRUTURA DO REPO` - 3 edges
8. `9. APRENDIZADO E ATUALIZACAO CONTINUA` - 3 edges
9. `Aprendizados - fmunizmcorp/radar-sebrae-action` - 3 edges
10. `Historico de Sessoes - fmunizmcorp/radar-sebrae-action` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (11 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (28): aoa, app, blocos, body, c0, c1, chaves, cnae (+20 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (16): 11. REFERENCIAS RAPIDAS, 1. IDENTIDADE DO PROJETO, 2. SEU PAPEL - ORQUESTRADOR, 4. METODOLOGIA DE TRABALHO, 5. CONHECIMENTO ESPECIFICO DO PROJETO, 6. STACK TECNOLOGICO (de `package.json`), 9. APRENDIZADO E ATUALIZACAO CONTINUA, CLAUDE.md - fmunizmcorp/radar-sebrae-action (+8 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (12): ATENCAO CLAUDE - LEIA E OBEDECA ESTE BLOCO ANTES DE QUALQUER OUTRA COISA, Fluxo padrao quando o usuario pede arquivo, Padroes Brasil obrigatorios em cada arquivo gerado, REGRA 0 - VOCE E O LIDER + ORQUESTRADOR DESTE REPO. ATIVO. AGORA., REGRA -1 - O USUARIO E LEIGO. NUNCA PERGUNTE SOBRE PERSONA, SKILL OU CONFIGURACAO., REGRA 1 - SKILLS BASAIS - SEMPRE ON. NAO PERGUNTE. NAO ESCOLHA., REGRA 2.5 - GERACAO DE ARQUIVOS (Excel, PDF, DOCX, PPTX) - SKILLS XLSX/PDF/DOCX/PPTX, REGRA 2 - SKILLS CONDICIONAIS PARA REPO DE DESENVOLVIMENTO (+4 more)

### Community 3 - "Community 3"
Cohesion: 0.33
Nodes (6): 10. CHECKLIST DE ENTREGA OBRIGATORIO, Codigo, Deploy, Documentacao, Sinalizar conclusao, Testes

### Community 4 - "Community 4"
Cohesion: 0.4
Nodes (5): 7. ESTRUTURA DO REPO, Arquivos da raiz (amostra), code:block2 (.claude), code:block3 (.gitignore), Diretorios principais

### Community 5 - "Community 5"
Cohesion: 0.4
Nodes (4): Aprendizados, Aprendizados - fmunizmcorp/radar-sebrae-action, Como usar, YYYY-MM-DD - Titulo do aprendizado [#categoria]

### Community 6 - "Community 6"
Cohesion: 0.4
Nodes (4): Como usar, Historico, Historico de Sessoes - fmunizmcorp/radar-sebrae-action, YYYY-MM-DD - vX.Y.Z - Titulo da sessao

### Community 7 - "Community 7"
Cohesion: 0.5
Nodes (4): 3. SQUAD DE IAs (skills aplicaveis), Quando usar cada skill, Skills BASAIS (sempre validas em qualquer tarefa), Skills ESPECIFICAS deste projeto

## Knowledge Gaps
- **64 isolated node(s):** `app`, `RadarBody`, `body`, `setor`, `termo` (+59 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CLAUDE.md - fmunizmcorp/radar-sebrae-action` connect `Community 1` to `Community 2`, `Community 3`, `Community 4`, `Community 7`?**
  _High betweenness centrality (0.188) - this node is a cross-community bridge._
- **Why does `10. CHECKLIST DE ENTREGA OBRIGATORIO` connect `Community 3` to `Community 1`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `app`, `RadarBody`, `body` to the rest of the system?**
  _64 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._