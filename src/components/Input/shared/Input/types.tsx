export interface InputProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'onInput' | 'disabled'
  > {}
