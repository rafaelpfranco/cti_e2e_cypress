export class EditarAtribuicaoPage {
  public readonly path = '/portal_service/bonds'

  private readonly seletores = {
    areaSelect: '#set_area',
    subareaSelect: '#resp_subarea',
    radioColaborador: '#bond_employee_type_colaborador',
    radioSemColaborador: '#bond_employee_type_sem_usuario',
    radioSubarea: '#bond_employee_type_subarea',
    colaboradorSelect: '#collaborators',
    select2ColaboradorContainer: '#select2-collaborators-container',
    select2Opcoes: '.select2-results__option',
    select2BuscaAberta: '.select2-container--open .select2-search__field',
    opcaoSelect: 'option',
    opcaoSelecionada: 'option:selected',
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
    statusNovoAtivoSelect: '#set_status',
    linhasAtivo: '.nested-fields.add_ativo',
    botaoRemoverAtivo: 'a.remove_fields',
    statusAtivoSelect: 'select[name*="[status]"]',
    descricaoDefeitoInput: 'textarea[name*="defect"], input[name*="defect"]',
    body: 'body',
    botaoSalvarInput: 'input[type="submit"][value="Salvar"]',
    botaoSalvarButton: 'button',
    botaoCancelar: 'a, button',
  }

  public deveEstarCarregada(): void {
    cy.location('pathname').should('include', this.path)
    cy.location('pathname').should('include', '/edit')
    cy.get(this.seletores.areaSelect).should('exist')
    cy.get(this.seletores.subareaSelect).should('exist')
    cy.get(this.seletores.observacaoTextarea).should('exist')
  }

  public deveExibirDadosCarregados(): void {
    cy.get(this.seletores.areaSelect).find(this.seletores.opcaoSelect).should('exist')
    cy.get(this.seletores.areaSelect)
      .find(this.seletores.opcaoSelecionada)
      .should('not.have.value', '')
    cy.get(this.seletores.subareaSelect)
      .find(this.seletores.opcaoSelecionada)
      .should('not.have.value', '')
  }

  public selecionarArea(area: string): void {
    cy.get(this.seletores.areaSelect).select(area)
  }

  public selecionarSubarea(subarea: string): void {
    cy.get(this.seletores.subareaSelect).select(subarea)
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
        cy.wrap($select).next('.select2-container').find('.select2-selection').click({ force: true })
      })

    cy.get(this.seletores.select2BuscaAberta).clear().type(tombo)
    cy.contains(this.seletores.select2Opcoes, tombo).click()

    cy.get(this.seletores.ativoSelect).last().should('not.have.value', '')
  }

  public vincularAtivo(tombo: string): void {
    this.adicionarAtivo()
    this.selecionarAtivoPorTombo(tombo)
    this.selecionarPrimeiraDescricaoAtivo()
    this.selecionarPrimeiroStatusNovoAtivo()
  }

  public selecionarStatusAtivoAtual(status: string): void {
    cy.get(this.seletores.statusAtivoSelect).first().select(status)
  }

  public informarDescricaoDefeito(descricao: string): void {
    cy.get(this.seletores.descricaoDefeitoInput).first().clear().type(descricao)
  }

  public removerPrimeiroAtivo(): void {
    cy.get(this.seletores.linhasAtivo)
      .first()
      .find(this.seletores.botaoRemoverAtivo)
      .click({ force: true })
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

  public devePossuirCamposObrigatorios(): void {
    cy.get(this.seletores.areaSelect).should('have.attr', 'required')
    cy.get(this.seletores.subareaSelect).should('have.attr', 'required')
  }

  public deveManterFormularioAberto(): void {
    cy.location('pathname').should('include', this.path)
    cy.get(this.seletores.areaSelect).should('exist')
    cy.get(this.seletores.subareaSelect).should('exist')
  }

  private selecionarPrimeiraDescricaoAtivo(): void {
    this.selecionarPrimeiraOpcaoValida(this.seletores.descricaoAtivoSelect)
  }

  private selecionarPrimeiroStatusNovoAtivo(): void {
    this.selecionarPrimeiraOpcaoValida(this.seletores.statusNovoAtivoSelect)
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
