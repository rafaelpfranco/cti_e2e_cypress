import { GerarRelatorioAtribuicoesPorAreaPage } from '@/support/pages'

describe('Gerar Relatorio de Atribuicoes por Area', () => {
  const gerarRelatorioAtribuicoesPorAreaPage = new GerarRelatorioAtribuicoesPorAreaPage()

  beforeEach(() => {
    cy.login()

    gerarRelatorioAtribuicoesPorAreaPage.visitar()
    gerarRelatorioAtribuicoesPorAreaPage.deveEstarCarregada()
  })

  // @regressivo @happy_path @ra01 @ra01_1
  it(
    'deve pesquisar relatorio de atribuicoes por area',
    { tags: ['@regressivo', '@happy_path', '@ra01', '@ra01_1'] },
    () => {
      gerarRelatorioAtribuicoesPorAreaPage.selecionarTipoSintetico()
      gerarRelatorioAtribuicoesPorAreaPage.selecionarArea('JUDICIAL')
      gerarRelatorioAtribuicoesPorAreaPage.pesquisar()
      gerarRelatorioAtribuicoesPorAreaPage.deveExibirResultadoRenderizado()
    },
  )

  // @regressivo @happy_path @ra01 @ra01_2
  it(
    'deve gerar relatorio de atribuicoes por area',
    { tags: ['@regressivo', '@happy_path', '@ra01', '@ra01_2'] },
    () => {
      gerarRelatorioAtribuicoesPorAreaPage.selecionarTipoAnalitico()
      gerarRelatorioAtribuicoesPorAreaPage.selecionarArea('JUDICIAL')
      gerarRelatorioAtribuicoesPorAreaPage.gerarRelatorio()
      gerarRelatorioAtribuicoesPorAreaPage.deveManterTelaEmEstadoValido()
    },
  )
})
