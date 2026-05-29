import type { AtivoCadastro } from '@/fixtures/ativos/cadastrarAtivo'

export class CadastrarAtivoPage {
  public readonly path = '/portal_service/listing_assets/new'

  private readonly seletores = {
    tipoSelect: '#type',
    marcaInput: '#asset_brand',
    modeloInput: '#asset_model',
    serialInput: '#asset_serial',
    tomboInput: '#asset_tombo',
    aquisicaoSelect: '#asset_acquisition_id',
    especificacaoTextarea: '#asset_specification',
    botaoSalvarInput: 'input[type="submit"][value="Salvar"]',
    botaoSalvarButton: 'button',
    body: 'body',
  }

  public deveEstarCarregada(): void {
    cy.location('pathname').should('include', this.path)
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
    cy.get(this.seletores.body).then(($body) => {
      if ($body.find(this.seletores.botaoSalvarInput).length > 0) {
        cy.get(this.seletores.botaoSalvarInput).click()
        return
      }

      cy.contains(this.seletores.botaoSalvarButton, 'Salvar').click()
    })
  }
}
