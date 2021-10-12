import { AddAcount, AddAcountParams } from '@/domain/usecases'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

export class AddAccountSpy implements AddAcount {
  account = mockAccountModel()
  params: AddAcountParams
  callsCount = 0

  async add (params: AddAcountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++

    return this.account
  }
}
