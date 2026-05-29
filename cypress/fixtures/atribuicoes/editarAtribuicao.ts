const criarIdentificador = (): string => `${Date.now()}-${Math.floor(Math.random() * 1000)}`

export interface AtribuicaoEdicao {
  area: string
  subarea: string
  tipoResponsavel: string
  colaborador?: string
  atendidoPor: string
  modalidade: string
  sistemaOperacional?: string
  usaPacoteOffice?: boolean
  pacoteOffice?: string
  observacao?: string
  descricaoDefeito?: string
  statusAtivo?: string
  tomboAtivo?: string
}

export const criarAtribuicaoAtualizadaCamposObrigatorios = (): AtribuicaoEdicao => ({
  area: 'JUDICIAL',
  subarea: 'APOIO',
  tipoResponsavel: 'Colaborador',
  colaborador: 'Mariana Oliveira Santos',
  atendidoPor: 'Atendente',
  modalidade: 'Home Office',
  observacao: `AUTO - Edicao campos obrigatorios ${criarIdentificador()}`,
})

export const criarAtribuicaoAtualizadaTodosOsCampos = (): AtribuicaoEdicao => ({
  area: 'CETREI',
  subarea: 'BIBLIOTECA',
  tipoResponsavel: 'Colaborador',
  colaborador: 'Mariana Oliveira Santos',
  atendidoPor: 'Atendente',
  modalidade: 'Home Office',
  sistemaOperacional: 'WINDOWS 11 PRO',
  usaPacoteOffice: false,
  pacoteOffice: '',
  observacao: `AUTO - Edicao todos os campos ${criarIdentificador()}`,
})

export const criarSubstituicaoAtivoDisponivel = (): AtribuicaoEdicao => ({
  ...criarAtribuicaoAtualizadaCamposObrigatorios(),
  statusAtivo: 'DISPONÍVEL',
  observacao: `AUTO - Substituicao ativo disponivel ${criarIdentificador()}`,
})

export const criarSubstituicaoAtivoComDefeito = (): AtribuicaoEdicao => ({
  ...criarAtribuicaoAtualizadaCamposObrigatorios(),
  statusAtivo: 'COM DEFEITO',
  observacao: `AUTO - Substituicao ativo com defeito ${criarIdentificador()}`,
  descricaoDefeito: `Defeito identificado por teste automatizado ${criarIdentificador()}`,
})
