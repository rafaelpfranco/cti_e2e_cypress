@relatorios @relatorio_atribuicoes_por_area
Funcionalidade: Relatório de Atribuições por Área

  Contexto:
    Dado que o usuário está autenticado no sistema
    E que o usuário está na página de relatório de atribuições por área

  @smoke
  Cenário: Exibir tela de relatório de atribuições por área
    Então o sistema deve exibir a tela de relatório de atribuições por área
    E deve exibir o filtro de área
    E deve exibir o filtro de período
    E deve exibir o botão "Pesquisar"
    E deve exibir o botão "Gerar Relatório"

  @pesquisa
  Cenário: Filtrar atribuições por área e período
    Quando o usuário seleciona uma área
    E preenche a data inicial
    E preenche a data final
    E pesquisa o relatório
    Então o sistema deve atualizar a listagem de atribuições conforme os filtros selecionados

  @resultados
  Cenário: Validar agrupamento das atribuições por área
    Quando o usuário filtra atribuições com dados disponíveis
    Então o sistema deve exibir os resultados agrupados por área
    E deve exibir os registros de atribuição da área selecionada

  @resultados
  Cenário: Validar informações das atribuições na listagem
    Quando o usuário filtra atribuições com dados disponíveis
    Então cada atribuição deve exibir o tombo do ativo
    E deve exibir o número de série do ativo
    E deve exibir a descrição do equipamento
    E deve exibir a lotação atual
    E deve exibir o colaborador responsável

  @pdf
  Cenário: Gerar PDF do relatório de atribuições por área
    Quando o usuário filtra atribuições com dados disponíveis
    E gera o relatório
    Então o sistema deve abrir o PDF em uma nova aba
    E o PDF deve respeitar o mesmo agrupamento exibido em tela

  @sem_dados
  Cenário: Exibir mensagem quando não houver atribuições disponíveis
    Quando o usuário filtra atribuições sem dados disponíveis
    Então o sistema deve exibir uma mensagem informando que não há dados disponíveis
