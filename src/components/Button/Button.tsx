import { forwardRef } from 'react'
import { useLogic } from 'src/components/Button/hooks'
import * as T from 'src/components/Button/types'

const Button = forwardRef<HTMLButtonElement, T.ButtonProps>((...args) => {
  const { rootProps, loaderProps, children } = useLogic(...args)

  return (
    <button {...rootProps}>
      {children}
      {loaderProps && <div {...loaderProps} />}
    </button>
  )
})

export default Button
