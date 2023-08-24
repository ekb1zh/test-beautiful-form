import { LocalStorageItem } from 'src/utils'

describe('LocalStorageItem.prototype.constructor', () => {
  test('any key => should not throw', () => {
    const limit = 10
    for (let i = 0; i < limit; ++i) {
      const key = String(Math.random())
      expect(() => new LocalStorageItem(key)).not.toThrow()
    }
  })
})

describe('LocalStorageItem.prototype.read', () => {
  const key = ''

  beforeEach(() => {
    localStorage.removeItem(key)
  })

  test('read empty storage => should return null', () => {
    const storage = new LocalStorageItem(key)
    const data = storage.read()
    expect(data).toBe(null)
  })

  test('read not empty storage => should return data', () => {
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

describe('LocalStorageItem.prototype.write', () => {
  test('after write data => storage should has data', () => {
    const key = ''
    const storage = new LocalStorageItem(key)
    const dataWrite = '12345'
    storage.write(dataWrite)

    const dataRead = localStorage.getItem(key)!
    const dataReadParsed = JSON.parse(dataRead)

    expect(dataWrite).toStrictEqual(dataReadParsed)
  })
})

describe('LocalStorageItem.prototype.delete', () => {
  test('after delete data => storage should not has data', () => {
    const key = ''
    localStorage.setItem(key, '')

    const storage = new LocalStorageItem(key)
    storage.delete()

    expect(localStorage.getItem(key)).toBe(null)
  })
})

test('any operations => should return correct result', () => {
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

  const storage = new LocalStorageItem(key)
  expect(storage.read()).toBe(null)

  storage.write(dataWrite)
  expect(storage.read()).toStrictEqual(dataWrite)

  storage.write(dataWrite)
  expect(storage.read()).toStrictEqual(dataWrite)

  storage.delete()
  expect(storage.read()).toBe(null)

  storage.write(dataWrite)
  expect(storage.read()).toStrictEqual(dataWrite)
})
