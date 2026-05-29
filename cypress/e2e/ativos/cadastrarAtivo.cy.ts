import { criarAtivoCamera, criarAtivoEstabilizador } from '@/fixtures/ativos/cadastrarAtivo'
import { CadastrarAtivoPage, ListarAtivosPage } from '@/support/pages'

describe('Cadastrar Ativo', () => {
  const listarAtivosPage = new ListarAtivosPage()
  const cadastrarAtivoPage = new CadastrarAtivoPage()

  beforeEach(() => {
    cy.login()

    listarAtivosPage.visitar()
    listarAtivosPage.deveEstarCarregada()
    listarAtivosPage.clicarNovoAtivo()

    cadastrarAtivoPage.deveEstarCarregada()
  })

  // @regressivo @happy_path @at01 @at01_1
  it(
    'deve cadastrar ativo do tipo camera com sucesso',
    { tags: ['@regressivo', '@happy_path', '@at01', '@at01_1'] },
    () => {
      const { ativo, tombo, serial } = criarAtivoCamera()

      cadastrarAtivoPage.preencherFormulario(ativo, tombo, serial)
      cadastrarAtivoPage.salvar()

      listarAtivosPage.deveRetornarParaListagem()
      listarAtivosPage.deveExibirMensagemDeSucesso()
      listarAtivosPage.deveExibirAtivoCadastrado(tombo)
    },
  )

  // @regressivo @happy_path @at01 @at01_2
  it(
    'deve cadastrar ativo do tipo estabilizador com sucesso',
    { tags: ['@regressivo', '@happy_path', '@at01', '@at01_2'] },
    () => {
      const { ativo, tombo, serial } = criarAtivoEstabilizador()

      cadastrarAtivoPage.preencherFormulario(ativo, tombo, serial)
      cadastrarAtivoPage.salvar()

      listarAtivosPage.deveRetornarParaListagem()
      listarAtivosPage.deveExibirMensagemDeSucesso()
      listarAtivosPage.deveExibirAtivoCadastrado(tombo)
    },
  )
})
