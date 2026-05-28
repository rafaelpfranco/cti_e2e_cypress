export interface AtivoCadastro {
  tipo: string
  marca: string
  modelo: string
  serial: string
  prefixoTombo: string
  aquisicao: string
  especificacao: string
}

export interface DadosCadastroAtivo {
  ativoCamera: AtivoCadastro
  ativoEstabilizador: AtivoCadastro
}
