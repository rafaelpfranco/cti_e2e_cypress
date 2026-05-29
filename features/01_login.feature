@login
Funcionalidade: Login

  Contexto:
    Dado que o usuario esta na pagina de login

  @regressivo @happy_path @lg01 @lg01_1
  Cenario: Realizar login com credenciais validas
    Quando o usuario informa credenciais validas
    E acessa o sistema
    Entao o sistema deve autenticar o usuario com sucesso
    E deve exibir a pagina inicial do sistema

  @regressivo @happy_path @lg01 @lg01_3
  Cenario: Realizar logout do sistema
    Dado que o usuario esta autenticado no sistema
    Quando o usuario solicita logout
    Entao o sistema deve encerrar a sessao
    E deve retornar para a pagina de login
