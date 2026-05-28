import { LoginPage } from '@/support/pages'

Cypress.Commands.add('login', () => {
  cy.session('sessao-usuario', () => {
    const loginPage = new LoginPage()

    loginPage.visitar()
    loginPage.realizarLogin(Cypress.env('userEmail'), Cypress.env('userPassword'))

    cy.location('pathname').should('not.include', '/admins/sign_in')
  })
})
