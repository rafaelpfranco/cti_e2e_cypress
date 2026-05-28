import type { AtivoCadastro } from '@/fixtures/ativos/types'

export class AtivosPage {
  public readonly path = '/portal_service/listing_assets'
  public readonly pathNovo = `${this.path}/new`

  private readonly seletores = {
    titulo: 'h1, h2, h3, .card-header',
    tabela: 'table',
    linhasTabela: 'tbody tr',
    linkNovoAtivo: 'a[href="/portal_service/listing_assets/new"]',
    tipoSelect: '#type',
    marcaInput: '#asset_brand',
    modeloInput: '#asset_model',
    serialInput: '#asset_serial',
    tomboInput: '#asset_tombo',
    aquisicaoSelect: '#asset_acquisition_id',
    especificacaoTextarea: '#asset_specification',
    pesquisaInput: 'input[placeholder="Pesquisar..."]',
    botaoPesquisar: 'button[type="submit"], button',
    mensagemSistema: '.toast, .toast-message, .alert, .alert-success, .notice, .flash, [role="alert"]',
    botaoSalvarInput: 'input[type="submit"][value="Salvar"]',
    botaoSalvarButton: 'button',
  }

  public visitar(): void {
    cy.visit(this.path)
  }

  public visitarNovoAtivo(): void {
    cy.visit(this.pathNovo)
  }

  public deveEstarCarregada(): void {
    cy.location('pathname').should('include', this.path)
    cy.contains(this.seletores.titulo, 'Ativos').should('be.visible')
  }

  public clicarNovoAtivo(): void {
    cy.get(this.seletores.linkNovoAtivo).click()
  }

  public deveEstarNaTelaDeNovoAtivo(): void {
    cy.location('pathname').should('include', this.pathNovo)
    cy.get(this.seletores.tomboInput).should('be.visible')
  }

  public preencherFormulario(ativo: AtivoCadastro, tombo: string, serial: string): void {
    cy.get(this.seletores.tipoSelect).select(ativo.tipo)
    cy.get(this.seletores.marcaInput).clear().type(ativo.marca)
    cy.get(this.seletores.modeloInput).clear().type(ativo.modelo)
    cy.get(this.seletores.serialInput).clear().type(serial)
    cy.get(this.seletores.tomboInput).clear().type(tombo)
    cy.get(this.seletores.aquisicaoSelect).select(ativo.aquisicao)
    cy.get(this.seletores.especificacaoTextarea).clear().type(ativo.especificacao)
  }

  public salvar(): void {
    cy.get('body').then(($body) => {
      if ($body.find(this.seletores.botaoSalvarInput).length > 0) {
        cy.get(this.seletores.botaoSalvarInput).click()
        return
      }

      cy.contains(this.seletores.botaoSalvarButton, 'Salvar').click()
    })
  }

  public deveRetornarParaListagem(): void {
    cy.location('pathname').should('include', this.path)
    cy.get(this.seletores.tabela).should('be.visible')
  }

  public deveExibirMensagemDeSucesso(): void {
    cy.get(this.seletores.mensagemSistema)
      .should('be.visible')
      .and(($mensagem) => {
        expect($mensagem.text().toLowerCase()).to.match(/sucesso|cadastrad|parab/)
      })
  }

  public deveExibirAtivoCadastrado(tombo: string): void {
    this.pesquisar(tombo)
    cy.contains(this.seletores.linhasTabela, tombo).should('be.visible')
  }

  private pesquisar(termo: string): void {
    cy.get(this.seletores.pesquisaInput).clear().type(termo)
    cy.get(this.seletores.botaoPesquisar).last().click()
  }
}
