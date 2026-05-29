export class DepositoCtiPage {
  public readonly path = '/portal_service/listing_assets'

  private readonly seletores = {
    titulo: 'h1, h2, h3, .card-header',
    tabela: 'table',
    linhasTabela: 'tbody tr',
  }

  public visitar(): void {
    cy.visit(this.path)
  }

  public deveEstarCarregada(): void {
    cy.location('pathname').should('include', this.path)
    cy.contains(this.seletores.titulo, 'Ativos').should('be.visible')
  }

  public deveExibirAtivosDisponiveis(): void {
    cy.get(this.seletores.tabela).should('be.visible')
    cy.get(this.seletores.linhasTabela).should('have.length.greaterThan', 0)
  }
}
