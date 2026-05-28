import type { DadosEdicaoAtribuicao } from '@/fixtures/atribuicoes/types'

export const dadosEdicaoAtribuicao: DadosEdicaoAtribuicao = {
  atribuicaoAtualizada: {
    area: 'CETREI',
    subarea: 'BIBLIOTECA',
    atendidoPor: 'Atendente',
    modalidade: 'Home Office',
    sistemaOperacional: 'WINDOWS 11 PRO',
    observacao: 'Atribuicao atualizada por teste automatizado',
  },
  substituicaoAtivoDisponivel: {
    statusAtual: 'DISPONIVEL',
    novoTomboAtivo: 'TST09',
  },
  substituicaoAtivoComDefeito: {
    statusAtual: 'COM DEFEITO',
    descricaoDefeito: 'Ativo marcado com defeito durante teste automatizado',
    novoTomboAtivo: 'TST003',
  },
}
