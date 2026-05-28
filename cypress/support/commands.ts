import { PaginaLogin } from './pages/login/PaginaLogin'

Cypress.Commands.add('login', () => {
  cy.session('sessao-usuario', () => {
    const paginaLogin = new PaginaLogin()

    paginaLogin.visitar()
    paginaLogin.realizarLogin(Cypress.env('userEmail'), Cypress.env('userPassword'))

    cy.location('pathname').should('not.include', '/admins/sign_in')
  })
})
