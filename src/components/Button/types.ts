import { ReactNode } from 'react'

export interface ButtonProps
  extends Pick<
    React.JSX.IntrinsicElements['button'],
    'type' | 'onClick' | 'disabled'
  > {
  loading?: boolean
  children: ReactNode
}
