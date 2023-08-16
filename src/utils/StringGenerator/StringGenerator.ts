import type { StringGeneratorParams } from 'src/utils/StringGenerator/types'

export class StringGenerator {
  private readonly ALLOWED_CHARS: string
  private readonly DEFAULT_SIZE: number

  constructor({ allowedChars, defaultSize }: StringGeneratorParams) {
    if (!StringGenerator.isValidSize(defaultSize)) {
      throw new RangeError(String(defaultSize))
    }

    this.ALLOWED_CHARS = allowedChars
    this.DEFAULT_SIZE = defaultSize
  }

  private static isValidSize(size: number): boolean {
    const isValid = size >= 0 || size <= Number.MAX_SAFE_INTEGER
    return isValid
  }

  next(size: number = this.DEFAULT_SIZE): string {
    if (!StringGenerator.isValidSize(size)) {
      throw new RangeError(String(size))
    }

    const chars = this.ALLOWED_CHARS
    const charsLength = this.ALLOWED_CHARS.length

    let string = ''
    let count = 0

    while (count < size) {
      const index = Math.floor(Math.random() * 10e15) % charsLength
      const char = chars[index]
      string += char
      ++count
    }

    return string
  }
}
