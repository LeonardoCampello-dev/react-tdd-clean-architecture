import { AddAcount, AddAcountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { HttpPostClient } from '@/data/protocols/http'

export class RemoteAddAccount implements AddAcount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
    AddAcountParams,
    AccountModel
    >
  ) {}

  async add (params: AddAcountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    return null
  }
}
