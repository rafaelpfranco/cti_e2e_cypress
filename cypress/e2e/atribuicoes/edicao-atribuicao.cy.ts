import { PaginaAtribuicoes } from '../../support/pages/atribuicoes/PaginaAtribuicoes'
import { PaginaEditarAtribuicao } from '../../support/pages/atribuicoes/PaginaEditarAtribuicao'

interface AtribuicaoAtualizada {
  area: string
  subarea: string
  atendidoPor: string
  modalidade: string
  sistemaOperacional: string
  observacao: string
}

interface DadosEdicaoAtribuicao {
  atribuicaoAtualizada: AtribuicaoAtualizada
}

describe('Edicao de Atribuicao', () => {
  const paginaAtribuicoes = new PaginaAtribuicoes()
  const paginaEditarAtribuicao = new PaginaEditarAtribuicao()

  beforeEach(() => {
    cy.login()
  })

  // BDD tags: @atribuicoes @edicao_atribuicao @happy_path @ea01 @ea01_1
  it('deve carregar os dados de uma atribuicao existente ao acessar edicao', () => {
    paginaAtribuicoes.visitar()
    paginaAtribuicoes.deveEstarCarregada()
    paginaAtribuicoes.deveExibirTabela()
    paginaAtribuicoes.clicarEditarPrimeiraAtribuicao()

    paginaEditarAtribuicao.deveEstarCarregada()
    paginaEditarAtribuicao.deveExibirDadosCarregados()
  })

  // BDD tags: @atribuicoes @edicao_atribuicao @happy_path @ea01 @ea01_2
  it('deve editar dados da atribuicao com sucesso', () => {
    cy.fixture<DadosEdicaoAtribuicao>('atribuicoes/edicao-atribuicao').then((dados) => {
      const atribuicao = dados.atribuicaoAtualizada

      paginaAtribuicoes.visitar()
      paginaAtribuicoes.deveEstarCarregada()
      paginaAtribuicoes.deveExibirTabela()
      paginaAtribuicoes.clicarEditarPrimeiraAtribuicao()

      paginaEditarAtribuicao.deveEstarCarregada()
      paginaEditarAtribuicao.selecionarArea(atribuicao.area)
      paginaEditarAtribuicao.selecionarSubarea(atribuicao.subarea)
      paginaEditarAtribuicao.selecionarAtendidoPor(atribuicao.atendidoPor)
      paginaEditarAtribuicao.selecionarModalidade(atribuicao.modalidade)
      paginaEditarAtribuicao.selecionarSistemaOperacional(atribuicao.sistemaOperacional)
      paginaEditarAtribuicao.preencherObservacao(atribuicao.observacao)
      paginaEditarAtribuicao.salvar()

      paginaAtribuicoes.deveRetornarParaListagem()
      paginaAtribuicoes.deveExibirAtribuicaoCadastrada(atribuicao.observacao)
    })
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
    paginaAtribuicoes.visitar()
    paginaAtribuicoes.deveEstarCarregada()
    paginaAtribuicoes.deveExibirTabela()
    paginaAtribuicoes.clicarEditarPrimeiraAtribuicao()

    paginaEditarAtribuicao.deveEstarCarregada()
    paginaEditarAtribuicao.devePossuirCamposObrigatorios()
    paginaEditarAtribuicao.salvar()
    paginaEditarAtribuicao.deveManterFormularioAberto()
  })

  // BDD tags: @atribuicoes @edicao_atribuicao @non_happy_path @ea01 @ea01_6
  it('deve cancelar a edicao e descartar alteracoes', () => {
    cy.fixture<DadosEdicaoAtribuicao>('atribuicoes/edicao-atribuicao').then((dados) => {
      const atribuicao = dados.atribuicaoAtualizada

      paginaAtribuicoes.visitar()
      paginaAtribuicoes.deveEstarCarregada()
      paginaAtribuicoes.deveExibirTabela()
      paginaAtribuicoes.clicarEditarPrimeiraAtribuicao()

      paginaEditarAtribuicao.deveEstarCarregada()
      paginaEditarAtribuicao.preencherObservacao(atribuicao.observacao)
      paginaEditarAtribuicao.cancelar()

      paginaAtribuicoes.deveRetornarParaListagem()
    })
  })
})
