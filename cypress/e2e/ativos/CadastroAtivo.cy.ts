import { dadosCadastroAtivo } from '@/fixtures/ativos/cadastroAtivo'
import { AtivosPage } from '@/support/pages'

describe('Cadastro de Ativo', () => {
  const ativosPage = new AtivosPage()

  beforeEach(() => {
    cy.login()
  })

  // BDD tags: @ativos @cadastro_ativo @happy_path @cat01 @cat01_1
  it('deve cadastrar um ativo do tipo camera com sucesso', () => {
    const ativo = dadosCadastroAtivo.ativoCamera
    const identificador = Date.now()
    const tombo = `${ativo.prefixoTombo}-${identificador}`
    const serial = `${ativo.serial}-${identificador}`

    ativosPage.visitar()
    ativosPage.deveEstarCarregada()
    ativosPage.clicarNovoAtivo()

    ativosPage.deveEstarNaTelaDeNovoAtivo()
    ativosPage.preencherFormulario(ativo, tombo, serial)
    ativosPage.salvar()

    ativosPage.deveRetornarParaListagem()
    ativosPage.deveExibirMensagemDeSucesso()
    ativosPage.deveExibirAtivoCadastrado(tombo)
  })

  // BDD tags: @ativos @cadastro_ativo @happy_path @cat01 @cat01_2
  it('deve cadastrar um ativo do tipo estabilizador com sucesso', () => {
    const ativo = dadosCadastroAtivo.ativoEstabilizador
    const identificador = Date.now()
    const tombo = `${ativo.prefixoTombo}-${identificador}`
    const serial = `${ativo.serial}-${identificador}`

    ativosPage.visitar()
    ativosPage.deveEstarCarregada()
    ativosPage.clicarNovoAtivo()

    ativosPage.deveEstarNaTelaDeNovoAtivo()
    ativosPage.preencherFormulario(ativo, tombo, serial)
    ativosPage.salvar()

    ativosPage.deveRetornarParaListagem()
    ativosPage.deveExibirMensagemDeSucesso()
    ativosPage.deveExibirAtivoCadastrado(tombo)
  })
})
