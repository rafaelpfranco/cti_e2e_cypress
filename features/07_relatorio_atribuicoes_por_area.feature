@relatorios @relatorio_atribuicoes_por_area
Funcionalidade: Relatorio de Atribuicoes por Area

  Contexto:
    Dado que o usuario esta autenticado no sistema

  @regressivo @happy_path @raa01 @raa01_1
  Cenario: Acessar tela de relatorio de atribuicoes por area
    Quando o usuario acessa o relatorio de atribuicoes por area
    Entao o sistema deve exibir os filtros do relatorio

  @regressivo @happy_path @raa01 @raa01_2
  Cenario: Filtrar atribuicoes por area
    Quando o usuario informa filtros validos para atribuicoes por area
    E pesquisa o relatorio
    Entao o sistema deve atualizar os resultados conforme os filtros

  @regressivo @happy_path @raa01 @raa01_3
  Cenario: Gerar PDF do relatorio de atribuicoes por area
    Quando o usuario gera o relatorio de atribuicoes por area
    Entao o sistema deve disponibilizar o PDF do relatorio

  @complementar @happy_path @raa01 @raa01_4
  Cenario: Validar agrupamento das atribuicoes
    Quando o usuario filtra atribuicoes com dados disponiveis
    Entao o sistema deve exibir os resultados agrupados por area

  @complementar @happy_path @raa01 @raa01_5
  Cenario: Validar informacoes da listagem
    Quando o usuario filtra atribuicoes com dados disponiveis
    Entao o sistema deve exibir as principais informacoes das atribuicoes

  @complementar @non_happy_path @raa01 @raa01_6
  Cenario: Exibir mensagem quando nao houver atribuicoes
    Quando o usuario filtra atribuicoes sem dados disponiveis
    Entao o sistema deve informar que nao ha dados disponiveis
