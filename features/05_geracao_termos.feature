@termos @geracao_termos
Funcionalidade: Geracao de Termos

  Contexto:
    Dado que o usuario esta autenticado no sistema
    E que existe uma atribuicao com ativo automatizado
    E que o usuario abriu o modal de geracao de termos

  @regressivo @happy_path @gt01 @gt01_1
  Cenario: Exibir modal de geracao de termos
    Entao o sistema deve exibir as opcoes de termo disponiveis

  @regressivo @happy_path @gt01 @gt01_2
  Cenario: Gerar termo de responsabilidade
    Quando o usuario seleciona o termo de responsabilidade
    E confirma a geracao do termo
    Entao o sistema deve iniciar a geracao do termo

  @complementar @happy_path @gt01 @gt01_3
  Cenario: Fechar modal de geracao de termos
    Quando o usuario fecha o modal
    Entao o sistema deve retornar para a listagem de atribuicoes
