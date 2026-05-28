export class PaginaLogin {
  public readonly path = '/admins/sign_in'

  private readonly seletores = {
    emailInput: '#admin_email',
    senhaInput: '#admin_password',
    botaoEntrar: 'input[type="submit"][value="Entrar"]',
  }

  public visitar(): void {
    cy.visit(this.path)
  }

  public deveEstarCarregada(): void {
    cy.location('pathname').should('include', this.path)
    cy.get(this.seletores.emailInput).should('be.visible')
    cy.get(this.seletores.senhaInput).should('be.visible')
  }

  public preencherEmail(email: string): void {
    cy.get(this.seletores.emailInput).clear().type(email)
  }

  public preencherSenha(senha: string): void {
    cy.get(this.seletores.senhaInput).clear().type(senha, { log: false })
  }

  public clicarEntrar(): void {
    cy.get(this.seletores.botaoEntrar).click()
  }

  public realizarLogin(email: string, senha: string): void {
    this.preencherEmail(email)
    this.preencherSenha(senha)
    this.clicarEntrar()
  }
}
