@atribuicoes @edicao_atribuicao
Funcionalidade: Edição de Atribuição

  Contexto:
    Dado que o usuário está autenticado no sistema
    E que existe uma atribuição cadastrada
    E que o usuário está na página de atribuições
    Quando o usuário acessa a edição da atribuição

  @happy_path @ea01 @ea01_1
  Cenário: Carregar dados existentes ao acessar edição da atribuição
    Então o sistema deve exibir a área salva anteriormente
    E deve exibir a subárea salva anteriormente
    E deve exibir o colaborador salvo anteriormente, quando aplicável
    E deve exibir a modalidade de trabalho salva anteriormente
    E deve exibir o sistema operacional salvo anteriormente
    E deve exibir o Pacote Office salvo anteriormente, quando aplicável
    E deve exibir as observações salvas anteriormente

  @happy_path @ea01 @ea01_2
  Cenário: Editar dados da atribuição com sucesso
    Quando o usuário altera a área da atribuição
    E altera a subárea da atribuição
    E altera a modalidade de trabalho
    E altera o sistema operacional
    E atualiza as observações
    E salva a atribuição
    Então o sistema deve exibir uma mensagem de atualização realizada com sucesso
    E os dados atualizados devem ser exibidos corretamente

  @happy_path @ea01 @ea01_3
  Cenário: Substituir ativo com status disponível
    Quando o usuário seleciona o status do ativo atual como "DISPONÍVEL"
    E remove o ativo da atribuição
    E vincula um novo ativo disponível à atribuição
    E salva a atribuição
    Então o sistema deve exibir uma mensagem de atualização realizada com sucesso
    E o ativo removido não deve mais estar vinculado à atribuição
    E o novo ativo deve estar vinculado à atribuição

  @happy_path @ea01 @ea01_4
  Cenário: Substituir ativo com defeito
    Quando o usuário seleciona o status do ativo atual como "COM DEFEITO"
    E informa a descrição do defeito do ativo
    E remove o ativo da atribuição
    E vincula um novo ativo disponível à atribuição
    E salva a atribuição
    Então o sistema deve exibir uma mensagem de atualização realizada com sucesso
    E o ativo com defeito não deve mais estar vinculado à atribuição
    E o novo ativo deve estar vinculado à atribuição

  @non_happy_path @ea01 @ea01_5
  Cenário: Validar campos obrigatórios durante edição da atribuição
    Quando o usuário limpa os campos obrigatórios
    E tenta salvar a atribuição
    Então o sistema deve exibir mensagens de validação para os campos obrigatórios
    E a atribuição não deve ser atualizada

  @non_happy_path @ea01 @ea01_6
  Cenário: Cancelar edição da atribuição e descartar alterações
    Quando o usuário altera os dados da atribuição
    E cancela a edição da atribuição
    Então o sistema deve retornar para a página de atribuições
    E a atribuição deve manter os dados salvos anteriormente
