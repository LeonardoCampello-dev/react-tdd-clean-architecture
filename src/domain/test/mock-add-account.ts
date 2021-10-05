import { AddAcountParams } from '@/domain/usecases'

import faker from 'faker'

export const mockAddAccountParams = (): AddAcountParams => {
  const password = faker.internet.password()

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
