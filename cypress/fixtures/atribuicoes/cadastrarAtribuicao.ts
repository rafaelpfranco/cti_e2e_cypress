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

export const dadosCadastroAtribuicao = {
  atribuicaoParaColaborador: {
    area: 'JUDICIAL',
    subarea: 'APOIO',
    tipoResponsavel: 'Colaborador',
    colaborador: 'Mariana Oliveira Santos',
    atendidoPor: 'Atendente',
    modalidade: 'Presencial',
    sistemaOperacional: 'WINDOWS 11 PRO',
    usaPacoteOffice: false,
    pacoteOffice: '',
    observacao: 'Teste Automatizado - Inventario CTI',
  },
  atribuicaoSemColaborador: {
    area: 'JUDICIAL',
    subarea: 'APOIO',
    tipoResponsavel: 'Sem Colaborador',
    atendidoPor: 'Atendente',
    modalidade: 'Home Office',
    sistemaOperacional: 'WINDOWS 10 PRO',
    usaPacoteOffice: false,
    pacoteOffice: '',
    observacao: 'Teste Automatizado - Inventario CTI sem colaborador',
  },
} satisfies DadosCadastroAtribuicao

export const criarAtribuicaoParaColaborador = (): AtribuicaoCadastro => ({
  ...dadosCadastroAtribuicao.atribuicaoParaColaborador,
})

export const criarAtribuicaoSemColaborador = (): AtribuicaoCadastro => ({
  ...dadosCadastroAtribuicao.atribuicaoSemColaborador,
})
