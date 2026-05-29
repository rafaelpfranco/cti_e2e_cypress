@termos @geracao_termos
Funcionalidade: Geracao de Termos

  Contexto:
    Dado que o usuario esta autenticado no sistema
    E que existe uma atribuicao com ativo automatizado
    E que o usuario abriu o modal de geracao de termos

  @regressivo @happy_path @gt01 @gt01_1
  Cenario: Gerar termo de responsabilidade
    Quando o usuario seleciona o termo de responsabilidade
    E confirma a geracao do termo
    Entao o sistema deve concluir a geracao do termo
    E deve manter a tela em estado valido para o usuario

  @regressivo @happy_path @gt01 @gt01_2
  Cenario: Gerar termo de emprestimo
    Quando o usuario seleciona o termo de emprestimo
    E confirma a geracao do termo
    Entao o sistema deve concluir a geracao do termo
    E deve manter a tela em estado valido para o usuario
