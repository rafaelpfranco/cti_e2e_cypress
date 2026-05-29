@relatorios @relatorio_atribuicoes_por_area
Funcionalidade: Relatorio de Atribuicoes por Area

  Contexto:
    Dado que o usuario esta autenticado no sistema
    E que o usuario esta na pagina de relatorio de atribuicoes por area

  @regressivo @happy_path @ra01 @ra01_1
  Cenario: Pesquisar relatorio de atribuicoes por area
    Quando o usuario informa os filtros de atribuicoes por area
    E pesquisa o relatorio
    Entao o sistema deve manter a tela em estado valido

  @regressivo @happy_path @ra01 @ra01_2
  Cenario: Gerar relatorio de atribuicoes por area
    Quando o usuario solicita a geracao do relatorio
    Entao o sistema deve iniciar a geracao do relatorio
    E deve manter a tela em estado valido
