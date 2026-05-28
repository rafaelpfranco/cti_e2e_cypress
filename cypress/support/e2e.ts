import '@/support/commands'
import '@/support/types'
import 'cypress-mochawesome-reporter/register'

Cypress.on('uncaught:exception', (erro) => {
  if (
    erro.message.includes("Cannot read properties of null (reading 'disabled')") ||
    erro.message.includes("Cannot set properties of null (setting 'disabled')")
  ) {
    return false
  }

  return true
})
