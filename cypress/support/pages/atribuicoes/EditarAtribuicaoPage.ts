import type { AtribuicaoEdicao } from '@/fixtures/atribuicoes/editarAtribuicao'

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
    statusAtivoSelect: 'select[name*="[status_id]"]',
    descricaoDefeitoInput: 'input[name*="[observation]"]',
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
    this.selecionarOpcaoPorTexto(this.seletores.areaSelect, area)
  }

  public selecionarSubarea(subarea: string): void {
    this.selecionarOpcaoPorTexto(this.seletores.subareaSelect, subarea)
  }

  public selecionarAtendidoPor(atendidoPor: string): void {
    this.selecionarOpcaoPorTexto(this.seletores.atendidoPorSelect, atendidoPor)
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
    this.selecionarOpcaoPorTexto(this.seletores.sistemaOperacionalSelect, sistemaOperacional)
  }

  public preencherObservacao(observacao: string): void {
    cy.get(this.seletores.observacaoTextarea).clear().type(observacao)
  }

  public preencherCamposObrigatorios(atribuicao: AtribuicaoEdicao): void {
    this.selecionarArea(atribuicao.area)
    this.selecionarSubarea(atribuicao.subarea)
    this.selecionarAtendidoPor(atribuicao.atendidoPor)
    this.selecionarModalidade(atribuicao.modalidade)

    if (atribuicao.observacao) {
      this.preencherObservacao(atribuicao.observacao)
    }
  }

  public preencherTodosOsCampos(atribuicao: AtribuicaoEdicao): void {
    this.preencherCamposObrigatorios(atribuicao)

    if (atribuicao.sistemaOperacional) {
      this.selecionarSistemaOperacional(atribuicao.sistemaOperacional)
    }

    this.preencherUsoPacoteOffice(atribuicao)
  }

  public limparObservacao(): void {
    cy.get(this.seletores.observacaoTextarea).clear()
  }

  public adicionarAtivo(): void {
    cy.get(this.seletores.botaoAdicionarAtivo).click({ force: true })
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

  public vincularPrimeiroAtivoAutomatizadoDaAtribuicao(atribuicao: AtribuicaoEdicao): void {
    this.adicionarAtivo()
    this.selecionarPrimeiroAtivoPorPrefixo('AUTO').then((tomboAtivo) => {
      atribuicao.tomboAtivo = tomboAtivo
      cy.log(`Tombo capturado: ${atribuicao.tomboAtivo}`)
    })
    this.selecionarPrimeiraDescricaoAtivo()
    this.selecionarPrimeiroStatusNovoAtivo()
  }

  public selecionarStatusPrimeiroAtivo(status: string): void {
    cy.get(this.seletores.linhasAtivo)
      .first()
      .within(() => {
        cy.get(this.seletores.statusAtivoSelect).select(status, { force: true })
      })
  }

  public informarDescricaoDefeitoPrimeiroAtivo(descricao: string): void {
    cy.get(this.seletores.linhasAtivo)
      .first()
      .within(() => {
        cy.get(this.seletores.descricaoDefeitoInput).clear().type(descricao)
      })
  }

  public removerPrimeiroAtivo(): void {
    cy.get(this.seletores.linhasAtivo)
      .first()
      .find(this.seletores.botaoRemoverAtivo)
      .click({ force: true })
  }

  public substituirAtivoDisponivel(statusAtual: string, atribuicao: AtribuicaoEdicao): void {
    this.selecionarStatusPrimeiroAtivo(statusAtual)
    this.removerPrimeiroAtivo()
    this.vincularPrimeiroAtivoAutomatizadoDaAtribuicao(atribuicao)
  }

  public substituirAtivoComDefeito(
    statusAtual: string,
    descricaoDefeito: string,
    atribuicao: AtribuicaoEdicao,
  ): void {
    this.selecionarStatusPrimeiroAtivo(statusAtual)
    this.informarDescricaoDefeitoPrimeiroAtivo(descricaoDefeito)
    this.removerPrimeiroAtivo()
    this.vincularPrimeiroAtivoAutomatizadoDaAtribuicao(atribuicao)
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

  public deveSairDaRotaDeEdicao(): void {
    cy.location('pathname').should('include', this.path)
    cy.location('pathname').should('not.include', '/edit')
    cy.get(this.seletores.observacaoTextarea).should('be.visible')
  }

  public deveExibirObservacao(observacao: string): void {
    cy.get(this.seletores.observacaoTextarea).should('have.value', observacao)
  }

  private selecionarPrimeiraDescricaoAtivo(): void {
    this.selecionarPrimeiraOpcaoValida(this.seletores.descricaoAtivoSelect)
  }

  private selecionarPrimeiroAtivoPorPrefixo(prefixo: string): Cypress.Chainable<string> {
    return cy
      .get(this.seletores.ativoSelect)
      .last()
      .find(this.seletores.opcaoSelect)
      .then(($opcoes) => {
        const opcao = [...$opcoes].find((item) =>
          (item.textContent ?? '').trim().toUpperCase().startsWith(prefixo.toUpperCase()),
        ) as HTMLOptionElement | undefined
        const tombo = opcao?.textContent?.trim()
        const valor = opcao?.value

        if (!tombo || !valor) {
          throw new Error(`Nenhum ativo com tombo iniciado por ${prefixo} foi encontrado.`)
        }

        return cy
          .get(this.seletores.ativoSelect)
          .last()
          .invoke('val', valor)
          .trigger('change', { force: true })
          .then(() =>
            cy
              .get(this.seletores.ativoSelect)
              .last()
              .should('not.have.value', '')
              .then(() => tombo),
          )
      })
  }

  private selecionarPrimeiroStatusNovoAtivo(): void {
    this.selecionarStatusNovoAtivoPadrao()
  }

  private preencherUsoPacoteOffice(atribuicao: AtribuicaoEdicao): void {
    if (atribuicao.usaPacoteOffice) {
      cy.get(this.seletores.checkboxPacoteOffice).check({ force: true })
      cy.get(this.seletores.pacoteOfficeSelect).should('not.be.disabled')
      cy.get(this.seletores.pacoteOfficeSelect).select(atribuicao.pacoteOffice ?? '')
      return
    }

    cy.get(this.seletores.checkboxPacoteOffice).uncheck({ force: true })
    cy.get(this.seletores.pacoteOfficeSelect).should('be.disabled')
  }

  private selecionarStatusNovoAtivoPadrao(): void {
    cy.get(this.seletores.statusNovoAtivoSelect)
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

          return opcao.value !== '' && texto.includes('USO')
        })
        const opcaoFallback = opcoes.find((opcao) => opcao.value !== '')
        const valor = opcaoPreferida?.value ?? opcaoFallback?.value

        if (!valor) {
          throw new Error(
            `Nenhuma opcao valida encontrada para o seletor ${this.seletores.statusNovoAtivoSelect}`,
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

  private selecionarOpcaoPorTexto(seletor: string, texto: string): void {
    cy.get(seletor)
      .should('exist')
      .then(($select) => {
        const opcao = [...$select.find(this.seletores.opcaoSelect)].find(
          (item) => item.textContent?.trim() === texto,
        ) as HTMLOptionElement | undefined
        const valor = opcao?.value

        if (!valor) {
          throw new Error(`Opcao ${texto} nao encontrada para o seletor ${seletor}`)
        }

        cy.wrap($select).invoke('val', valor).trigger('change', { force: true })
      })
  }
}
