import { StringGeneratorParams } from 'src/utils/StringGenerator/types'

export class StringGenerator {
  private readonly ALLOWED_CHARS: string
  private readonly DEFAULT_SIZE: number

  constructor({ allowedChars, defaultSize }: StringGeneratorParams) {
    if (defaultSize < 0) {
      throw new RangeError(String(defaultSize))
    }

    this.ALLOWED_CHARS = allowedChars
    this.DEFAULT_SIZE = defaultSize
  }

  next(size: number = this.DEFAULT_SIZE): string {
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
