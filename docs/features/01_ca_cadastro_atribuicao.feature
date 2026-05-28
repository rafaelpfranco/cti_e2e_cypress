@atribuicoes @cadastro_atribuicao
Funcionalidade: Cadastro de Atribuição

  Contexto:
    Dado que o usuário está autenticado no sistema
    E que o usuário está na página de atribuições
    Quando o usuário inicia uma nova atribuição

  @happy_path @ca01 @ca01_1
  Cenário: Cadastrar uma nova atribuição para colaborador com ativo vinculado
    Quando o usuário seleciona uma área
    E seleciona uma subárea
    E seleciona um colaborador
    E seleciona a modalidade de trabalho "Presencial"
    E seleciona um sistema operacional
    E marca que utilizará Pacote Office
    E seleciona um Pacote Office
    E adiciona uma observação
    E vincula um ativo disponível à atribuição
    E salva a atribuição
    Então o sistema deve exibir uma mensagem de sucesso
    E o ativo deve ser exibido como atribuído no inventário

  @happy_path @ca01 @ca01_2
  Cenário: Cadastrar uma nova atribuição para subárea sem colaborador definido
    Quando o usuário seleciona uma área
    E seleciona uma subárea
    E seleciona a opção de atribuição sem colaborador
    E seleciona a modalidade de trabalho "Presencial"
    E seleciona um sistema operacional
    E vincula um ativo disponível à atribuição
    E salva a atribuição
    Então o sistema deve exibir uma mensagem de sucesso
    E a atribuição deve ser criada para a subárea selecionada

  @non_happy_path @ca01 @ca01_3
  Cenário: Validar campos obrigatórios ao tentar salvar atribuição vazia
    Quando o usuário tenta salvar a atribuição sem preencher os campos obrigatórios
    Então o sistema deve exibir mensagens de validação para os campos obrigatórios
    E a atribuição não deve ser cadastrada

  @non_happy_path @ca01 @ca01_4
  Cenário: Exibir campo Pacote Office somente quando a opção for marcada
    Quando o usuário não marca a opção "Utilizará Pacote Office?"
    Então o campo Pacote Office não deve ser obrigatório
    E o campo Pacote Office não deve estar disponível para seleção
    Quando o usuário marca a opção "Utilizará Pacote Office?"
    Então o campo Pacote Office deve estar disponível para seleção

  @non_happy_path @ca01 @ca01_5
  Cenário: Cancelar cadastro de atribuição e descartar dados preenchidos
    Quando o usuário preenche os dados da atribuição
    E cancela o cadastro da atribuição
    Então o sistema deve retornar para a página de atribuições
    E os dados não salvos devem ser descartados
