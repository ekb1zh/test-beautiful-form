import { ReactNode } from 'react'

export interface LinkButtonProps
  extends Pick<
    React.JSX.IntrinsicElements['button'],
    'type' | 'onClick' | 'disabled'
  > {
  children: ReactNode
}
