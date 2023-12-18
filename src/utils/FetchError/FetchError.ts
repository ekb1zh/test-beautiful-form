export class FetchError<B> extends Error {
  constructor(
    public readonly responseBody: B,
    message?: string,
    options?: ErrorOptions,
  ) {
    super(message, options)
  }
}
