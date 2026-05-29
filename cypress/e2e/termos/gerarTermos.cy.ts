import { GerarTermosPage, ListarAtribuicoesPage } from '@/support/pages'

describe('Gerar Termos', () => {
  const listarAtribuicoesPage = new ListarAtribuicoesPage()
  const gerarTermosPage = new GerarTermosPage()

  beforeEach(() => {
    cy.login()

    listarAtribuicoesPage.visitar()
    listarAtribuicoesPage.deveEstarCarregada()
    listarAtribuicoesPage.filtrarPorTomboAutomatizado()
    listarAtribuicoesPage.deveExibirAtribuicaoComTomboAutomatizado()
    listarAtribuicoesPage.selecionarPrimeiraAtribuicaoComTomboAutomatizado()
    listarAtribuicoesPage.abrirModalGerarTermos()

    gerarTermosPage.deveExibirModalGerarTermos()
  })

  // @regressivo @happy_path @gt01 @gt01_1
  it(
    'deve gerar termo de responsabilidade',
    { tags: ['@regressivo', '@happy_path', '@gt01', '@gt01_1'] },
    () => {
      gerarTermosPage.selecionarTermoResponsabilidade()
      gerarTermosPage.gerarTermo()
      gerarTermosPage.deveManterTelaEmEstadoValidoAposGeracao()
    },
  )

  // @regressivo @happy_path @gt01 @gt01_2
  it(
    'deve gerar termo de emprestimo',
    { tags: ['@regressivo', '@happy_path', '@gt01', '@gt01_2'] },
    () => {
      gerarTermosPage.selecionarTermoEmprestimo()
      gerarTermosPage.gerarTermo()
      gerarTermosPage.deveManterTelaEmEstadoValidoAposGeracao()
    },
  )
})
