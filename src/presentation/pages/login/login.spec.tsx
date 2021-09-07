import React from 'react'

import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react'

import faker from 'faker'

import Login from './login'

import { Validation } from '@/presentation/protocols/validation'
import { ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()

  // @ts-ignore
  validationStub.errorMessage = faker.random.words()

  const sut = render(<Login validation={validationStub} />)

  return {
    sut,
    validationStub
  }
}
describe('Login Component', () => {
  afterEach(cleanup)
  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut()

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId(
      'submit'
    ) as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()

    const emailStatus = sut.getByTestId('email-status')

    /* @ts-ignore */
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')

    /* @ts-ignore */
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error if validation fails', () => {
    const { sut, validationStub } = makeSut()

    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })

    const emailStatus = sut.getByTestId('email-status')

    // @ts-ignore
    expect(emailStatus.title).toEqual(validationStub.errorMessage)
    expect(emailStatus.textContent).toEqual('🔴')
  })

  test('Should show password error if validation fails', () => {
    const { sut, validationStub } = makeSut()

    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const passwordStatus = sut.getByTestId('password-status')

    // @ts-ignore
    expect(passwordStatus.title).toEqual(validationStub.errorMessage)
    expect(passwordStatus.textContent).toEqual('🔴')
  })

  test('Should show valid email state if validation succeeds', () => {
    const { sut, validationStub } = makeSut()

    /* @ts-ignore */
    validationStub.errorMessage = null

    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })

    const emailStatus = sut.getByTestId('email-status')

    // @ts-ignore
    expect(emailStatus.title).toEqual('Tudo certo!')
    expect(emailStatus.textContent).toEqual('✅')
  })
  test('Should show valid password state if validation succeeds', () => {
    const { sut, validationStub } = makeSut()

    /* @ts-ignore */
    validationStub.errorMessage = null

    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const passwordStatus = sut.getByTestId('password-status')

    // @ts-ignore
    expect(passwordStatus.title).toEqual('Tudo certo!')
    expect(passwordStatus.textContent).toEqual('✅')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut, validationStub } = makeSut()

    /* @ts-ignore */
    validationStub.errorMessage = null

    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })

    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const submitButton = sut.getByTestId(
      'submit'
    ) as HTMLButtonElement

    expect(submitButton.disabled).toBeFalsy()
  })
})
