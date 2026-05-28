export class PaginaAtribuicoes {
  public readonly path = '/portal_service/bonds'

  private readonly seletores = {
    linkNovaAtribuicao: 'a[href="/portal_service/bonds/new"]',
    botaoGerarTermos: 'button[data-target="#generate_term"]',
    filtroModalidade: '#q_modality_eq',
    filtroColaborador: '#q_user_id_eq',
    formularioBusca: '#bond_search',
    titulo: 'h1',
    tabela: 'table',
    linhasTabela: 'tbody tr',
    checkboxPrimeiraLinha: 'tbody tr:first input[type="checkbox"]',
    acaoEditar: 'a[href*="/edit"]',
  }

  public visitar(): void {
    cy.visit(this.path)
  }

  public deveEstarCarregada(): void {
    cy.location('pathname').should('include', this.path)
    cy.contains(this.seletores.titulo, 'Atribuições').should('be.visible')
    cy.get(this.seletores.linkNovaAtribuicao).should('exist')
  }

  public clicarNovaAtribuicao(): void {
    cy.get(this.seletores.linkNovaAtribuicao).click()
  }

  public selecionarPrimeiraAtribuicao(): void {
    cy.get(this.seletores.checkboxPrimeiraLinha).check({ force: true })
  }

  public clicarGerarTermos(): void {
    cy.get(this.seletores.botaoGerarTermos).click()
  }

  public filtrarPorModalidade(modalidade: string): void {
    cy.get(this.seletores.filtroModalidade).select(modalidade)
  }

  public filtrarPorColaborador(colaborador: string): void {
    cy.get(this.seletores.filtroColaborador).select(colaborador, { force: true })
  }

  public clicarEditarPrimeiraAtribuicao(): void {
    cy.get(this.seletores.linhasTabela).first().find(this.seletores.acaoEditar).click()
  }

  public deveExibirTabela(): void {
    cy.get(this.seletores.tabela).should('be.visible')
    cy.get(this.seletores.linhasTabela).should('have.length.greaterThan', 0)
  }

  public deveExibirAtribuicaoCadastrada(observacao: string): void {
    cy.contains(this.seletores.tabela, observacao).should('be.visible')
  }

  public deveRetornarParaListagem(): void {
    cy.location('pathname').should('include', this.path)
    cy.get(this.seletores.tabela).should('be.visible')
  }
}
