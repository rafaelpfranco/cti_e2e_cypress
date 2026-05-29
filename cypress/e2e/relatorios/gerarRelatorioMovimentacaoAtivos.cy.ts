import { GerarRelatorioMovimentacaoAtivosPage } from '@/support/pages'

describe('Gerar Relatorio de Movimentacao de Ativos', () => {
  const gerarRelatorioMovimentacaoAtivosPage = new GerarRelatorioMovimentacaoAtivosPage()

  beforeEach(() => {
    cy.login()

    gerarRelatorioMovimentacaoAtivosPage.visitar()
    gerarRelatorioMovimentacaoAtivosPage.deveEstarCarregada()
  })

  // @regressivo @happy_path @rm01 @rm01_1
  it(
    'deve pesquisar relatorio de movimentacao de ativos',
    { tags: ['@regressivo', '@happy_path', '@rm01', '@rm01_1'] },
    () => {
      gerarRelatorioMovimentacaoAtivosPage.selecionarArea('JUDICIAL')
      gerarRelatorioMovimentacaoAtivosPage.preencherDataInicial('2026-01-01')
      gerarRelatorioMovimentacaoAtivosPage.preencherDataFinal('2026-12-31')
      gerarRelatorioMovimentacaoAtivosPage.pesquisar()
      gerarRelatorioMovimentacaoAtivosPage.deveExibirResultadoOuTelaValidaAposPesquisa()
    },
  )

  // @regressivo @happy_path @rm01 @rm01_2
  it(
    'deve gerar relatorio de movimentacao de ativos',
    { tags: ['@regressivo', '@happy_path', '@rm01', '@rm01_2'] },
    () => {
      gerarRelatorioMovimentacaoAtivosPage.selecionarArea('JUDICIAL')
      gerarRelatorioMovimentacaoAtivosPage.gerarRelatorio()
      gerarRelatorioMovimentacaoAtivosPage.deveManterTelaEmEstadoValido()
    },
  )
})
