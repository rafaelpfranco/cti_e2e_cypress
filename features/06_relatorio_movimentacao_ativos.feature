@relatorios @relatorio_movimentacao_ativos
Funcionalidade: Relatorio de Movimentacao de Ativos

  Contexto:
    Dado que o usuario esta autenticado no sistema

  @regressivo @happy_path @rma01 @rma01_1
  Cenario: Acessar tela de relatorio de movimentacao de ativos
    Quando o usuario acessa o relatorio de movimentacao de ativos
    Entao o sistema deve exibir os filtros do relatorio

  @regressivo @happy_path @rma01 @rma01_2
  Cenario: Filtrar movimentacoes de ativos
    Quando o usuario informa filtros validos para movimentacao de ativos
    E pesquisa o relatorio
    Entao o sistema deve atualizar os resultados conforme os filtros

  @regressivo @happy_path @rma01 @rma01_3
  Cenario: Gerar PDF do relatorio de movimentacao de ativos
    Quando o usuario gera o relatorio de movimentacao de ativos
    Entao o sistema deve disponibilizar o PDF do relatorio

  @complementar @happy_path @rma01 @rma01_4
  Cenario: Validar agrupamento das movimentacoes
    Quando o usuario filtra movimentacoes com dados disponiveis
    Entao o sistema deve exibir os resultados agrupados

  @complementar @happy_path @rma01 @rma01_5
  Cenario: Validar informacoes da listagem
    Quando o usuario filtra movimentacoes com dados disponiveis
    Entao o sistema deve exibir as principais informacoes dos ativos movimentados

  @complementar @non_happy_path @rma01 @rma01_6
  Cenario: Exibir mensagem quando nao houver movimentacoes
    Quando o usuario filtra movimentacoes sem dados disponiveis
    Entao o sistema deve informar que nao ha dados disponiveis
