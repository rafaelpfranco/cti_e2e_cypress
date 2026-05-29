import dotenv from 'dotenv'

dotenv.config()

interface Environment {
  baseUrl: string
  userEmail: string
  userPassword: string
}

export const environment: Environment = {
  baseUrl: process.env.BASE_URL ?? 'http://testeqa.pge.ce.gov.br',
  userEmail: process.env.USER_EMAIL ?? '',
  userPassword: process.env.USER_PASSWORD ?? '',
}
