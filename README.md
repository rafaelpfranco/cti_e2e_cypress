# Inventario CTI E2E Cypress

Automacao E2E do sistema Inventario CTI com Cypress, TypeScript, Page Object simples, massas de teste, evidencias e relatorios de execucao.

## Objetivo

Validar fluxos criticos do Inventario CTI, como login, cadastro de ativos, cadastro e edicao de atribuicoes, vinculacao de ativos, geracao de termos e relatorios.

## Stack

- Cypress
- TypeScript
- Dotenv
- Page Object simples
- Fixtures/massas de teste
- cypress-mochawesome-reporter
- ESLint
- Prettier

## Decisoes Tecnicas

- Nao usa Cucumber.
- Nao usa step definitions.
- Arquivos `.feature` sao apenas documentacao BDD em `features/`.
- Nao usa BasePage.
- Nao usa fragments.
- Specs nao possuem seletores diretos.
- Seletores ficam encapsulados nas Pages.
- Testes com comportamento, DOM ou regra de negocio nao confirmados devem parar a implementacao e solicitar validacao manual.
- Nao criar teste falso, validacao artificial ou cenario pulado para esconder dificuldade.

## Estrutura

```txt
features/                 Documentacao BDD, sem execucao pelo Cypress
cypress/
  e2e/                    Specs Cypress + TypeScript
  fixtures/               Massas de teste
  support/
    commands.ts           Comandos customizados
    e2e.ts                Setup global do Cypress
    types.ts              Tipagens customizadas
    config/               Configuracao centralizada de ambiente
    pages/                Page Objects simples
```

## Pre-requisitos

- Node.js 18 ou superior
- npm
- Google Chrome, se for executar testes no Chrome

## Instalacao

```bash
npm install
```

## Configuracao Do Ambiente

Crie um arquivo `.env` a partir de `.env.example`:

```env
BASE_URL=http://testeqa.pge.ce.gov.br
USER_EMAIL=qa.teste@teste.pge.ce.gov.br
USER_PASSWORD=senha
TIPO_TESTE=regressivo
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

Todos os testes:

```bash
npm run cy:run
```

Os scripts removem variaveis `ELECTRON_*` herdadas do terminal integrado do VS Code, pois elas podem fazer o binario do Cypress iniciar como Node em vez de Electron.

## Features BDD

Os arquivos `.feature` ficam na pasta `features/` e documentam os cenarios em linguagem de negocio. Eles nao sao executados pelo Cypress e nao possuem step definitions.

As tags seguem este padrao:

- funcionalidade: `@login`, `@atribuicoes`, `@relatorios`;
- categoria: `@regressivo` ou `@complementar`;
- caminho: `@happy_path` ou `@non_happy_path`;
- rastreabilidade: `@lg01`, `@ca01`, `@ea03`;
- sequencial: `@lg01_1`, `@ca01_3`, `@ea03_7`.

## Estrategia De Automacao

As specs descrevem fluxos de negocio e delegam interacoes aos Page Objects. Cada Page Object representa uma tela, concentra os seletores em um objeto privado e expoe metodos de navegacao, acao e validacao.

Nenhum seletor deve ser declarado diretamente nas specs.

## Escopo

- Login.
- Cadastro de ativos.
- Cadastro de atribuicoes.
- Edicao de atribuicoes.
- Vinculacao, remocao e alteracao de status de ativos.
- Geracao de termos.
- Relatorio de movimentacao de ativos.
- Relatorio de atribuicoes por area.
- Evidencias por screenshots, videos, downloads e relatorios.

## Fora De Escopo

- Cucumber, step definitions ou preprocessor de `.feature`.
- Testes unitarios e de API.
- Validacao visual pixel a pixel.
- Performance, carga e seguranca.
- Cadastro administrativo de dados base fora dos fluxos E2E.

## Criterios De Entrada

- Ambiente de teste disponivel.
- Credenciais validas configuradas no `.env`.
- Massas de teste revisadas.
- Seletores reais confirmados para os fluxos implementados.
- Navegadores instalados para execucao local.

## Criterios De Saida

- Specs criticas implementadas e executadas.
- Evidencias geradas automaticamente.
- Relatorios disponiveis em `cypress/reports`.
- Falhas analisadas e documentadas.
- README atualizado com instrucoes de execucao.

## Estrategia De Evidencias

- Screenshots automaticos em falhas: `cypress/screenshots`
- Videos das execucoes headless: `cypress/videos`
- Downloads e PDFs: `cypress/downloads`
- Relatorio HTML/JSON: `cypress/reports`

O reporter configurado e `cypress-mochawesome-reporter`.

## Estrategia De Seletores

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

## Riscos E Cuidados

- Ambiente pode estar indisponivel ou instavel.
- Dados de teste compartilhados podem ser alterados por outras execucoes.
- Alguns fluxos ainda dependem de seletores ou regras de negocio confirmadas manualmente.
- Fluxos com downloads podem usar nomes dinamicos.
- Em caso de bloqueio por seletor, DOM ou regra incerta, a implementacao deve parar e solicitar validacao manual.

## Melhorias Sugeridas

- Adicionar `data-cy` nos elementos criticos.
- Criar massa de dados dedicada para automacao.
- Implementar limpeza de dados via API, caso disponivel.
- Validar conteudo dos PDFs gerados.
- Executar a suite em pipeline CI.
