import { validateEmail, validatePassword } from 'src/utils/validators'

describe('validateEmail', () => {
  test('valid email', () => {
    const email = 'a@a.aa'
    const result = validateEmail(email)
    expect(typeof result === 'undefined').toBe(true)
  })

  test('invalid email', () => {
    const email = 'a@a.a'
    const result = validateEmail(email)
    expect(typeof result === 'string').toBe(true)
  })
})

describe('validatePassword', () => {
  test('valid min length', () => {
    const password = '12345678'
    const result = validatePassword(password)
    expect(typeof result === 'undefined').toBe(true)
  })

  test('invalid min length', () => {
    const password = '1234567'
    const result = validatePassword(password)
    expect(typeof result === 'string').toBe(true)
  })
})
