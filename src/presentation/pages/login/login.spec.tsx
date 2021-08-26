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
import { ValidationSpy } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationSpy: Validation
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)

  return {
    sut,
    validationSpy
  }
}
describe('Login Component', () => {
  afterEach(cleanup)
  test('Should start with initial state', () => {
    const { sut } = makeSut()

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId(
      'submit'
    ) as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })

    // @ts-ignore
    expect(validationSpy.fieldName).toEqual('email')
    // @ts-ignore
    expect(validationSpy.fieldValue).toEqual(email)
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()

    fireEvent.input(passwordInput, {
      target: { value: password }
    })

    // @ts-ignore
    expect(validationSpy.fieldName).toEqual('password')
    // @ts-ignore
    expect(validationSpy.fieldValue).toEqual(password)
  })
})
