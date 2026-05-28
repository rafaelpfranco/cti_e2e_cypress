@ativos @cadastro_ativo
Funcionalidade: Cadastro de Ativo

  Contexto:
    Dado que o usuario esta autenticado no sistema
    E que o usuario esta na listagem de ativos

  @happy_path @cat01 @cat01_1
  Cenario: Cadastrar ativo do tipo camera
    Quando o usuario cadastra um ativo valido do tipo camera
    Entao o sistema deve exibir uma mensagem de sucesso
    E o ativo deve ser exibido na listagem

  @happy_path @cat01 @cat01_2
  Cenario: Cadastrar ativo do tipo estabilizador
    Quando o usuario cadastra um ativo valido do tipo estabilizador
    Entao o sistema deve exibir uma mensagem de sucesso
    E o ativo deve ser exibido na listagem
