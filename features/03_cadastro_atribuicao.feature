@atribuicoes @cadastro_atribuicao
Funcionalidade: Cadastro de Atribuicao

  Contexto:
    Dado que o usuario esta autenticado no sistema
    E que o usuario esta na pagina de cadastro de atribuicao

  @regressivo @happy_path @ca01 @ca01_1
  Cenario: Cadastrar atribuicao preenchendo apenas os campos obrigatorios
    Quando o usuario preenche os campos obrigatorios da atribuicao
    E vincula um ativo disponivel
    E salva a atribuicao
    Entao o sistema deve cadastrar a atribuicao com sucesso
    E a atribuicao deve ser exibida na listagem

  @regressivo @happy_path @ca01 @ca01_2
  Cenario: Cadastrar atribuicao preenchendo todos os campos
    Quando o usuario preenche todos os campos da atribuicao
    E vincula um ativo disponivel
    E salva a atribuicao
    Entao o sistema deve cadastrar a atribuicao com sucesso
    E a atribuicao deve ser exibida na listagem

  @complementar @non_happy_path @ca01 @ca01_3
  Cenario: Validar campos obrigatorios ao tentar salvar atribuicao vazia
    Quando o usuario tenta salvar a atribuicao sem preencher os campos obrigatorios
    Entao o sistema deve exibir as validacoes obrigatorias
    E a atribuicao nao deve ser cadastrada

  @complementar @non_happy_path @ca01 @ca01_4
  Cenario: Habilitar campo Pacote Office somente quando a opcao for marcada
    Quando o usuario marca a opcao de uso do Pacote Office
    Entao o campo Pacote Office deve ficar disponivel para selecao
    Quando o usuario desmarca a opcao de uso do Pacote Office
    Entao o campo Pacote Office deve ficar indisponivel para selecao

  @complementar @non_happy_path @ca01 @ca01_5
  Cenario: Cancelar cadastro de atribuicao
    Quando o usuario preenche os dados da atribuicao
    E cancela o cadastro
    Entao o sistema deve retornar para a listagem de atribuicoes
    E os dados nao salvos devem ser descartados
