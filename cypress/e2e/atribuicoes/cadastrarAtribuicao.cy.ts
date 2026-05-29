import { criarAtribuicaoParaColaborador } from '@/fixtures/atribuicoes/cadastrarAtribuicao'
import { CadastrarAtribuicaoPage, ListarAtribuicoesPage } from '@/support/pages'

describe('Cadastrar Atribuicao', () => {
  const listarAtribuicoesPage = new ListarAtribuicoesPage()
  const cadastrarAtribuicaoPage = new CadastrarAtribuicaoPage()

  beforeEach(() => {
    cy.login()

    listarAtribuicoesPage.visitar()
    listarAtribuicoesPage.deveEstarCarregada()
    listarAtribuicoesPage.clicarNovaAtribuicao()

    cadastrarAtribuicaoPage.deveEstarCarregada()
  })

  // @regressivo @happy_path @ca01 @ca01_1
  it(
    'deve cadastrar uma nova atribuicao para colaborador com ativo vinculado',
    { tags: ['@regressivo', '@happy_path', '@ca01', '@ca01_1'] },
    () => {
      const atribuicao = criarAtribuicaoParaColaborador()

      cadastrarAtribuicaoPage.preencherCamposObrigatorios(atribuicao)
      cadastrarAtribuicaoPage.vincularPrimeiroAtivoAutomatizadoDaAtribuicao(atribuicao)
      cadastrarAtribuicaoPage.salvar()

      listarAtribuicoesPage.deveRetornarParaListagem()
      listarAtribuicoesPage.deveExibirMensagemDeSucesso(atribuicao)
      listarAtribuicoesPage.deveExibirAtivoAtribuidoNaTabela(atribuicao)
    },
  )

  // @complementar @non_happy_path @ca01 @ca01_3
  it(
    'deve validar campos obrigatorios ao tentar salvar sem preencher dados',
    { tags: ['@complementar', '@non_happy_path', '@ca01', '@ca01_3'] },
    () => {
      cadastrarAtribuicaoPage.salvar()
      cadastrarAtribuicaoPage.deveManterFormularioAberto()
      cadastrarAtribuicaoPage.deveExibirIndicadoresObrigatorios()
      cadastrarAtribuicaoPage.devePossuirCamposObrigatorios()
    },
  )

  // @complementar @non_happy_path @ca01 @ca01_4
  it(
    'deve habilitar o campo Pacote Office somente quando a opcao for marcada',
    { tags: ['@complementar', '@non_happy_path', '@ca01', '@ca01_4'] },
    () => {
      cadastrarAtribuicaoPage.deveExibirPacoteOfficeDesabilitado()
      cadastrarAtribuicaoPage.marcarUsoPacoteOffice()
      cadastrarAtribuicaoPage.deveExibirPacoteOfficeHabilitado()
      cadastrarAtribuicaoPage.desmarcarUsoPacoteOffice()
      cadastrarAtribuicaoPage.deveExibirPacoteOfficeDesabilitado()
    },
  )

  // @complementar @non_happy_path @ca01 @ca01_5
  it(
    'deve cancelar o cadastro e descartar os dados preenchidos',
    { tags: ['@complementar', '@non_happy_path', '@ca01', '@ca01_5'] },
    () => {
      const atribuicao = criarAtribuicaoParaColaborador()

      cadastrarAtribuicaoPage.preencherCamposObrigatorios(atribuicao)
      cadastrarAtribuicaoPage.cancelar()

      listarAtribuicoesPage.deveRetornarParaListagem()
    },
  )
})
