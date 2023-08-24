import { generateString } from 'src/utils'

describe('generateString', () => {
  describe('default chars', () => {
    test('min length', () => {
      const length = 0
      expect(generateString(length).length).toBe(length)
    })

    test('normal length', () => {
      const length = 100
      expect(generateString(length).length).toBe(length)
    })

    test('less min length', () => {
      const length = -1
      expect(() => generateString(length)).toThrow()
    })

    test('more max length', () => {
      const length = Number.MAX_SAFE_INTEGER + 1
      expect(() => generateString(length)).toThrow()
    })
  })

  describe('empty chars', () => {
    const chars = ''
    const result = ''

    test('any length', () => {
      for (let i = 0; i < 100; ++i) {
        const length = Math.floor(Math.random() * 10e14)
        expect(generateString(length, chars)).toBe(result)
      }
    })
  })
})
