import { dadosCadastroAtribuicao } from '@/fixtures/atribuicoes/cadastroAtribuicao'
import { AtribuicoesPage, NovaAtribuicaoPage } from '@/support/pages'

describe('Cadastro de Atribuicao', () => {
  const atribuicoesPage = new AtribuicoesPage()
  const novaAtribuicaoPage = new NovaAtribuicaoPage()

  beforeEach(() => {
    cy.login()

    atribuicoesPage.visitar()
    atribuicoesPage.deveEstarCarregada()
    atribuicoesPage.clicarNovaAtribuicao()

    novaAtribuicaoPage.deveEstarCarregada()
  })

  // @happy_path @ca01 @ca01_1
  it('deve cadastrar uma nova atribuicao para colaborador com ativo vinculado', () => {
    const atribuicao = { ...dadosCadastroAtribuicao.atribuicaoParaColaborador }

    novaAtribuicaoPage.preencherFormularioParaColaborador(atribuicao)
    novaAtribuicaoPage.vincularPrimeiroAtivo(atribuicao)
    novaAtribuicaoPage.salvar()

    atribuicoesPage.deveRetornarParaListagem()
    atribuicoesPage.deveExibirMensagemDeSucesso(atribuicao)
    atribuicoesPage.deveExibirAtivoAtribuidoNaTabela(atribuicao)
  })

  // @non_happy_path @ca01 @ca01_3
  it('deve validar campos obrigatorios ao tentar salvar sem preencher dados', () => {
    novaAtribuicaoPage.salvar()
    novaAtribuicaoPage.deveManterFormularioAberto()
    novaAtribuicaoPage.deveExibirIndicadoresObrigatorios()
    novaAtribuicaoPage.devePossuirCamposObrigatorios()
  })

  // @non_happy_path @ca01 @ca01_4
  it('deve habilitar o campo Pacote Office somente quando a opcao for marcada', () => {
    novaAtribuicaoPage.deveExibirPacoteOfficeDesabilitado()
    novaAtribuicaoPage.marcarUsoPacoteOffice()
    novaAtribuicaoPage.deveExibirPacoteOfficeHabilitado()
    novaAtribuicaoPage.desmarcarUsoPacoteOffice()
    novaAtribuicaoPage.deveExibirPacoteOfficeDesabilitado()
  })

  // @non_happy_path @ca01 @ca01_5
  it('deve cancelar o cadastro e descartar os dados preenchidos', () => {
    const atribuicao = { ...dadosCadastroAtribuicao.atribuicaoParaColaborador }

    novaAtribuicaoPage.preencherFormularioParaColaborador(atribuicao)
    novaAtribuicaoPage.cancelar()

    atribuicoesPage.deveRetornarParaListagem()
  })
})