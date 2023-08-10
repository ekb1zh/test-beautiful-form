export type StringGeneratorParams = {
  /*
    Allowed chars. For example:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  */
  allowedChars: string
  /*
    When you call mathod StringGenerator.prototype.next() without param,
    will be using this defaultSize.
  */
  defaultSize: number
}
