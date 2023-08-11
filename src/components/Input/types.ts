export interface InputProps {
  value: string
  onChange: (value: string) => void

  label?: string
  type?: 'text' | 'password'
  errorText?: string
}
