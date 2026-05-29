export class GerarRelatorioAtribuicoesPorAreaPage {
  private readonly path = '/portal_service/reports/assignments_by_area'

  private readonly seletores = {
    titulo: 'h1',
    radioSintetico: '#type_syntetic',
    radioAnalitico: '#type_analytic',
    areaSelect: '#search_area',
    subareaSelect: '#search_subarea',
    botaoPesquisar: 'input[type="submit"][value="Pesquisar"]',
    botaoGerarRelatorio: 'a[href="/portal_service/reports/assignments_by_area_pdf"] button',
  }

  public visitar(): void {
    cy.visit(this.path)
  }

  public deveEstarCarregada(): void {
    cy.location('pathname').should('include', this.path)

    cy.get(this.seletores.titulo)
      .should('be.visible')
      .and('contain.text', 'Atribuições por Área/Subárea')

    cy.get(this.seletores.radioSintetico).should('exist')
    cy.get(this.seletores.radioAnalitico).should('exist')
    cy.get(this.seletores.areaSelect).should('be.visible')
    cy.get(this.seletores.subareaSelect).should('be.visible')
    cy.get(this.seletores.botaoPesquisar).should('be.visible')
    cy.get(this.seletores.botaoGerarRelatorio).should('be.visible')
  }

  public selecionarTipoSintetico(): void {
    cy.get(this.seletores.radioSintetico).check()
  }

  public selecionarTipoAnalitico(): void {
    cy.get(this.seletores.radioAnalitico).check()
  }

  public selecionarArea(area: string): void {
    cy.get(this.seletores.areaSelect).select(area)
  }

  public selecionarSubarea(subarea: string): void {
    cy.get(this.seletores.subareaSelect).select(subarea)
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

  public deveExibirResultadoRenderizado(): void {
    cy.get(this.seletores.titulo)
      .should('be.visible')
      .and('contain.text', 'Atribuições por Área/Subárea')

    cy.contains('Total de Atribuições').should('be.visible')
    cy.contains('Atribuições por Modalidade').should('be.visible')
    cy.contains('Atribuições por Colaboradores').should('be.visible')
    cy.contains('Atribuições por Termo Responsabilidade').should('be.visible')
    cy.contains('Atribuições por Termo Empréstimo').should('be.visible')
    cy.contains('Atribuições por Sistema Operacional').should('be.visible')
    cy.contains('Atribuições por Pacote Office').should('be.visible')

    cy.get('#chart-1 canvas').should('be.visible')
    cy.get('#chart-2 canvas').should('be.visible')
    cy.get('#chart-3 canvas').should('be.visible')
    cy.get('#chart-4 canvas').should('be.visible')
    cy.get('#chart-5 canvas').should('be.visible')
    cy.get('#chart-6 canvas').should('be.visible')

    cy.get('table.table-bordered').should('have.length.at.least', 6)
    this.deveManterTelaEmEstadoValido()
  }
}
