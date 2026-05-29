const criarIdentificador = (): string => `${Date.now()}-${Math.floor(Math.random() * 1000)}`

export interface AtivoCadastro {
  tipo: string
  marca: string
  modelo: string
  serial: string
  prefixoTombo: string
  aquisicao: string
  especificacao: string
}

export interface AtivoCadastroGerado {
  ativo: AtivoCadastro
  tombo: string
  serial: string
}

export interface DadosCadastroAtivo {
  ativoCamera: AtivoCadastro
  ativoEstabilizador: AtivoCadastro
}

export const dadosCadastroAtivo = {
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
} satisfies DadosCadastroAtivo

const criarAtivoCadastro = (ativo: AtivoCadastro): AtivoCadastroGerado => {
  const identificador = criarIdentificador()

  return {
    ativo,
    tombo: `${ativo.prefixoTombo}-${identificador}`,
    serial: `${ativo.serial}-${identificador}`,
  }
}

export const criarAtivoCamera = (): AtivoCadastroGerado =>
  criarAtivoCadastro(dadosCadastroAtivo.ativoCamera)

export const criarAtivoEstabilizador = (): AtivoCadastroGerado =>
  criarAtivoCadastro(dadosCadastroAtivo.ativoEstabilizador)
