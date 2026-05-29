export class GerarRelatorioMovimentacaoAtivosPage {
  private readonly path = '/portal_service/reports/index'

  private readonly seletores = {
    titulo: 'h1',
    areaSelect: '#area_name',
    dataInicialInput: '#initial_date',
    dataFinalInput: '#final_date',
    botaoPesquisar: 'input[type="submit"][value="Pesquisar"]',
    botaoGerarRelatorio: 'a[href="/portal_service/reports/pdf_create"] button',
  }

  public visitar(): void {
    cy.visit(this.path)
  }

  public deveEstarCarregada(): void {
    cy.location('pathname').should('include', this.path)

    cy.get(this.seletores.titulo).should('be.visible').and('contain.text', 'Movimentação de Ativos')
    this.deveExibirFiltrosDoRelatorio()
  }

  public deveExibirFiltrosDoRelatorio(): void {
    cy.get(this.seletores.areaSelect).should('be.visible')
    cy.get(this.seletores.dataInicialInput).should('be.visible')
    cy.get(this.seletores.dataFinalInput).should('be.visible')
    cy.get(this.seletores.botaoPesquisar).should('be.visible')
    cy.get(this.seletores.botaoGerarRelatorio).should('be.visible')
  }

  public selecionarArea(area: string): void {
    cy.get(this.seletores.areaSelect).select(area)
  }

  public preencherDataInicial(data: string): void {
    cy.get(this.seletores.dataInicialInput).clear().type(data)
  }

  public preencherDataFinal(data: string): void {
    cy.get(this.seletores.dataFinalInput).clear().type(data)
  }

  public pesquisar(): void {
    cy.get(this.seletores.botaoPesquisar).click()
  }

  public gerarRelatorio(): void {
    cy.get(this.seletores.botaoGerarRelatorio).click()
  }

  public deveManterTelaEmEstadoValido(): void {
    cy.get('body').should('not.contain.text', 'Erro')
    cy.get('body').should('not.contain.text', 'Exception')
    cy.get('body').should('not.contain.text', 'undefined')
  }

  public deveExibirResultadoOuTelaValidaAposPesquisa(): void {
    cy.get(this.seletores.titulo).should('be.visible').and('contain.text', 'Movimentação de Ativos')
    cy.get(this.seletores.areaSelect).should('be.visible')
    cy.get(this.seletores.dataInicialInput).should('be.visible')
    cy.get(this.seletores.dataFinalInput).should('be.visible')
    cy.get(this.seletores.botaoPesquisar).should('be.visible')
    cy.contains('button', 'Gerar Relatório').should('be.visible')
    cy.get('table').should('be.visible')
    cy.contains('Tombo').should('be.visible')
    this.deveManterTelaEmEstadoValido()
  }
}
