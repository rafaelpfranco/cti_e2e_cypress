# Plano de Teste - Inventário CTI

## Objetivo

Descrever a estratégia de testes E2E para validar os principais fluxos do sistema Inventário CTI.

## Escopo

A suíte contempla os principais fluxos funcionais relacionados ao desafio prático:

- Login e logout;
- Cadastro de ativos;
- Cadastro de atribuições;
- Edição de atribuições;
- Vínculo de ativos;
- Alteração de status de ativos;
- Geração de termos;
- Geração de relatórios já automatizados no projeto.

## Fora de Escopo

- Testes de API;
- Testes de performance;
- Testes visuais pixel a pixel;
- Validação profunda do conteúdo interno dos PDFs;
- Validação detalhada de arquivos PDF gerados quando o comportamento depender de nova aba, download ou visualizador externo.

## Abordagem de Teste

A automação foi implementada com Cypress e TypeScript, utilizando Page Objects para centralizar interações e validações de tela.

Os arquivos `.feature` documentam os cenários em formato BDD, mas não são executados por Cucumber. A execução automatizada é feita diretamente pelas specs Cypress.

As massas de teste ficam em arquivos TypeScript dentro de `cypress/fixtures`, mantendo interfaces e dados no mesmo arquivo quando específicos da funcionalidade.

A categorização dos testes é feita por tags com `@cypress/grep`, permitindo execução regressiva, complementar ou completa.

## Tipos de Teste

- Happy path;
- Non-happy path;
- Regressivo;
- Complementar;
- Validação de campos obrigatórios;
- Validação de comportamento de interface.

## Critérios de Entrada

- Ambiente de teste disponível;
- Credenciais válidas configuradas no `.env`;
- Dependências instaladas;
- Massa `AUTO` disponível no ambiente;
- Navegador disponível para execução.

## Critérios de Saída

- Testes regressivos executados;
- Relatório visual gerado;
- Evidências registradas;
- Bugs documentados, quando encontrados.

## Massa de Teste

A suíte utiliza massas tipadas em `cypress/fixtures`.

Para fluxos de atribuição e edição, são reutilizados ativos e atribuições com prefixo `AUTO`, evitando dependência de criação de dados fora da funcionalidade testada.

## Estratégia de Evidências

As evidências são geradas automaticamente durante a execução:

- Screenshots de falha em `cypress/screenshots`;
- Vídeos de execução em `cypress/videos`;
- Downloads em `cypress/downloads`;
- Relatório visual em `cypress/reports`.

As evidências selecionadas para entrega ficam documentadas em `evidences/README.md`.

## Ferramentas

- Cypress;
- TypeScript;
- `@cypress/grep`;
- `cypress-mochawesome-reporter`;
- ESLint;
- Prettier;
- Husky;
- GitHub Actions.
