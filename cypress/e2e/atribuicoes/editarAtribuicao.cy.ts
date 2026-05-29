import {
  criarAtribuicaoAtualizadaCamposObrigatorios,
  criarAtribuicaoAtualizadaTodosOsCampos,
  criarSubstituicaoAtivoComDefeito,
  criarSubstituicaoAtivoDisponivel,
} from '@/fixtures/atribuicoes/editarAtribuicao'
import { EditarAtribuicaoPage, ListarAtribuicoesPage } from '@/support/pages'

describe('Editar Atribuicao', () => {
  const listarAtribuicoesPage = new ListarAtribuicoesPage()
  const editarAtribuicaoPage = new EditarAtribuicaoPage()

  beforeEach(() => {
    cy.login()

    listarAtribuicoesPage.visitar()
    listarAtribuicoesPage.deveEstarCarregada()
    listarAtribuicoesPage.filtrarPorTomboAutomatizado()
    listarAtribuicoesPage.deveExibirAtribuicaoComTomboAutomatizado()
    listarAtribuicoesPage.clicarEditarPrimeiraAtribuicaoComTomboAutomatizado()

    editarAtribuicaoPage.deveEstarCarregada()
  })

  // @regressivo @happy_path @ea03 @ea03_1
  it(
    'deve carregar os dados de uma atribuicao existente ao acessar edicao',
    { tags: ['@regressivo', '@happy_path', '@ea03', '@ea03_1'] },
    () => {
      editarAtribuicaoPage.deveExibirDadosCarregados()
    },
  )

  // @regressivo @happy_path @ea03 @ea03_2
  it(
    'deve editar atribuicao preenchendo apenas os campos obrigatorios',
    { tags: ['@regressivo', '@happy_path', '@ea03', '@ea03_2'] },
    () => {
      const atribuicao = criarAtribuicaoAtualizadaCamposObrigatorios()

      editarAtribuicaoPage.preencherCamposObrigatorios(atribuicao)
      editarAtribuicaoPage.salvar()

      listarAtribuicoesPage.deveRetornarParaListagem()
      listarAtribuicoesPage.deveExibirMensagemDeSucesso()
    },
  )

  // @regressivo @happy_path @ea03 @ea03_3
  it(
    'deve editar atribuicao preenchendo todos os campos',
    { tags: ['@regressivo', '@happy_path', '@ea03', '@ea03_3'] },
    () => {
      const atribuicao = criarAtribuicaoAtualizadaTodosOsCampos()

      editarAtribuicaoPage.preencherTodosOsCampos(atribuicao)
      editarAtribuicaoPage.salvar()

      listarAtribuicoesPage.deveRetornarParaListagem()
      listarAtribuicoesPage.deveExibirMensagemDeSucesso()
    },
  )

  // @complementar @happy_path @ea03 @ea03_4
  it(
    'deve substituir ativo vinculado a atribuicao',
    { tags: ['@complementar', '@happy_path', '@ea03', '@ea03_4'] },
    () => {
      const atribuicao = criarSubstituicaoAtivoDisponivel()

      editarAtribuicaoPage.preencherCamposObrigatorios(atribuicao)
      editarAtribuicaoPage.selecionarStatusPrimeiroAtivo(atribuicao.statusAtivo!)
      editarAtribuicaoPage.removerPrimeiroAtivo()
      editarAtribuicaoPage.vincularPrimeiroAtivoAutomatizadoDaAtribuicao(atribuicao)
      editarAtribuicaoPage.salvar()

      editarAtribuicaoPage.deveSairDaRotaDeEdicao()
      editarAtribuicaoPage.deveExibirObservacao(atribuicao.observacao!)
    },
  )

  // @complementar @happy_path @ea03 @ea03_5
  it(
    'deve substituir ativo com defeito',
    { tags: ['@complementar', '@happy_path', '@ea03', '@ea03_5'] },
    () => {
      const atribuicao = criarSubstituicaoAtivoComDefeito()

      editarAtribuicaoPage.preencherCamposObrigatorios(atribuicao)
      editarAtribuicaoPage.selecionarStatusPrimeiroAtivo(atribuicao.statusAtivo!)
      editarAtribuicaoPage.informarDescricaoDefeitoPrimeiroAtivo(atribuicao.descricaoDefeito!)
      editarAtribuicaoPage.removerPrimeiroAtivo()
      editarAtribuicaoPage.vincularPrimeiroAtivoAutomatizadoDaAtribuicao(atribuicao)
      editarAtribuicaoPage.salvar()

      editarAtribuicaoPage.deveSairDaRotaDeEdicao()
      editarAtribuicaoPage.deveExibirObservacao(atribuicao.observacao!)
    },
  )

  // @complementar @non_happy_path @ea03 @ea03_6
  it(
    'deve validar campos obrigatorios durante a edicao',
    { tags: ['@complementar', '@non_happy_path', '@ea03', '@ea03_6'] },
    () => {
      editarAtribuicaoPage.devePossuirCamposObrigatorios()
      editarAtribuicaoPage.deveManterFormularioAberto()
    },
  )

  // @complementar @non_happy_path @ea03 @ea03_7
  it(
    'deve cancelar a edicao e descartar alteracoes',
    { tags: ['@complementar', '@non_happy_path', '@ea03', '@ea03_7'] },
    () => {
      const atribuicao = criarAtribuicaoAtualizadaCamposObrigatorios()

      editarAtribuicaoPage.preencherObservacao(atribuicao.observacao!)
      editarAtribuicaoPage.cancelar()

      listarAtribuicoesPage.deveRetornarParaListagem()
    },
  )
})
