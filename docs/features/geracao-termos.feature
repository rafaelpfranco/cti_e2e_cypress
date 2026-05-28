@atribuicoes @geracao_termos
Funcionalidade: Geração de Termos

  Contexto:
    Dado que o usuário está autenticado no sistema
    E que existe uma atribuição com ativos vinculados
    E que o usuário está na página de atribuições

  @smoke
  Cenário: Abrir modal de geração de termos para atribuição selecionada
    Quando o usuário seleciona uma atribuição
    E clica em "Gerar Termos"
    Então o sistema deve exibir o modal de geração de termos
    E o modal deve exibir as opções "Responsabilidade" e "Empréstimo"

  @termo_responsabilidade
  Cenário: Selecionar termo de Responsabilidade
    Quando o usuário seleciona uma atribuição
    E abre o modal de geração de termos
    E seleciona o tipo de termo "Responsabilidade"
    Então apenas o tipo de termo "Responsabilidade" deve permanecer selecionado
    E o botão "Gerar" deve estar disponível

  @termo_emprestimo
  Cenário: Selecionar termo de Empréstimo
    Quando o usuário seleciona uma atribuição
    E abre o modal de geração de termos
    E seleciona o tipo de termo "Empréstimo"
    Então apenas o tipo de termo "Empréstimo" deve permanecer selecionado
    E o botão "Gerar" deve estar disponível

  @regra_negocio
  Cenário: Garantir seleção de apenas um tipo de termo por vez
    Quando o usuário seleciona uma atribuição
    E abre o modal de geração de termos
    E seleciona o tipo de termo "Responsabilidade"
    E seleciona o tipo de termo "Empréstimo"
    Então apenas o tipo de termo "Empréstimo" deve permanecer selecionado

  @modal
  Cenário: Fechar modal de geração de termos pelo botão X
    Quando o usuário seleciona uma atribuição
    E abre o modal de geração de termos
    E fecha o modal pelo botão X
    Então o modal de geração de termos não deve mais ser exibido

  @pdf
  Esquema do Cenário: Gerar PDF para o tipo de termo selecionado
    Quando o usuário seleciona uma atribuição
    E abre o modal de geração de termos
    E seleciona o tipo de termo "<tipoTermo>"
    E gera o termo
    Então o sistema deve gerar um documento PDF
    E o PDF deve conter o título "<tituloDocumento>"
    E o PDF deve conter o nome do colaborador responsável
    E o PDF deve conter a seção de ativos atribuídos
    E o PDF deve conter local e data
    E o PDF deve conter o campo de assinatura do responsável

    Exemplos:
      | tipoTermo        | tituloDocumento           |
      | Responsabilidade | TERMO DE RESPONSABILIDADE |
      | Empréstimo       | TERMO DE EMPRÉSTIMO       |
