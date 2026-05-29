export class LoginPage {
  public readonly path = '/admins/sign_in'

  private readonly seletores = {
    formularioLogin: '#new_admin',
    emailInput: '#admin_email',
    senhaInput: '#admin_password',
    botaoEntrar: 'input[type="submit"][value="Entrar"]',
    menuUsuario: '#userDropdown',
    linkSair: 'a[href="/admins/sign_out"]',
  }

  public visitar(): void {
    cy.visit(this.path)
  }

  public deveEstarCarregada(): void {
    cy.location('pathname').should('include', this.path)
    cy.get(this.seletores.formularioLogin).should('be.visible')
    cy.get(this.seletores.emailInput).should('be.visible')
    cy.get(this.seletores.senhaInput).should('be.visible')
    cy.get(this.seletores.botaoEntrar).should('be.visible')
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

  public deveAutenticarComSucesso(): void {
    cy.location('pathname').should('not.include', this.path)
    cy.get(this.seletores.menuUsuario).should('be.visible')
  }

  public realizarLogout(): void {
    cy.get('body').then(($body) => {
      if ($body.find(this.seletores.menuUsuario).length === 0) {
        cy.visit('/portal_service/bonds')
      }
    })

    cy.get(this.seletores.menuUsuario).should('be.visible').click()
    cy.contains(this.seletores.linkSair, 'Sair').click()
  }

  public deveRetornarParaLogin(): void {
    cy.location('pathname').should('include', this.path)
    cy.get(this.seletores.formularioLogin).should('be.visible')
  }
}
