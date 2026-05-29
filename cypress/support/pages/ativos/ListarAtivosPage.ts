export class ListarAtivosPage {
  public readonly path = '/portal_service/listing_assets'

  private readonly seletores = {
    titulo: 'h1, h2, h3, .card-header',
    tabela: 'table',
    linhasTabela: 'tbody tr',
    linkNovoAtivo: 'a[href="/portal_service/listing_assets/new"]',
    pesquisaInput: 'input[placeholder="Pesquisar..."]',
    botaoPesquisar: 'button[type="submit"], button',
    mensagemSistema:
      '.toast, .toast-message, .alert, .alert-success, .notice, .flash, [role="alert"]',
  }

  public visitar(): void {
    cy.visit(this.path)
  }

  public deveEstarCarregada(): void {
    cy.location('pathname').should('include', this.path)
    cy.contains(this.seletores.titulo, 'Ativos').should('be.visible')
  }

  public clicarNovoAtivo(): void {
    cy.get(this.seletores.linkNovoAtivo).click()
  }

  public deveRetornarParaListagem(): void {
    cy.location('pathname').should('include', this.path)
    cy.location('pathname').should('not.include', '/new')
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
