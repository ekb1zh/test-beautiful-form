/*
  Source of regex https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
*/
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

export const validateEmail = (email: string): string | undefined => {
  const isValid = email.match(EMAIL_REGEX)

  if (!isValid) {
    return 'Invalid email'
  }

  return undefined
}

const PASSWORD_MIN_LENGTH = 8

export const validatePassword = (password: string): string | undefined => {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Min length ${PASSWORD_MIN_LENGTH}`
  }

  return undefined
}
