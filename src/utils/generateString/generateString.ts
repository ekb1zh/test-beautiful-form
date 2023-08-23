const ALPHANUMERIC =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export const generateString = (length: number, chars = ALPHANUMERIC) => {
  if (length < 0 || length > Number.MAX_SAFE_INTEGER) {
    throw new RangeError(String(length))
  }

  const charsLength = chars.length

  let string = ''
  let count = 0

  if (charsLength) {
    while (count < length) {
      const index = Math.floor(Math.random() * 10e14) % charsLength
      const char = chars[index]
      string += char
      ++count
    }
  }

  return string
}
