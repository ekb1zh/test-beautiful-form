export interface InputProps
  extends Pick<
    React.JSX.IntrinsicElements['input'],
    'value' | 'defaultValue' | 'onChange' | 'name' | 'disabled'
  > {
  label?: string
  type?: 'text' | 'password'
  errorText?: string
}
