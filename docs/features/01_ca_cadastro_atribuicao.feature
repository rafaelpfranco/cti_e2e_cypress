@atribuicoes @cadastro_atribuicao
Funcionalidade: Cadastro de Atribuicao

  Contexto:
    Dado que o usuario esta autenticado no sistema
    E que existe um ativo disponivel para vinculacao

  @happy_path @ca01 @ca01_1
  Cenario: Cadastrar atribuicao para colaborador com ativo vinculado
    Quando o usuario cadastra uma atribuicao valida para colaborador
    E vincula um ativo disponivel
    Entao o sistema deve exibir uma mensagem de sucesso
    E a atribuicao deve ser exibida na listagem

  @non_happy_path @ca01 @ca01_3
  Cenario: Validar campos obrigatorios ao salvar atribuicao vazia
    Quando o usuario tenta salvar a atribuicao sem preencher dados obrigatorios
    Entao o sistema deve manter o formulario aberto
    E deve indicar os campos obrigatorios

  @non_happy_path @ca01 @ca01_4
  Cenario: Habilitar Pacote Office somente quando a opcao for marcada
    Quando o usuario alterna a opcao de uso de Pacote Office
    Entao o campo Pacote Office deve refletir o estado selecionado

  @non_happy_path @ca01 @ca01_5
  Cenario: Cancelar cadastro de atribuicao
    Quando o usuario preenche dados de uma nova atribuicao
    E cancela o cadastro
    Entao o sistema deve retornar para a listagem de atribuicoes
