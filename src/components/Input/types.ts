export interface InputProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'name'
  > {
  label?: string
  type?: 'text' | 'password'
  errorText?: string
}
