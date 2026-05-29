import type { AtribuicaoCadastro } from '@/fixtures/atribuicoes/cadastrarAtribuicao'

export class CadastrarAtribuicaoPage {
  public readonly path = '/portal_service/bonds/new'

  private readonly seletores = {
    titulo: '.card-header h6',
    areaSelect: '#set_area',
    subareaSelect: '#resp_subarea',
    radioColaborador: '#bond_employee_type_colaborador',
    radioSemColaborador: '#bond_employee_type_sem_usuario',
    radioSubarea: '#bond_employee_type_subarea',
    colaboradorSelect: '#collaborators',
    selectColaboradorContainer: '#select2-collaborators-container',
    selectOpcoes: '.select2-results__option',
    selectBuscaAberta: '.select2-container--open .select2-search__field',
    opcaoSelect: 'option',
    atendidoPorSelect: '#attended',
    radioPresencial: '#bond_modality_presencial',
    radioHomeOffice: '#bond_modality_home_office',
    sistemaOperacionalSelect: '#so',
    checkboxPacoteOffice: '#check_office',
    pacoteOfficeSelect: '#key',
    observacaoTextarea: '#bond_observation',
    botaoAdicionarAtivo: '#btn_asset',
    ativoSelect: '#set_tombo',
    descricaoAtivoSelect: '#set_description',
    statusAtivoSelect: '#set_status',
    indicadorObrigatorio: 'code',
    body: 'body',
    botaoSalvarInput: 'input[type="submit"][value="Salvar"]',
    botaoSalvarButton: 'button',
    botaoCancelar: 'a, button',
  }

  public visitar(): void {
    cy.visit(this.path)
  }

  public deveEstarCarregada(): void {
    cy.location('pathname').should('include', this.path)
    cy.contains(this.seletores.titulo, 'Nova Atribuição').should('be.visible')
  }

  public selecionarArea(area: string): void {
    cy.get(this.seletores.areaSelect).select(area)
  }

  public selecionarSubarea(subarea: string): void {
    cy.get(this.seletores.subareaSelect).select(subarea)
  }

  public selecionarTipoColaborador(): void {
    cy.get(this.seletores.radioColaborador).check({ force: true })
  }

  public selecionarTipoSemColaborador(): void {
    cy.get(this.seletores.radioSemColaborador).check({ force: true })
  }

  public selecionarTipoSubarea(): void {
    cy.get(this.seletores.radioSubarea).check({ force: true })
  }

  public selecionarColaborador(colaborador: string): void {
    cy.get(this.seletores.colaboradorSelect).then(($select) => {
      const possuiOpcao = [...$select.find(this.seletores.opcaoSelect)].some(
        (opcao) => opcao.textContent?.trim() === colaborador,
      )

      if (possuiOpcao) {
        cy.wrap($select).select(colaborador, { force: true })
        return
      }

      cy.get(this.seletores.selectColaboradorContainer).click()
      cy.get(this.seletores.selectOpcoes).contains(colaborador).click()
    })
  }

  public selecionarAtendidoPor(atendidoPor: string): void {
    cy.get(this.seletores.atendidoPorSelect).select(atendidoPor)
  }

  public selecionarModalidade(modalidade: string): void {
    if (modalidade === 'Presencial') {
      cy.get(this.seletores.radioPresencial).check({ force: true })
      return
    }

    if (modalidade === 'Home Office') {
      cy.get(this.seletores.radioHomeOffice).check({ force: true })
      return
    }

    throw new Error(`Modalidade invalida: ${modalidade}`)
  }

  public selecionarSistemaOperacional(sistemaOperacional: string): void {
    cy.get(this.seletores.sistemaOperacionalSelect).select(sistemaOperacional)
  }

  public preencherFormularioParaColaborador(atribuicao: AtribuicaoCadastro): void {
    this.preencherCamposObrigatorios(atribuicao)
    this.selecionarSistemaOperacional(atribuicao.sistemaOperacional)
    this.preencherUsoPacoteOffice(atribuicao)
  }

  public preencherCamposObrigatorios(atribuicao: AtribuicaoCadastro): void {
    this.selecionarArea(atribuicao.area)
    this.selecionarSubarea(atribuicao.subarea)
    this.selecionarTipoColaborador()
    this.selecionarColaborador(atribuicao.colaborador ?? '')
    this.selecionarAtendidoPor(atribuicao.atendidoPor)
    this.selecionarModalidade(atribuicao.modalidade)
    this.preencherObservacao(atribuicao.observacao)
  }

  public preencherFormularioSemColaborador(atribuicao: AtribuicaoCadastro): void {
    this.selecionarArea(atribuicao.area)
    this.selecionarSubarea(atribuicao.subarea)
    this.selecionarTipoSemColaborador()
    this.selecionarAtendidoPor(atribuicao.atendidoPor)
    this.selecionarModalidade(atribuicao.modalidade)
    this.selecionarSistemaOperacional(atribuicao.sistemaOperacional)
    this.preencherUsoPacoteOffice(atribuicao)
    this.preencherObservacao(atribuicao.observacao)
  }

  public marcarUsoPacoteOffice(): void {
    cy.get(this.seletores.checkboxPacoteOffice).check({ force: true })
  }

  public desmarcarUsoPacoteOffice(): void {
    cy.get(this.seletores.checkboxPacoteOffice).uncheck({ force: true })
  }

  public selecionarPacoteOffice(pacoteOffice: string): void {
    cy.get(this.seletores.pacoteOfficeSelect).select(pacoteOffice)
  }

  public deveExibirPacoteOfficeDesabilitado(): void {
    cy.get(this.seletores.pacoteOfficeSelect).should('be.disabled')
  }

  public deveExibirPacoteOfficeHabilitado(): void {
    cy.get(this.seletores.pacoteOfficeSelect).should('not.be.disabled')
  }

  public preencherObservacao(observacao: string): void {
    cy.get(this.seletores.observacaoTextarea).clear().type(observacao)
  }

  public limparObservacao(): void {
    cy.get(this.seletores.observacaoTextarea).clear()
  }

  public adicionarAtivo(): void {
    cy.get(this.seletores.botaoAdicionarAtivo).click()
    cy.get(this.seletores.ativoSelect).should('exist')
  }

  public selecionarAtivoPorTombo(tombo: string): void {
    cy.get(this.seletores.ativoSelect)
      .last()
      .should('exist')
      .then(($select) => {
        cy.wrap($select)
          .next('.select2-container')
          .find('.select2-selection')
          .click({ force: true })
      })

    cy.get(this.seletores.selectBuscaAberta).clear().type(tombo)
    cy.contains(this.seletores.selectOpcoes, tombo).click()

    cy.get(this.seletores.ativoSelect).last().should('not.have.value', '')
  }

  public vincularAtivo(tombo: string): void {
    this.adicionarAtivo()
    this.selecionarAtivoPorTombo(tombo)
    this.selecionarPrimeiraDescricaoAtivo()
    this.selecionarPrimeiroStatusAtivo()
  }

  public vincularPrimeiroAtivo(atribuicao: AtribuicaoCadastro): void {
    this.adicionarAtivo()
    this.selecionarPrimeiroAtivoPorPrefixo('AUTO').then((tomboAtivo) => {
      atribuicao.tomboAtivo = tomboAtivo
      cy.log(`Tombo capturado: ${atribuicao.tomboAtivo}`)
    })
    this.selecionarPrimeiraDescricaoAtivo()
    this.selecionarPrimeiroStatusAtivo()
  }

  public vincularPrimeiroAtivoAutomatizadoDaAtribuicao(atribuicao: AtribuicaoCadastro): void {
    this.vincularPrimeiroAtivo(atribuicao)
  }

  public salvar(): void {
    cy.get(this.seletores.body).then(($body) => {
      if ($body.find(this.seletores.botaoSalvarInput).length > 0) {
        cy.get(this.seletores.botaoSalvarInput).click()
        return
      }

      cy.contains(this.seletores.botaoSalvarButton, 'Salvar').click()
    })
  }

  public cancelar(): void {
    cy.contains(this.seletores.botaoCancelar, 'Cancelar').click()
  }

  public deveExibirIndicadoresObrigatorios(): void {
    cy.get(this.seletores.indicadorObrigatorio).should('contain.text', '*')
  }

  public devePossuirCamposObrigatorios(): void {
    cy.get(this.seletores.areaSelect).should('have.attr', 'required')
    cy.get(this.seletores.subareaSelect).should('have.attr', 'required')
    cy.get(this.seletores.colaboradorSelect).should('have.attr', 'required')
  }

  public deveManterFormularioAberto(): void {
    cy.location('pathname').should('include', '/portal_service/bonds')
    cy.get(this.seletores.areaSelect).should('exist')
    cy.get(this.seletores.subareaSelect).should('exist')
  }

  private selecionarPrimeiraDescricaoAtivo(): void {
    this.selecionarPrimeiraOpcaoValida(this.seletores.descricaoAtivoSelect)
  }

  private selecionarPrimeiroAtivoPorPrefixo(prefixo: string): Cypress.Chainable<string> {
    this.abrirBuscaAtivo()
    cy.get(this.seletores.selectBuscaAberta).clear().type(prefixo)

    return cy.get(this.seletores.selectOpcoes).then(($opcoes) => {
      const opcao = [...$opcoes].find((item) =>
        (item.textContent ?? '').trim().toUpperCase().startsWith(prefixo.toUpperCase()),
      )
      const tombo = opcao?.textContent?.trim()

      if (!opcao || !tombo) {
        throw new Error(`Nenhum ativo com tombo iniciado por ${prefixo} foi encontrado.`)
      }

      return cy
        .wrap(opcao)
        .click()
        .then(() =>
          cy
            .get(this.seletores.ativoSelect)
            .last()
            .should('not.have.value', '')
            .then(() => tombo),
        )
    })
  }

  private abrirBuscaAtivo(): void {
    cy.get(this.seletores.ativoSelect)
      .last()
      .should('exist')
      .then(($select) => {
        cy.wrap($select)
          .next('.select2-container')
          .find('.select2-selection')
          .click({ force: true })
      })
  }

  private preencherUsoPacoteOffice(atribuicao: AtribuicaoCadastro): void {
    if (atribuicao.usaPacoteOffice) {
      this.marcarUsoPacoteOffice()
      this.deveExibirPacoteOfficeHabilitado()
      this.selecionarPacoteOffice(atribuicao.pacoteOffice)
      return
    }

    this.deveExibirPacoteOfficeDesabilitado()
  }

  private selecionarPrimeiroStatusAtivo(): void {
    cy.get(this.seletores.radioSemColaborador).then(($radioSemColaborador) => {
      const deveVincularSemUso = $radioSemColaborador.is(':checked')

      this.selecionarStatusAtivoPadrao(deveVincularSemUso)
    })
  }

  private selecionarStatusAtivoPadrao(deveVincularSemUso: boolean): void {
    cy.get(this.seletores.statusAtivoSelect)
      .last()
      .should(($select) => {
        const opcoesValidas = [...$select.find(this.seletores.opcaoSelect)].filter(
          (item) => (item as HTMLOptionElement).value !== '',
        )

        expect(opcoesValidas.length).to.be.greaterThan(0)
      })
      .then(($select) => {
        const opcoes = [...$select.find(this.seletores.opcaoSelect)] as HTMLOptionElement[]
        const opcaoPreferida = opcoes.find((opcao) => {
          const texto = opcao.textContent?.trim().toUpperCase() ?? ''

          if (opcao.value === '') {
            return false
          }

          return deveVincularSemUso ? !texto.includes('USO') : texto.includes('USO')
        })
        const opcaoFallback = opcoes.find((opcao) => opcao.value !== '')
        const valor = opcaoPreferida?.value ?? opcaoFallback?.value

        if (!valor) {
          throw new Error(
            `Nenhuma opcao valida encontrada para o seletor ${this.seletores.statusAtivoSelect}`,
          )
        }

        cy.wrap($select).invoke('val', valor).trigger('change', { force: true })
      })
  }

  private selecionarPrimeiraOpcaoValida(seletor: string): void {
    cy.get(seletor)
      .last()
      .should(($select) => {
        const opcoesValidas = [...$select.find(this.seletores.opcaoSelect)].filter(
          (item) => (item as HTMLOptionElement).value !== '',
        )

        expect(opcoesValidas.length).to.be.greaterThan(0)
      })
      .then(($select) => {
        const opcao = [...$select.find(this.seletores.opcaoSelect)].find(
          (item) => (item as HTMLOptionElement).value !== '',
        ) as HTMLOptionElement | undefined
        const valor = opcao?.value

        if (!valor) {
          throw new Error(`Nenhuma opcao valida encontrada para o seletor ${seletor}`)
        }

        cy.wrap($select).invoke('val', valor).trigger('change', { force: true })
      })
  }
}
