import React from 'react'

import { RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react'

import faker from 'faker'

import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/test'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()

  validationStub.errorMessage = params?.validationError

  const addAccountSpy = new AddAccountSpy()

  const sut = render(<SignUp validation={validationStub} addAccount={addAccountSpy} />)

  return {
    sut,
    addAccountSpy
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populatelField(sut, 'name', name)
  Helper.populatelField(sut, 'email', email)
  Helper.populatelField(sut, 'password', password)
  Helper.populatelField(sut, 'passwordConfirmation', password)

  const form = sut.getByTestId('form')

  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)

    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.populatelField(sut, 'name')

    Helper.testStatusForField(sut, 'name', validationError)
  })

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.populatelField(sut, 'email')

    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.populatelField(sut, 'password')

    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.populatelField(sut, 'passwordConfirmation')

    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show valid name state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populatelField(sut, 'name')

    Helper.testStatusForField(sut, 'name')
  })

  test('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populatelField(sut, 'email')

    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populatelField(sut, 'password')

    Helper.testStatusForField(sut, 'password')
  })

  test('Should show valid passwordConfirmation state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populatelField(sut, 'passwordConfirmation')

    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    Helper.populatelField(sut, 'name')
    Helper.populatelField(sut, 'email')
    Helper.populatelField(sut, 'password')
    Helper.populatelField(sut, 'passwordConfirmation')

    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()

    await simulateValidSubmit(sut)

    Helper.testElementExists(sut, 'spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()

    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(sut, name, email, password)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })
})
