export interface AtribuicaoCadastro {
  area: string
  subarea: string
  tipoResponsavel: string
  colaborador?: string
  atendidoPor: string
  modalidade: string
  sistemaOperacional: string
  usaPacoteOffice: boolean
  pacoteOffice: string
  observacao: string
  tomboAtivo?: string
}

export interface DadosCadastroAtribuicao {
  atribuicaoParaColaborador: AtribuicaoCadastro
  atribuicaoSemColaborador: AtribuicaoCadastro
}

export interface AtribuicaoAtualizada {
  area: string
  subarea: string
  atendidoPor: string
  modalidade: string
  sistemaOperacional: string
  observacao: string
}

export interface SubstituicaoAtivoDisponivel {
  statusAtual: string
  novoTomboAtivo: string
}

export interface SubstituicaoAtivoComDefeito {
  statusAtual: string
  descricaoDefeito: string
  novoTomboAtivo: string
}

export interface DadosEdicaoAtribuicao {
  atribuicaoAtualizada: AtribuicaoAtualizada
  substituicaoAtivoDisponivel: SubstituicaoAtivoDisponivel
  substituicaoAtivoComDefeito: SubstituicaoAtivoComDefeito
}
