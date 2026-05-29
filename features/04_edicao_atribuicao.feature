@atribuicoes @edicao_atribuicao
Funcionalidade: Edicao de Atribuicao

  Contexto:
    Dado que o usuario esta autenticado no sistema
    E que existe uma atribuicao cadastrada
    E que o usuario esta na pagina de edicao da atribuicao

  @regressivo @happy_path @ea03 @ea03_1
  Cenario: Carregar dados existentes da atribuicao
    Entao o sistema deve exibir os dados salvos da atribuicao
    E deve exibir os ativos vinculados, quando existirem

  @regressivo @happy_path @ea03 @ea03_2
  Cenario: Editar atribuicao preenchendo apenas os campos obrigatorios
    Quando o usuario altera os campos obrigatorios da atribuicao
    E salva a edicao
    Entao o sistema deve atualizar a atribuicao com sucesso
    E os dados atualizados devem ser exibidos na listagem

  @regressivo @happy_path @ea03 @ea03_3
  Cenario: Editar atribuicao preenchendo todos os campos
    Quando o usuario altera todos os campos da atribuicao
    E salva a edicao
    Entao o sistema deve atualizar a atribuicao com sucesso
    E os dados atualizados devem ser exibidos na listagem

  @complementar @happy_path @ea03 @ea03_4
  Cenario: Substituir ativo vinculado a atribuicao
    Quando o usuario remove o ativo atual da atribuicao
    E vincula um novo ativo disponivel
    E salva a edicao
    Entao o sistema deve atualizar a atribuicao com sucesso
    E o novo ativo deve ficar vinculado a atribuicao

  @complementar @happy_path @ea03 @ea03_5
  Cenario: Substituir ativo com defeito
    Quando o usuario informa que o ativo atual esta com defeito
    E descreve o defeito identificado
    E vincula um novo ativo disponivel
    E salva a edicao
    Entao o sistema deve atualizar a atribuicao com sucesso
    E o ativo com defeito nao deve permanecer como ativo vinculado a atribuicao

  @complementar @non_happy_path @ea03 @ea03_6
  Cenario: Validar campos obrigatorios durante edicao da atribuicao
    Quando o usuario remove informacoes obrigatorias da atribuicao
    E tenta salvar a edicao
    Entao o sistema deve exibir as validacoes obrigatorias
    E a atribuicao nao deve ser atualizada

  @complementar @non_happy_path @ea03 @ea03_7
  Cenario: Cancelar edicao da atribuicao
    Quando o usuario altera os dados da atribuicao
    E cancela a edicao
    Entao o sistema deve retornar para a listagem de atribuicoes
    E as alteracoes nao salvas devem ser descartadas
