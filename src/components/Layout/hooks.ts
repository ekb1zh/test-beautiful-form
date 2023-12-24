import styles from 'src/components/Layout/Layout.module.scss'
import * as T from 'src/components/Layout/types'

export const useLogic = (
  props: T.LayoutProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const { children } = props

  const rootProps: React.JSX.IntrinsicElements['div'] = {
    className: styles.Root,
    ref,
  }

  const mainProps: React.JSX.IntrinsicElements['main'] = {
    className: styles.Main,
    children,
  }

  return {
    rootProps,
    mainProps,
  }
}
