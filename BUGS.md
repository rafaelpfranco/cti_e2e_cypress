# Bugs Encontrados - Inventário CTI

Este documento reúne inconsistências e oportunidades de melhoria identificadas durante a análise exploratória e implementação dos testes automatizados E2E.

## Resumo

| ID           | Tipo     | Funcionalidade         | Título                                                                                 | Severidade | Prioridade | Status |
| ------------ | -------- | ---------------------- | -------------------------------------------------------------------------------------- | ---------- | ---------- | ------ |
| MELHORIA-001 | Melhoria | Atribuições            | Pesquisa por tombo recarrega a tela inteira                                            | Baixa      | Média      | Aberto |
| BUG-001      | Bug      | Cadastro de Atribuição | Campo colaborador permanece obrigatório para atribuição sem colaborador ou por subárea | Média      | Alta       | Aberto |
| BUG-002      | Bug      | Cadastro de Atribuição | Formulário permite envio com campos obrigatórios não preenchidos                       | Alta       | Alta       | Aberto |

---

## Melhorias

### MELHORIA-001 - Pesquisa por tombo recarrega a tela inteira

#### Funcionalidade

Atribuições

#### História de Usuário Relacionada

História de Usuário 02 - Editar Atribuições

#### Severidade

Baixa

#### Prioridade

Média

#### Ambiente

http://testeqa.pge.ce.gov.br

#### Pré-condição

Usuário autenticado no sistema e posicionado na tela de atribuições.

#### Passos para Reproduzir

1. Acessar a tela de Atribuições.
2. Utilizar o filtro de pesquisa por tombo.
3. Informar um tombo para consulta.
4. Executar a pesquisa.

#### Resultado Atual

Ao pesquisar por um tombo, a tela inteira é recarregada para atualizar os resultados.

#### Resultado Esperado

A pesquisa deveria atualizar apenas a listagem ou apresentar um comportamento mais fluido, evitando recarregamento completo da página e melhorando a experiência de uso.

#### Evidência

https://jam.dev/c/c4b61370-0ed0-4d97-b186-e0d15571433b

#### Observações

O comportamento não impede o uso da funcionalidade, mas torna o fluxo mais lento e menos eficiente, principalmente em cenários de consulta recorrente.

#### Status

Aberto

---

## Bugs Formalizados

### BUG-001 - Campo colaborador permanece obrigatório para atribuição sem colaborador ou por subárea

#### Funcionalidade

Cadastro de Atribuição

#### História de Usuário Relacionada

História de Usuário 01 - Cadastro de Atribuições

#### Severidade

Média

#### Prioridade

Alta

#### Ambiente

http://testeqa.pge.ce.gov.br

#### Pré-condição

Usuário autenticado no sistema e posicionado na tela de cadastro de atribuição.

#### Passos para Reproduzir

1. Acessar o menu Atribuições.
2. Clicar em Nova Atribuição.
3. Selecionar uma área.
4. Selecionar uma subárea.
5. Selecionar a opção "Sem colaborador" ou "Subárea".
6. Preencher os demais campos obrigatórios necessários.
7. Tentar salvar a atribuição.

#### Resultado Atual

Mesmo ao selecionar "Sem colaborador" ou "Subárea", o sistema continua exigindo a seleção de um colaborador.

#### Resultado Esperado

Ao selecionar "Sem colaborador" ou "Subárea", o campo de colaborador não deve ser obrigatório, pois essas opções indicam que a atribuição não será realizada para um colaborador específico.

#### Evidência

https://jam.dev/c/fac11186-cce8-499c-9625-591041fa3836

#### Observações

O comportamento diverge do critério de aceite que prevê a possibilidade de atribuir um ativo para uma subárea sem colaborador definido.

#### Status

Aberto

---

### BUG-002 - Formulário permite envio com campos obrigatórios não preenchidos

#### Funcionalidade

Cadastro de Atribuição

#### História de Usuário Relacionada

História de Usuário 01 - Cadastro de Atribuições

#### Severidade

Alta

#### Prioridade

Alta

#### Ambiente

http://testeqa.pge.ce.gov.br

#### Pré-condição

Usuário autenticado no sistema e posicionado na tela de cadastro de atribuição.

#### Passos para Reproduzir

1. Acessar o menu Atribuições.
2. Clicar em Nova Atribuição.
3. Preencher apenas os campos Área, Subárea e Colaborador.
4. Não preencher os demais campos obrigatórios.
5. Tentar salvar a atribuição.

#### Resultado Atual

O sistema permite submeter o formulário mesmo com campos obrigatórios não preenchidos.

Após o envio, a mensagem exibida não representa todos os problemas encontrados, informando apenas a ausência de ativo vinculado. Além disso, o select "Atendido por" desaparece da tela.

#### Resultado Esperado

O sistema deve impedir o envio do formulário enquanto existirem campos obrigatórios não preenchidos.

Todos os campos obrigatórios devem possuir validação adequada, e as mensagens exibidas devem indicar corretamente todos os campos pendentes ou inválidos.

O campo "Atendido por" deve permanecer disponível na tela após a tentativa de envio com erro.

#### Evidência

A evidência ainda será adicionada.

#### Observações

O comportamento impacta a validação de obrigatoriedade do formulário e pode causar inconsistência visual após tentativa de submissão inválida.

#### Status

Aberto

---

## Pontos de Atenção

Adicionar aqui apenas problemas observados durante a automação, mas que ainda dependem de confirmação ou evidência adicional.

| ID     | Funcionalidade      | Descrição                                                                                                                                                                                                                                                                            | Status               |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| PA-001 | Comportamento geral | Durante a automação, foi necessário tratar exceções JavaScript relacionadas a propriedades `disabled` nulas em `cypress/support/e2e.ts`. As mensagens observadas foram `Cannot read properties of null (reading 'disabled')` e `Cannot set properties of null (setting 'disabled')`. | Requer evidência     |
| PA-002 | Pipeline / Ambiente | O runner público do GitHub Actions resolveu o DNS do ambiente, mas não conseguiu conectar na porta 80 do host de teste. Este item indica limitação de acesso do runner público ao ambiente, não necessariamente bug funcional do sistema.                                            | Confirmar estratégia |

### PA-001 - Exceções JavaScript relacionadas a propriedades `disabled` nulas

#### Onde foi observado

Arquivo `cypress/support/e2e.ts`, no tratamento de `uncaught:exception`.

#### Motivo para não formalizar como bug

Há indício técnico de exceção JavaScript durante a execução automatizada, mas ainda falta evidência funcional demonstrando impacto direto para o usuário final.

#### Evidência necessária

Captura do erro no navegador, log do console ou reprodução manual indicando em qual tela/ação a exceção ocorre e qual impacto ela causa na interface.

#### Status

Requer evidência.

### PA-002 - Runner público do GitHub Actions não acessa o ambiente de teste

#### Onde foi observado

Logs do workflow GitHub Actions durante diagnóstico temporário de conectividade.

#### Motivo para não formalizar como bug

O DNS do ambiente foi resolvido, mas a conexão HTTP na porta 80 falhou por timeout a partir do runner público. Isso caracteriza limitação de rede, firewall, rota ou política de acesso, não uma falha funcional confirmada do Inventário CTI.

#### Evidência necessária

Registro da execução da pipeline e decisão técnica sobre uso de self-hosted runner ou liberação de rede para o ambiente de teste.

#### Status

Confirmar estratégia.

---

## Modelo de Bug

### BUG-XXX - [Título]

#### Funcionalidade

#### História de Usuário Relacionada

#### Severidade

#### Prioridade

#### Ambiente

#### Pré-condição

#### Passos para Reproduzir

1.
2.
3.

#### Resultado Atual

#### Resultado Esperado

#### Evidência

#### Observações

#### Status
