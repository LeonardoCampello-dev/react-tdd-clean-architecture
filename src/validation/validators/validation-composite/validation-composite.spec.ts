import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    fieldValidationSpy.error = new Error('first_error_message')
    const fieldValidationSpyTwo = new FieldValidationSpy('any_field')
    fieldValidationSpyTwo.error = new Error('second_error_message')

    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpyTwo
    ])

    const error = sut.validate('any_field', 'any_value')

    expect(error).toBe('first_error_message')
  })
})
