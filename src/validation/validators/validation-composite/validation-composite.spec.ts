import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    const fieldValidationSpyTwo = new FieldValidationSpy('any_field')
    fieldValidationSpyTwo.error = new Error('any_error_message')

    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpyTwo
    ])

    const error = sut.validate('any_field', 'any_value')

    expect(error).toBe('any_error_message')
  })
})
