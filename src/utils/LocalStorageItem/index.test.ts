import { LocalStorageItem } from 'src/utils/LocalStorageItem'

describe('LocalStorageItem.prototype.constructor', () => {
  describe('key', () => {
    const createResult = (key: string) => () => new LocalStorageItem(key)

    test('valid min length', () => {
      const key = ''
      expect(createResult(key)).not.toThrow()
    })

    test('valid normal length', () => {
      const key = 'ANY_KEY'
      expect(createResult(key)).not.toThrow()
    })
  })
})

describe('LocalStorageItem.prototype.read', () => {
  const key = ''

  beforeEach(() => {
    localStorage.removeItem(key)
  })

  test('correct return null', () => {
    const storage = new LocalStorageItem(key)
    const data = storage.read()
    expect(data === null).toBe(true)
  })

  test('correct return data', () => {
    const dataWrite = {
      a: 0,
      b: true,
      c: {
        a: [1, 2, 3],
        b: null,
        c: [{ a: '' }, { b: '123' }],
      },
    }
    localStorage.setItem(key, JSON.stringify(dataWrite))

    const storage = new LocalStorageItem(key)
    const dataRead = storage.read()

    expect(dataWrite).toStrictEqual(dataRead)
  })
})

test('LocalStorageItem.prototype.write', () => {
  const key = ''
  localStorage.removeItem(key)

  const storage = new LocalStorageItem(key)
  const dataWrite = '12345'
  storage.write(dataWrite)

  const dataRead = localStorage.getItem(key)!
  const dataReadParsed = JSON.parse(dataRead)

  expect(dataWrite).toStrictEqual(dataReadParsed)
})

test('LocalStorageItem.prototype.delete', () => {
  const key = ''
  localStorage.removeItem(key)
  localStorage.setItem(key, '')

  const storage = new LocalStorageItem(key)
  storage.delete()

  expect(localStorage.getItem(key) === null).toBe(true)
})

test('LocalStorageItem all operations', () => {
  const key = ''
  const dataWrite = {
    a: 0,
    b: true,
    c: {
      a: [1, 2, 3],
      b: null,
      c: [{ a: '' }, { b: '123' }],
    },
  }

  localStorage.removeItem(key)

  const storage = new LocalStorageItem(key)
  expect(storage.read() === null).toBe(true)

  storage.write(dataWrite)
  expect(storage.read()).toStrictEqual(dataWrite)

  storage.write(dataWrite)
  expect(storage.read()).toStrictEqual(dataWrite)

  storage.delete()
  expect(storage.read() === null).toBe(true)

  storage.write(dataWrite)
  expect(storage.read()).toStrictEqual(dataWrite)
})
