import { AccountModel } from '@/domain/models'

export type AddAcountParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface AddAcount {
  add: (params: AddAcountParams) => Promise<AccountModel>
}
