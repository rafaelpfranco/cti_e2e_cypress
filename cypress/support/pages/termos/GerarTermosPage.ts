export class GerarTermosPage {
  private readonly seletores = {
    modalGerarTermos: '#generate_term',
    tituloModalGerarTermos: '#generate_termTitle',
    radioTermoResponsabilidade: '#term_type_liability',
    radioTermoEmprestimo: '#term_type_loan',
    botaoGerarTermo: '#btn-termo',
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

  public deveManterTelaEmEstadoValidoAposGeracao(): void {
    cy.get(this.seletores.modalGerarTermos).should('be.visible')
    cy.get(this.seletores.botaoGerarTermo).should('be.visible')
    cy.get('body').should('not.contain.text', 'Erro')
    cy.get('body').should('not.contain.text', 'Exception')
    cy.get('body').should('not.contain.text', 'undefined')
  }
}
