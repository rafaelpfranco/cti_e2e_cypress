import { dadosEdicaoAtribuicao } from '@/fixtures/atribuicoes/edicaoAtribuicao'
import { AtribuicoesPage, EditarAtribuicaoPage } from '@/support/pages'

describe('Edicao de Atribuicao', () => {
  const atribuicoesPage = new AtribuicoesPage()
  const editarAtribuicaoPage = new EditarAtribuicaoPage()

  beforeEach(() => {
    cy.login()
  })

  // BDD tags: @atribuicoes @edicao_atribuicao @happy_path @ea01 @ea01_1
  it('deve carregar os dados de uma atribuicao existente ao acessar edicao', () => {
    atribuicoesPage.visitar()
    atribuicoesPage.deveEstarCarregada()
    atribuicoesPage.deveExibirTabela()
    atribuicoesPage.clicarEditarPrimeiraAtribuicao()

    editarAtribuicaoPage.deveEstarCarregada()
    editarAtribuicaoPage.deveExibirDadosCarregados()
  })

  // BDD tags: @atribuicoes @edicao_atribuicao @happy_path @ea01 @ea01_2
  it('deve editar dados da atribuicao com sucesso', () => {
    const atribuicao = dadosEdicaoAtribuicao.atribuicaoAtualizada

    atribuicoesPage.visitar()
    atribuicoesPage.deveEstarCarregada()
    atribuicoesPage.deveExibirTabela()
    atribuicoesPage.clicarEditarPrimeiraAtribuicao()

    editarAtribuicaoPage.deveEstarCarregada()
    editarAtribuicaoPage.selecionarArea(atribuicao.area)
    editarAtribuicaoPage.selecionarSubarea(atribuicao.subarea)
    editarAtribuicaoPage.selecionarAtendidoPor(atribuicao.atendidoPor)
    editarAtribuicaoPage.selecionarModalidade(atribuicao.modalidade)
    editarAtribuicaoPage.selecionarSistemaOperacional(atribuicao.sistemaOperacional)
    editarAtribuicaoPage.preencherObservacao(atribuicao.observacao)
    editarAtribuicaoPage.salvar()

    atribuicoesPage.deveRetornarParaListagem()
    atribuicoesPage.deveExibirAtribuicaoCadastrada(atribuicao.observacao)
  })

  // BDD tags: @atribuicoes @edicao_atribuicao @happy_path @ea01 @ea01_3
  it.skip('deve remover ativo disponivel e adicionar novo ativo', () => {
    // TODO: confirmar seletores reais do status do ativo e botao Remover na tela de edicao.
  })

  // BDD tags: @atribuicoes @edicao_atribuicao @happy_path @ea01 @ea01_4
  it.skip('deve remover ativo com defeito, informar defeito e adicionar novo ativo', () => {
    // TODO: confirmar seletores reais do campo de defeito, status do ativo e botao Remover na tela de edicao.
  })

  // BDD tags: @atribuicoes @edicao_atribuicao @non_happy_path @ea01 @ea01_5
  it('deve validar campos obrigatorios durante a edicao', () => {
    atribuicoesPage.visitar()
    atribuicoesPage.deveEstarCarregada()
    atribuicoesPage.deveExibirTabela()
    atribuicoesPage.clicarEditarPrimeiraAtribuicao()

    editarAtribuicaoPage.deveEstarCarregada()
    editarAtribuicaoPage.devePossuirCamposObrigatorios()
    editarAtribuicaoPage.salvar()
    editarAtribuicaoPage.deveManterFormularioAberto()
  })

  // BDD tags: @atribuicoes @edicao_atribuicao @non_happy_path @ea01 @ea01_6
  it('deve cancelar a edicao e descartar alteracoes', () => {
    const atribuicao = dadosEdicaoAtribuicao.atribuicaoAtualizada

    atribuicoesPage.visitar()
    atribuicoesPage.deveEstarCarregada()
    atribuicoesPage.deveExibirTabela()
    atribuicoesPage.clicarEditarPrimeiraAtribuicao()

    editarAtribuicaoPage.deveEstarCarregada()
    editarAtribuicaoPage.preencherObservacao(atribuicao.observacao)
    editarAtribuicaoPage.cancelar()

    atribuicoesPage.deveRetornarParaListagem()
  })
})
