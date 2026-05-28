# Inventario CTI E2E Cypress

Projeto de automacao E2E para o sistema Inventario CTI, estruturado com Cypress, TypeScript, Page Object simples, fixtures, configuracao centralizada por `.env` e relatorios de execucao.

Nao usamos Cucumber neste projeto. Os arquivos `.feature` existem apenas como documentacao de apoio em `docs/features`.

## Objetivo

Validar fluxos criticos do Inventario CTI, como cadastro e edicao de atribuicoes, vinculacao de ativos, geracao de termos e relatorios.

Esta base inicial nao assume seletores definitivos do sistema. Pontos dependentes do HTML real estao marcados com `TODO` e devem ser ajustados apos inspecao do DOM.

## Stack

- Cypress
- TypeScript
- Dotenv
- Page Object
- Fixtures
- cypress-mochawesome-reporter
- ESLint
- Prettier

## Pre-requisitos

- Node.js 18 ou superior
- npm
- Google Chrome, se for executar `cy:run:chrome`

## Instalacao

```bash
npm install
```

## Configuracao do ambiente

Crie um arquivo `.env` a partir de `.env.example`:

```env
BASE_URL=http://testeqa.pge.ce.gov.br
USER_EMAIL=qa.teste@teste.pge.ce.gov.br
USER_PASSWORD=sua_senha_aqui
```

O arquivo `.env` nao deve ser versionado.

Quando a senha tiver caracteres especiais como `#` ou `$`, coloque o valor entre aspas simples para o `dotenv` nao interpretar parte do texto como comentario:

```env
USER_PASSWORD='sua_senha_com_#_e_$'
```

## Execucao

Modo interativo:

```bash
npm run cy:open
```

Modo headless:

```bash
npm run cy:run
```

Modo headless no Chrome:

```bash
npm run cy:run:chrome
```

Os scripts removem variaveis `ELECTRON_*` herdadas do terminal integrado do VS Code, pois elas podem fazer o binario do Cypress iniciar como Node em vez de Electron.

## Relatorios e evidencias

- Screenshots: `cypress/screenshots`
- Videos: `cypress/videos`
- Downloads e PDFs: `cypress/downloads`
- Relatorio HTML/JSON: `cypress/reports`

O reporter configurado e `cypress-mochawesome-reporter`.

## Estrutura

```txt
cypress/
  e2e/          Specs organizadas por dominio
  fixtures/     Massas de dados sem informacoes sensiveis
  support/
    commands.ts
    e2e.ts
    types.ts
    config/     Configuracao centralizada do ambiente
    pages/      Page Objects
docs/
  features/     Cenarios BDD apenas como documentacao
```

## Estrategia de automacao

As specs devem descrever os fluxos de negocio e delegar interacoes aos Page Objects. Page Objects representam paginas completas e concentram seletores, acoes e validacoes da tela.

Nenhum seletor deve ser declarado diretamente nas specs.

Os cenarios BDD em `docs/features` sao documentos de negocio. Nao ha step definitions, preprocessor do Cucumber ou execucao de `.feature` no Cypress.

## Padrao Page Object

As Page Objects ficam em `cypress/support/pages`.

Cada Page Object contem:

- `path` da tela;
- `selectors` privados e centralizados;
- metodos de navegacao;
- metodos de acao;
- metodos de validacao quando fizer sentido.
- nenhuma heranca;
- nenhum fragment.

## Estrategia de seletores

Prioridade recomendada:

1. `data-cy`
2. `id`
3. `name`
4. `aria-label`
5. `role`
6. texto visivel com `cy.contains`
7. atributos semanticos
8. seletor CSS simples

Evitar `nth-child`, classes dinamicas, seletores longos e encadeamento profundo de HTML.

## Qualidade

```bash
npm run lint
npm run format:check
```

## Observacoes tecnicas

- `cy.login()` usa `cy.session()` para preservar autenticacao.
- A senha real deve ficar somente em `.env`.
- Fixtures usam valores `TODO` ate que dados validos do ambiente sejam definidos.
- Validacoes de PDF devem ser finalizadas apos confirmar padrao de nomes dos arquivos baixados.
- Rotas e seletores provisórios devem ser revisados depois da primeira inspecao do sistema.
- Arquivos `.feature` nao sao executaveis neste projeto; eles servem somente como referencia BDD para comunicacao de negocio.
