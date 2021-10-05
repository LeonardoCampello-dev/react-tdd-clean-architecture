import { AddAcount, AddAcountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

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

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return httpResponse.body
      }

      case HttpStatusCode.forbidden: {
        throw new EmailInUseError()
      }

      default: {
        throw new UnexpectedError()
      }
    }
  }
}
