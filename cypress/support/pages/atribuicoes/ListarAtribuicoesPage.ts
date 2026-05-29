import type { AtribuicaoCadastro } from '@/fixtures/atribuicoes/cadastrarAtribuicao'

export class ListarAtribuicoesPage {
  public readonly path = '/portal_service/bonds'

  private readonly seletores = {
    linkNovaAtribuicao: 'a[href="/portal_service/bonds/new"]',
    botaoGerarTermos: 'button[data-target="#generate_term"]',
    filtroModalidade: '#q_modality_eq',
    filtroColaborador: '#q_user_id_eq',
    filtroTomboContainer: '.select2-selection__rendered[title="Tombo"]',
    select2BuscaAberta: '.select2-container--open .select2-search__field',
    select2Opcoes: '.select2-results__option',
    formularioBusca: '#bond_search',
    titulo: 'h1',
    tabela: 'table',
    linhasTabela: 'tbody tr',
    checkboxLinha: 'input[type="checkbox"]',
    acaoEditar: 'a[href*="/edit"]',
    mensagemSistema: '.bootstrap-growl.alert.alert-success',
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

  public abrirModalGerarTermos(): void {
    cy.get(this.seletores.botaoGerarTermos).should('be.visible').click()
  }

  public filtrarPorModalidade(modalidade: string): void {
    cy.get(this.seletores.filtroModalidade).select(modalidade)
  }

  public filtrarPorColaborador(colaborador: string): void {
    cy.get(this.seletores.filtroColaborador).select(colaborador, { force: true })
  }

  public filtrarPorTombo(tombo: string): void {
    cy.get(this.seletores.filtroTomboContainer).click({ force: true })
    cy.get(this.seletores.select2BuscaAberta).clear().type(tombo)
    cy.contains(this.seletores.select2Opcoes, tombo).click()
  }

  public filtrarPorTomboAutomatizado(): void {
    this.filtrarPorTombo('AUTO')
  }

  public pesquisarPorObservacao(observacao: string): void {
    cy.contains(this.seletores.linhasTabela, observacao).should('be.visible')
  }

  public selecionarAtribuicaoPorObservacao(observacao: string): void {
    cy.contains(this.seletores.linhasTabela, observacao)
      .should('be.visible')
      .within(() => {
        cy.get(this.seletores.checkboxLinha).check({ force: true })
      })
  }

  public selecionarPrimeiraAtribuicaoComTomboAutomatizado(): void {
    this.deveExibirAtribuicaoComTomboAutomatizado()

    cy.contains(this.seletores.linhasTabela, 'AUTO')
      .should('be.visible')
      .within(() => {
        cy.get(this.seletores.checkboxLinha).check({ force: true })
      })
  }

  public clicarEditarAtribuicaoPorObservacao(observacao: string): void {
    cy.contains(this.seletores.linhasTabela, observacao)
      .should('be.visible')
      .within(() => {
        this.acessarEdicaoPeloLinkDaLinha()
      })
  }

  public clicarEditarPrimeiraAtribuicaoComTomboAutomatizado(): void {
    this.deveExibirAtribuicaoComTomboAutomatizado()

    cy.contains(this.seletores.linhasTabela, 'AUTO')
      .should('be.visible')
      .within(() => {
        this.acessarEdicaoPeloLinkDaLinha()
      })
  }

  public deveExibirTabela(): void {
    cy.get(this.seletores.tabela).should('be.visible')
    cy.get(this.seletores.linhasTabela).should('have.length.greaterThan', 0)
  }

  public deveExibirAtribuicaoComTomboAutomatizado(): void {
    this.deveExibirTabela()
    cy.contains(this.seletores.linhasTabela, 'AUTO').should('be.visible')
  }

  public deveExibirAtribuicaoCadastrada(observacao: string): void {
    cy.contains(this.seletores.tabela, observacao).should('be.visible')
  }

  public deveExibirMensagemDeSucesso(atribuicao?: AtribuicaoCadastro): void {
    if (!atribuicao) {
      this.deveExibirMensagemDeSucessoGenerica()
      return
    }

    cy.get(this.seletores.mensagemSistema)
      .should('be.visible')
      .and(($mensagem) => {
        expect($mensagem.text()).to.contain(
          `Ativos vinculados a: ${atribuicao.colaborador}, Parabéns!`,
        )
      })
  }

  public deveExibirMensagemDeAtualizacao(): void {
    this.deveExibirMensagemDeSucessoGenerica()
  }

  public deveExibirMensagemDeSucessoGenerica(): void {
    cy.get(this.seletores.mensagemSistema)
      .should('be.visible')
      .and(($mensagem) => {
        expect($mensagem.text().toLowerCase()).to.match(/sucesso|atualiz|alterad|parab/)
      })
  }

  public deveExibirAtribuicaoNaTabela(atribuicao: AtribuicaoCadastro): void {
    cy.contains(this.seletores.linhasTabela, atribuicao.observacao)
      .should('be.visible')
      .within(() => {
        cy.contains(atribuicao.area).should('be.visible')
        cy.contains(atribuicao.subarea).should('be.visible')
        cy.contains(atribuicao.modalidade).should('be.visible')

        if (atribuicao.colaborador) {
          cy.contains(atribuicao.colaborador).should('be.visible')
        }
      })
  }

  public deveExibirAtivoAtribuidoNaTabela(atribuicao: AtribuicaoCadastro): void {
    cy.then(() => {
      if (!atribuicao.tomboAtivo) {
        throw new Error('Tombo do ativo nao foi definido na massa de cadastro da atribuicao.')
      }

      this.filtrarPorTombo(atribuicao.tomboAtivo)
      this.deveExibirAtribuicaoNaTabela(atribuicao)
    })
  }

  public deveRetornarParaListagem(): void {
    cy.location('pathname').should('include', this.path)
    cy.location('pathname').should('not.include', '/edit')
    cy.get(this.seletores.tabela).should('be.visible')
  }

  private acessarEdicaoPeloLinkDaLinha(): void {
    cy.get(this.seletores.acaoEditar)
      .invoke('attr', 'href')
      .then((href) => {
        if (!href) {
          throw new Error('Link de edicao da atribuicao nao possui href.')
        }

        cy.visit(href)
      })
  }
}
