import { LoginPage } from '@/support/pages'

describe('Realizar Login', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    loginPage.visitar()
    loginPage.deveEstarCarregada()
  })

  // @regressivo @happy_path @lg01 @lg01_1
  it(
    'deve realizar login com credenciais validas',
    { tags: ['@regressivo', '@happy_path', '@lg01', '@lg01_1'] },
    () => {
      loginPage.realizarLogin(Cypress.env('userEmail'), Cypress.env('userPassword'))

      loginPage.deveAutenticarComSucesso()
    },
  )

  // @regressivo @happy_path @lg01 @lg01_3
  it(
    'deve realizar logout do sistema',
    { tags: ['@regressivo', '@happy_path', '@lg01', '@lg01_3'] },
    () => {
      cy.login()

      loginPage.realizarLogout()
      loginPage.deveRetornarParaLogin()
    },
  )
})
