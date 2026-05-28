import { PaginaAtribuicoes } from '../../support/pages/atribuicoes/PaginaAtribuicoes'
import { PaginaNovaAtribuicao } from '../../support/pages/atribuicoes/PaginaNovaAtribuicao'

interface AtribuicaoCadastro {
  area: string
  subarea: string
  colaborador?: string
  atendidoPor: string
  modalidade: string
  sistemaOperacional: string
  usaPacoteOffice: boolean
  pacoteOffice: string
  observacao: string
  tomboAtivo: string
}

interface DadosCadastroAtribuicao {
  atribuicaoParaColaborador: AtribuicaoCadastro
  atribuicaoSemColaborador: AtribuicaoCadastro
}

describe('Cadastro de Atribuicao', () => {
  const paginaAtribuicoes = new PaginaAtribuicoes()
  const paginaNovaAtribuicao = new PaginaNovaAtribuicao()

  beforeEach(() => {
    cy.login()
  })

  // BDD tags: @atribuicoes @cadastro_atribuicao @happy_path @ca01 @ca01_1
  it.skip('deve cadastrar uma nova atribuicao para colaborador com ativo vinculado', () => {
    // TODO: confirmar regra real de validacao do ativo no POST.
    // O formulario retorna para /portal_service/bonds com a tela de nova atribuicao renderizada,
    // mesmo preenchendo tombo, descricao e status do ativo.
    cy.fixture<DadosCadastroAtribuicao>('atribuicoes/cadastro-atribuicao').then((dados) => {
      const atribuicao = dados.atribuicaoParaColaborador

      paginaAtribuicoes.visitar()
      paginaAtribuicoes.deveEstarCarregada()
      paginaAtribuicoes.clicarNovaAtribuicao()

      paginaNovaAtribuicao.deveEstarCarregada()
      paginaNovaAtribuicao.selecionarArea(atribuicao.area)
      paginaNovaAtribuicao.selecionarSubarea(atribuicao.subarea)
      paginaNovaAtribuicao.selecionarTipoColaborador()
      paginaNovaAtribuicao.selecionarColaborador(atribuicao.colaborador ?? '')
      paginaNovaAtribuicao.selecionarAtendidoPor(atribuicao.atendidoPor)
      paginaNovaAtribuicao.selecionarModalidade(atribuicao.modalidade)
      paginaNovaAtribuicao.selecionarSistemaOperacional(atribuicao.sistemaOperacional)

      if (atribuicao.usaPacoteOffice) {
        paginaNovaAtribuicao.marcarUsoPacoteOffice()
        paginaNovaAtribuicao.deveExibirPacoteOfficeHabilitado()
        paginaNovaAtribuicao.selecionarPacoteOffice(atribuicao.pacoteOffice)
      } else {
        paginaNovaAtribuicao.deveExibirPacoteOfficeDesabilitado()
      }

      paginaNovaAtribuicao.preencherObservacao(atribuicao.observacao)
      paginaNovaAtribuicao.vincularAtivo(atribuicao.tomboAtivo)
      paginaNovaAtribuicao.salvar()

      paginaAtribuicoes.deveRetornarParaListagem()
      paginaAtribuicoes.deveExibirAtribuicaoCadastrada(atribuicao.observacao)
    })
  })

  // BDD tags: @atribuicoes @cadastro_atribuicao @happy_path @ca01 @ca01_2
  it.skip('deve cadastrar uma nova atribuicao para subarea sem colaborador definido', () => {
    // TODO: confirmar regra real de validacao do ativo no POST.
    // O formulario retorna para /portal_service/bonds com a tela de nova atribuicao renderizada,
    // mesmo preenchendo tombo, descricao e status do ativo.
    cy.fixture<DadosCadastroAtribuicao>('atribuicoes/cadastro-atribuicao').then((dados) => {
      const atribuicao = dados.atribuicaoSemColaborador

      paginaAtribuicoes.visitar()
      paginaAtribuicoes.deveEstarCarregada()
      paginaAtribuicoes.clicarNovaAtribuicao()

      paginaNovaAtribuicao.deveEstarCarregada()
      paginaNovaAtribuicao.selecionarArea(atribuicao.area)
      paginaNovaAtribuicao.selecionarSubarea(atribuicao.subarea)
      paginaNovaAtribuicao.selecionarTipoSemColaborador()
      paginaNovaAtribuicao.selecionarAtendidoPor(atribuicao.atendidoPor)
      paginaNovaAtribuicao.selecionarModalidade(atribuicao.modalidade)
      paginaNovaAtribuicao.selecionarSistemaOperacional(atribuicao.sistemaOperacional)
      paginaNovaAtribuicao.preencherObservacao(atribuicao.observacao)
      paginaNovaAtribuicao.vincularAtivo(atribuicao.tomboAtivo)
      paginaNovaAtribuicao.salvar()

      paginaAtribuicoes.deveRetornarParaListagem()
      paginaAtribuicoes.deveExibirAtribuicaoCadastrada(atribuicao.observacao)
    })
  })

  // BDD tags: @atribuicoes @cadastro_atribuicao @non_happy_path @ca01 @ca01_3
  it('deve validar campos obrigatorios ao tentar salvar sem preencher dados', () => {
    paginaAtribuicoes.visitar()
    paginaAtribuicoes.deveEstarCarregada()
    paginaAtribuicoes.clicarNovaAtribuicao()

    paginaNovaAtribuicao.deveEstarCarregada()
    paginaNovaAtribuicao.salvar()
    paginaNovaAtribuicao.deveManterFormularioAberto()
    paginaNovaAtribuicao.deveExibirIndicadoresObrigatorios()
    paginaNovaAtribuicao.devePossuirCamposObrigatorios()
  })

  // BDD tags: @atribuicoes @cadastro_atribuicao @non_happy_path @ca01 @ca01_4
  it('deve habilitar o campo Pacote Office somente quando a opcao for marcada', () => {
    paginaAtribuicoes.visitar()
    paginaAtribuicoes.deveEstarCarregada()
    paginaAtribuicoes.clicarNovaAtribuicao()

    paginaNovaAtribuicao.deveEstarCarregada()
    paginaNovaAtribuicao.deveExibirPacoteOfficeDesabilitado()
    paginaNovaAtribuicao.marcarUsoPacoteOffice()
    paginaNovaAtribuicao.deveExibirPacoteOfficeHabilitado()
    paginaNovaAtribuicao.desmarcarUsoPacoteOffice()
    paginaNovaAtribuicao.deveExibirPacoteOfficeDesabilitado()
  })

  // BDD tags: @atribuicoes @cadastro_atribuicao @non_happy_path @ca01 @ca01_5
  it('deve cancelar o cadastro e descartar os dados preenchidos', () => {
    cy.fixture<DadosCadastroAtribuicao>('atribuicoes/cadastro-atribuicao').then((dados) => {
      const atribuicao = dados.atribuicaoParaColaborador

      paginaAtribuicoes.visitar()
      paginaAtribuicoes.deveEstarCarregada()
      paginaAtribuicoes.clicarNovaAtribuicao()

      paginaNovaAtribuicao.deveEstarCarregada()
      paginaNovaAtribuicao.selecionarArea(atribuicao.area)
      paginaNovaAtribuicao.selecionarSubarea(atribuicao.subarea)
      paginaNovaAtribuicao.selecionarTipoColaborador()
      paginaNovaAtribuicao.selecionarColaborador(atribuicao.colaborador ?? '')
      paginaNovaAtribuicao.preencherObservacao(atribuicao.observacao)
      paginaNovaAtribuicao.cancelar()

      paginaAtribuicoes.deveRetornarParaListagem()
    })
  })
})
