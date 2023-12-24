import { ForwardedRef } from 'react'
import styles from 'src/components/LinkButton/LinkButton.module.scss'
import * as T from 'src/components/LinkButton/types'

export const useLogic = (
  props: T.LinkButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const rootProps: React.JSX.IntrinsicElements['button'] = {
    className: styles.Root,
    ref,
    type: 'button',
    ...props,
  }

  return {
    rootProps,
  }
}
