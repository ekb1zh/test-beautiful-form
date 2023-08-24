import { generateString } from 'src/utils'

describe('generateString', () => {
  describe('default chars', () => {
    test('min length => should return string with this length', () => {
      const length = 0
      expect(generateString(length).length).toBe(length)
    })

    test('normal length => should return string with this length', () => {
      const length = 100
      expect(generateString(length).length).toBe(length)
    })

    test('less min length => should throw', () => {
      const length = -1
      expect(() => generateString(length)).toThrow()
    })

    test('more max length => should throw', () => {
      const length = Number.MAX_SAFE_INTEGER + 1
      expect(() => generateString(length)).toThrow()
    })
  })

  describe('empty chars', () => {
    test('any length => should return empty string', () => {
      const chars = ''
      const limit = 100

      for (let i = 0; i < limit; ++i) {
        const length = Math.floor(Math.random() * 10e14)
        expect(generateString(length, chars)).toBe('')
      }
    })
  })
})
