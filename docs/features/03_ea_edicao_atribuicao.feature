@atribuicoes @edicao_atribuicao
Funcionalidade: Edição de Atribuição

  Contexto:
    Dado que o usuário está autenticado no sistema
    E que existe uma atribuição cadastrada
    E que o usuário está na página de edição da atribuição

  @happy_path @ea03 @ea03_1
  Cenário: Carregar dados existentes da atribuição
    Então o sistema deve exibir os dados salvos da atribuição
    E deve exibir os ativos vinculados, quando existirem

  @happy_path @ea03 @ea03_2
  Cenário: Editar atribuição preenchendo apenas os campos obrigatórios
    Quando o usuário altera os campos obrigatórios da atribuição
    E salva a edição
    Então o sistema deve atualizar a atribuição com sucesso
    E os dados atualizados devem ser exibidos na listagem

  @happy_path @ea03 @ea03_3
  Cenário: Editar atribuição preenchendo todos os campos
    Quando o usuário altera todos os campos da atribuição
    E salva a edição
    Então o sistema deve atualizar a atribuição com sucesso
    E os dados atualizados devem ser exibidos na listagem

  @happy_path @ea03 @ea03_4
  Cenário: Substituir ativo vinculado à atribuição
    Quando o usuário remove o ativo atual da atribuição
    E vincula um novo ativo disponível
    E salva a edição
    Então o sistema deve atualizar a atribuição com sucesso
    E o novo ativo deve ficar vinculado à atribuição

  @happy_path @ea03 @ea03_5
  Cenário: Substituir ativo com defeito
    Quando o usuário informa que o ativo atual está com defeito
    E descreve o defeito identificado
    E vincula um novo ativo disponível
    E salva a edição
    Então o sistema deve atualizar a atribuição com sucesso
    E o ativo com defeito não deve permanecer como ativo vinculado à atribuição

  @non_happy_path @ea03 @ea03_6
  Cenário: Validar campos obrigatórios durante edição da atribuição
    Quando o usuário remove informações obrigatórias da atribuição
    E tenta salvar a edição
    Então o sistema deve exibir as validações obrigatórias
    E a atribuição não deve ser atualizada

  @non_happy_path @ea03 @ea03_7
  Cenário: Cancelar edição da atribuição
    Quando o usuário altera os dados da atribuição
    E cancela a edição
    Então o sistema deve retornar para a listagem de atribuições
    E as alterações não salvas devem ser descartadas