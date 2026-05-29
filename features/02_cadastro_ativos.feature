@ativos @cadastro_ativos
Funcionalidade: Cadastro de Ativos

  Contexto:
    Dado que o usuario esta autenticado no sistema
    E que o usuario esta na pagina de cadastro de ativos

  @regressivo @happy_path @at01 @at01_1
  Cenario: Cadastrar ativo preenchendo apenas os campos obrigatorios
    Quando o usuario preenche os campos obrigatorios do ativo
    E salva o cadastro do ativo
    Entao o sistema deve cadastrar o ativo com sucesso
    E o ativo deve ser exibido na listagem

  @regressivo @happy_path @at01 @at01_2
  Cenario: Cadastrar ativo preenchendo todos os campos
    Quando o usuario preenche todos os campos do ativo
    E salva o cadastro do ativo
    Entao o sistema deve cadastrar o ativo com sucesso
    E o ativo deve ser exibido na listagem

  @complementar @non_happy_path @at01 @at01_3
  Cenario: Validar campos obrigatorios ao tentar salvar ativo vazio
    Quando o usuario tenta salvar o ativo sem preencher os campos obrigatorios
    Entao o sistema deve exibir as validacoes obrigatorias
    E o ativo nao deve ser cadastrado

  @complementar @non_happy_path @at01 @at01_4
  Cenario: Cancelar cadastro de ativo
    Quando o usuario preenche os dados do ativo
    E cancela o cadastro
    Entao o sistema deve retornar para a listagem de ativos
    E os dados nao salvos devem ser descartados
