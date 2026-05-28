import type { DadosCadastroAtivo } from '@/fixtures/ativos/types'

export const dadosCadastroAtivo: DadosCadastroAtivo = {
  ativoCamera: {
    tipo: 'CAMERA',
    marca: 'Teste QA',
    modelo: 'Camera automatizada',
    serial: 'SER-CAMERA',
    prefixoTombo: 'AUTO-CAM',
    aquisicao: '00/0001',
    especificacao: 'Camera cadastrada por teste automatizado',
  },
  ativoEstabilizador: {
    tipo: 'ESTABILIZADOR',
    marca: 'Teste QA',
    modelo: 'Estabilizador automatizado',
    serial: 'SER-EST',
    prefixoTombo: 'AUTO-EST',
    aquisicao: '00/0001',
    especificacao: 'Estabilizador cadastrado por teste automatizado',
  },
}
