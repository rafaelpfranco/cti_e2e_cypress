# Inventário CTI - Testes E2E com Cypress

[![Cypress E2E](https://github.com/rafaelpfranco/cti_e2e_cypress/actions/workflows/e2e.yml/badge.svg)](https://github.com/rafaelpfranco/cti_e2e_cypress/actions/workflows/e2e.yml)

Projeto de automação E2E do sistema **Inventário CTI**, desenvolvido com **Cypress** e **TypeScript**.

A suíte cobre fluxos funcionais do sistema, como login, cadastro de ativos, cadastro e edição de atribuições, vínculo de ativos e geração de termos.

## Stack

- Cypress
- TypeScript
- Dotenv
- Page Object
- `@cypress/grep`
- `cypress-mochawesome-reporter`
- Mochawesome
- ESLint
- Prettier
- Husky

## Objetivo

Validar os principais fluxos do sistema Inventário CTI por meio de testes automatizados E2E, garantindo que funcionalidades críticas continuem funcionando após alterações no sistema.

## Estrutura do Projeto

```txt
features/
  Documentação BDD dos cenários

cypress/
  e2e/
    Specs Cypress organizadas por funcionalidade

  fixtures/
    Massas de teste tipadas em TypeScript

  support/
    commands.ts
    e2e.ts
    types.ts
    config/
    pages/
```

## Decisões Técnicas

O projeto utiliza Cypress com TypeScript e Page Objects simples.

Os arquivos `.feature` são utilizados apenas como documentação dos cenários BDD. Eles não são executados pelo Cypress e não utilizam Cucumber.

As specs são responsáveis por descrever o fluxo dos testes, enquanto as interações com tela, seletores e validações ficam centralizadas nas Pages.

## Documentação

- [Plano de Teste](./TEST_PLAN.md)
- [Bugs Encontrados](./BUGS.md)
- [Cenários BDD](./features)
- [Evidências](./evidences/README.md)

## Pré-requisitos

- Node.js 18 ou superior
- npm
- Google Chrome ou Electron

## Instalação

```bash
npm install
```

## Configuração do Ambiente

Crie o arquivo `.env` com base no `.env.example`.

```env
BASE_URL=http://testeqa.pge.ce.gov.br
USER_EMAIL=qa.teste@teste.pge.ce.gov.br
USER_PASSWORD=senha
TIPO_TESTE=regressivo
```

Utilize aspas simples no password.

```env
USER_PASSWORD='minha_senha_#_e_$'
```

## Execução dos Testes

Abrir Cypress em modo interativo:

```bash
npm run cy:open
```

Executar todos os testes:

```bash
npm run cy:run
```

Executar testes regressivos:

```bash
npm run cy:run:regressivo
```

Executar testes complementares:

```bash
npm run cy:run:complementar
```

Executar uma spec específica:

```bash
npm run cy:run -- --spec cypress/e2e/atribuicoes/cadastrarAtribuicao.cy.ts
```

## Categorização dos Testes

A suíte utiliza `@cypress/grep` para permitir execução por categoria.

Categorias principais:

```txt
@regressivo
@complementar
```

Tags de fluxo:

```txt
@happy_path
@non_happy_path
```

Tags de rastreabilidade por feature:

```txt
@lg01
@at01
@ca01
@ea03
@gt01
```

Exemplo de execução por tag:

```bash
npx cypress run --env grepTags=@regressivo
```

## Escopo Automatizado

- Login
- Logout
- Cadastro de ativos
- Cadastro de atribuições
- Edição de atribuições
- Vínculo de ativos
- Alteração de status de ativos
- Geração de termos

## Evidências

Durante a execução, o Cypress pode gerar:

```txt
cypress/screenshots
cypress/videos
cypress/downloads
cypress/reports
```

O relatório HTML/JSON é gerado pelo `cypress-mochawesome-reporter`.

As evidências selecionadas da entrega estão disponíveis em [evidences](./evidences/README.md).

Os vídeos automáticos do Cypress são gerados em `cypress/videos/` durante execuções headless. Esses vídeos não são versionados por padrão, mas podem ser enviados separadamente quando necessário.

## Relatório Visual

O projeto utiliza `cypress-mochawesome-reporter` para gerar relatório visual das execuções E2E.

Executar todos os testes com relatório:

```bash
npm run cy:run:report
```

Executar regressivo com relatório:

```bash
npm run cy:run:regressivo:report
```

Executar complementar com relatório:

```bash
npm run cy:run:complementar:report
```

Após a execução, o relatório HTML ficará disponível em:

```txt
cypress/reports/html/index.html
```

Quando executado via GitHub Actions ou self-hosted runner, o relatório pode ser publicado como artifact da execução.

## Qualidade de Código

Executar lint:

```bash
npm run lint
```

Corrigir problemas automaticamente quando possível:

```bash
npm run lint:fix
```

Validar formatação:

```bash
npm run format:check
```

Formatar arquivos:

```bash
npm run format
```

Validar TypeScript:

```bash
npx tsc --noEmit
```

## Pre-commit

O projeto utiliza Husky para executar validações antes de cada commit.

Atualmente o hook de pre-commit executa:

```bash
npm run lint
```

Caso o lint encontre problemas, o commit será bloqueado até que os ajustes sejam realizados.

Arquivo responsável pelo hook:

```txt
.husky/pre-commit
```

## Boas Práticas de Seletores

Prioridade utilizada:

1. `data-cy`
2. `id`
3. `name`
4. `aria-label`
5. `role`
6. texto visível com `cy.contains`
7. atributos semânticos
8. seletores CSS simples

Evitar:

- seletores muito longos;
- `nth-child`;
- classes dinâmicas;
- encadeamento profundo de HTML;
- seletores diretamente nas specs.

## Pipeline

A suíte pode ser executada em pipeline por tipo de teste:

```txt
todos
regressivo
complementar
```

A variável `TIPO_TESTE` define o grupo de testes a ser executado.

Exemplo:

```env
TIPO_TESTE=regressivo
```

## Scripts Principais

```bash
npm run cy:open
npm run cy:run
npm run cy:run:regressivo
npm run cy:run:complementar
npm run cy:run:report
npm run cy:run:regressivo:report
npm run cy:run:complementar:report
npm run report:clean
npm run report:merge
npm run report:generate
npm run report:open
npm run lint
npm run lint:fix
npm run format
npm run format:check
```
