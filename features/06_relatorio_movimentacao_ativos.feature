@relatorios @relatorio_movimentacao_ativos
Funcionalidade: Relatorio de Movimentacao de Ativos

  Contexto:
    Dado que o usuario esta autenticado no sistema
    E que o usuario esta na pagina de relatorio de movimentacao de ativos

  @regressivo @happy_path @rm01 @rm01_1
  Cenario: Pesquisar relatorio de movimentacao de ativos
    Quando o usuario informa os filtros de movimentacao de ativos
    E pesquisa o relatorio
    Entao o sistema deve manter a tela em estado valido

  @regressivo @happy_path @rm01 @rm01_2
  Cenario: Gerar relatorio de movimentacao de ativos
    Quando o usuario solicita a geracao do relatorio
    Entao o sistema deve iniciar a geracao do relatorio
    E deve manter a tela em estado valido
