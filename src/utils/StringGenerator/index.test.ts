import { StringGenerator } from 'src/utils/StringGenerator'

describe('StringGenerator.prototype.constructor', () => {
  const createResult = (defaultSize: number) => () =>
    new StringGenerator({
      defaultSize,
      allowedChars: '',
    })

  describe('defaultSize', () => {
    test('valid min', () => {
      const defaultSize = 0
      expect(createResult(defaultSize)).not.toThrow()
    })

    test('valid max', () => {
      const defaultSize = Number.MAX_SAFE_INTEGER
      expect(createResult(defaultSize)).not.toThrow()
    })

    test('valid normal', () => {
      const defaultSize = Math.floor(Number.MAX_SAFE_INTEGER / 2)
      expect(createResult(defaultSize)).not.toThrow()
    })

    test('invalid less min', () => {
      const defaultSize = -1
      expect(createResult(defaultSize)).toThrow()
    })

    test('invalid more max', () => {
      const defaultSize = Number.MAX_SAFE_INTEGER + 1
      expect(createResult(defaultSize)).toThrow()
    })
  })
})

describe('StringGenerator.isValidSize', () => {
  //@ts-ignore
  const createResult = (size: number) => StringGenerator.isValidSize(size)

  test('min valid', () => {
    const size = 0
    expect(createResult(size)).toBe(true)
  })

  test('max valid', () => {
    const size = Number.MAX_SAFE_INTEGER
    expect(createResult(size)).toBe(true)
  })

  test('normal valid', () => {
    const size = Math.floor(Number.MAX_SAFE_INTEGER / 2)
    expect(createResult(size)).toBe(true)
  })
})

describe('StringGenerator.prototype.next', () => {
  describe('size', () => {
    const instance = new StringGenerator({
      allowedChars: 'abcdef',
      defaultSize: 0,
    })

    test('min valid', () => {
      const size = 0
      const result = instance.next(size)

      expect(result.length).toBe(size)
    })

    test('normal valid', () => {
      const size = 100
      const result = instance.next(size)

      expect(result.length).toBe(size)
    })

    test('invalid less min', () => {
      const size = -1
      const result = () => instance.next(size)

      expect(result).toThrow()
    })

    test('invalid more max', () => {
      const size = Number.MAX_SAFE_INTEGER + 1
      const result = () => instance.next(size)

      expect(result).toThrow()
    })
  })
})
