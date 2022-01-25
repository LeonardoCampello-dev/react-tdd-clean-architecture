import { LocalStorageAdapter } from './local-storage-adapter'

import { cleanup } from '@testing-library/react'

import faker from 'faker'
import 'jest-localstorage-mock'

import { AccountModel } from '@/domain/models'

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
describe('LocalStorageAdapter', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage.setItem with correct values', async () => {
    const sut = makeSut()

    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('Should call localStorage.getItem with correct value', async () => {
    const sut = makeSut()

    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()

    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value))

    const obj = sut.get(key)

    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
