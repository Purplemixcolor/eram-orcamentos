# ERAM Orcamentos

Aplicacao web para gerenciamento de orcamentos e consulta historica de servicos do Estaleiro ERAM.

## Escopo implementado

- Next.js App Router, TypeScript e Tailwind CSS.
- Tela de login com a logomarca oficial em `public/brand/eram-logo.png`.
- Layout principal com sidebar, topbar, busca sempre acessivel e atalhos visuais.
- Dashboard operacional com indicadores, orcamentos recentes, categorias, importacoes e auditoria.
- Pesquisa de servicos com filtros, visualizacao em tabela/cartoes, selecao e links para detalhes.
- Detalhe de servico com valor historico original preservado, fonte, alertas e semelhantes.
- Comparacao de servicos com menor valor, maior valor, media, mediana e registro recente.
- Modulos iniciais de orcamentos, embarcacoes, armadores, categorias, importacoes, usuarios, auditoria e configuracoes.
- Prisma schema com as entidades solicitadas e indices para os principais campos pesquisados.
- Docker Compose com PostgreSQL, Redis e MinIO.
- Seed com dados 100% ficticios.
- Testes unitarios para busca, permissoes, importacao e preservacao de valor historico.

## Execucao local

1. Instale as dependencias:

```bash
pnpm install
```

2. Copie as variaveis de ambiente:

```bash
cp .env.example .env
```

3. Suba os servicos locais:

```bash
docker compose up -d
```

4. Crie as tabelas e rode a seed:

```bash
pnpm prisma:migrate
pnpm prisma:seed
```

5. Rode a aplicacao:

```bash
pnpm dev
```

Acesse `http://localhost:3000`.

## Publicacao estatica no GitHub Pages

Este projeto tambem pode ser exportado como site estatico, no mesmo modelo do app de medicao.

```bash
pnpm build
```

O Next gera os arquivos finais em `out/`. A versao estatica usa login local de demonstracao via `localStorage`, porque GitHub Pages nao executa rotas API, cookies server-side, Prisma ou PostgreSQL. Para producao com banco real, use uma hospedagem com runtime Node, como Vercel, Render ou servidor proprio.

## Usuarios de demonstracao

Todos usam a senha `eram123`.

- `admin@eram.local` - Administrador
- `orcamentista@eram.local` - Orcamentista
- `revisor@eram.local` - Revisor
- `consulta@eram.local` - Consulta

## Decisoes tecnicas

- A interface usa componentes proprios para manter controle visual fino e evitar aparencia generica.
- A primeira busca usa uma camada `searchServices`, hoje baseada nos dados demonstrativos. Ela deve ser substituida por repositorios PostgreSQL e, futuramente, OpenSearch sem alterar os componentes.
- A importacao fica atras de `RasnickImportAdapter`, evitando acoplamento direto ao Rasnick.
- Valores historicos originais ficam separados dos valores usados em novos orcamentos.
- A seed nao usa nomes, documentos ou valores reais da empresa.
- O login atual e uma implementacao local de demonstracao; em producao deve usar hash no banco, limitacao de tentativas, rotacao de sessao e politicas completas.

## Pontos que dependem de informacoes futuras sobre o Rasnick

- Formato real de leitura: banco, pastas, arquivos proprietarios, exportacoes ou API.
- Chaves confiaveis para detectar duplicidade.
- Padrao de codificacao de documentos e paginas de origem.
- Unidades historicas usadas e regras de normalizacao.
- Campos legados que indicam embarcacao, armador, OS e numero de orcamento.
- Volume por lote, janelas de importacao e estrategia de retomada.

## Testes

```bash
pnpm test
pnpm test:e2e
```

## Estrutura

- `src/app` - rotas, telas e APIs do Next.js.
- `src/components` - componentes de UI, layout e marca.
- `src/features` - interfaces por funcionalidade.
- `src/lib` - tipos, dados ficticios e utilitarios.
- `src/server` - servicos de autenticacao, busca e importacao.
- `prisma` - schema e seed.
- `tests` e `e2e` - testes unitarios e end-to-end.
