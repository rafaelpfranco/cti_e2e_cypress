# Plano de Teste - Inventario CTI

## Objetivo

Validar os principais fluxos E2E do Inventario CTI relacionados a atribuicoes de ativos, termos e relatorios.

## Escopo

- Login do usuario de teste.
- Cadastro de atribuicoes para colaborador.
- Cadastro de atribuicoes para subarea sem colaborador definido.
- Edicao de atribuicoes.
- Vinculacao, remocao e alteracao de status de ativos.
- Geracao de termos.
- Relatorio de movimentacao de ativos.
- Relatorio de atribuicoes por area.
- Evidencias por screenshots, videos, downloads e relatorios.
- Cenarios BDD documentais em `docs/features`, sem Cucumber.

## Fora de Escopo

- Testes unitarios e de API.
- Automacao com Cucumber, step definitions ou preprocessor de `.feature`.
- Validacao visual pixel a pixel.
- Performance, carga e seguranca.
- Cadastro administrativo de dados base.

## Criterios de Entrada

- Ambiente de teste disponivel.
- Credenciais validas configuradas no `.env`.
- Dados de massa revisados nas fixtures.
- Seletores ajustados apos inspecao do DOM.
- Navegadores instalados para execucao local.

## Criterios de Saida

- Specs criticas implementadas e executadas.
- Evidencias geradas automaticamente.
- Relatorios disponiveis em `cypress/reports`.
- Falhas analisadas e documentadas.
- README atualizado com instrucoes de execucao.

## Tipos de Teste

- E2E funcional.
- Casos positivos.
- Casos negativos.
- Validacao de campos obrigatorios.
- Validacao de downloads gerados.
- Smoke dos relatorios principais.

## Ferramentas

- Cypress
- TypeScript
- Dotenv
- cypress-mochawesome-reporter
- ESLint
- Prettier

Os arquivos `.feature` sao documentacao de apoio e nao fazem parte da execucao automatizada.

## Estrategia de Automacao

As specs ficam organizadas por dominio. A camada de Page Objects encapsula telas completas, seletores, acoes e validacoes. O projeto nao usa BasePage nem fragments para manter a arquitetura simples para o teste pratico.

Seletores devem ser estaveis e preferencialmente baseados em `data-cy`. Enquanto o DOM real nao estiver mapeado, seletores provisórios ficam marcados com `TODO`.

## Estrategia de Evidencias

- Screenshots automaticos em falhas.
- Videos habilitados para execucoes headless.
- Relatorio HTML e JSON via Mochawesome.
- Downloads e PDFs armazenados em `cypress/downloads`.

## Riscos

- Ambiente indisponivel ou instavel.
- Dados de teste compartilhados alterados por outras execucoes.
- Ausencia de seletores estaveis no frontend.
- Fluxos com downloads usando nomes dinamicos.
- Autenticacao com redirecionamentos ou mecanismos externos.

## Melhorias Sugeridas

- Adicionar `data-cy` nos elementos criticos.
- Criar massa de dados dedicada para automacao.
- Implementar limpeza de dados via API, caso disponivel.
- Validar conteudo dos PDFs gerados.
- Executar a suite em pipeline CI.
