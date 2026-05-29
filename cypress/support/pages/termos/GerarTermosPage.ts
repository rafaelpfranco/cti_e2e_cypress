export class GerarTermosPage {
  private readonly seletores = {
    modalGerarTermos: '#generate_term',
    tituloModalGerarTermos: '#generate_termTitle',
    radioTermoResponsabilidade: '#term_type_liability',
    radioTermoEmprestimo: '#term_type_loan',
    botaoGerarTermo: '#btn-termo',
    botaoFecharModal: '#generate_term button[data-dismiss="modal"]',
  }

  public deveExibirModalGerarTermos(): void {
    cy.get(this.seletores.modalGerarTermos)
      .should('be.visible')
      .within(() => {
        cy.get(this.seletores.tituloModalGerarTermos)
          .should('be.visible')
          .and('contain.text', 'Gerar Termos')
        cy.get(this.seletores.radioTermoResponsabilidade).should('exist')
        cy.get(this.seletores.radioTermoEmprestimo).should('exist')
        cy.get(this.seletores.botaoGerarTermo).should('be.visible')
      })
  }

  public selecionarTermoResponsabilidade(): void {
    cy.get(this.seletores.radioTermoResponsabilidade).check({ force: true })
    cy.get(this.seletores.radioTermoResponsabilidade).should('be.checked')
    cy.get(this.seletores.radioTermoEmprestimo).should('not.be.checked')
  }

  public selecionarTermoEmprestimo(): void {
    cy.get(this.seletores.radioTermoEmprestimo).check({ force: true })
    cy.get(this.seletores.radioTermoEmprestimo).should('be.checked')
    cy.get(this.seletores.radioTermoResponsabilidade).should('not.be.checked')
  }

  public gerarTermo(): void {
    cy.get(this.seletores.botaoGerarTermo).should('be.visible').and('not.be.disabled').click()
  }

  public fecharModal(): void {
    cy.get(this.seletores.botaoFecharModal).first().click()
    cy.get(this.seletores.modalGerarTermos).should('not.be.visible')
  }
}
