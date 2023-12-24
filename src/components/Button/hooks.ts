import styles from 'src/components/Button/Button.module.scss'
import * as T from 'src/components/Button/types'

export const useLogic = (
  props: T.ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const { type, disabled, loading, children, onClick } = props

  const rootProps: React.JSX.IntrinsicElements['button'] = {
    className: styles.Root,
    ref,
    type: type ?? 'button',
    disabled: disabled || loading,
    onClick,
  }

  const loaderProps: React.JSX.IntrinsicElements['div'] | null = loading
    ? {
        className: styles.Loader,
      }
    : null

  return {
    rootProps,
    loaderProps,
    children,
  }
}
