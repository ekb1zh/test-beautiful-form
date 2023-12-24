import { forwardRef } from 'react'
import { useLogic } from 'src/components/Layout/hooks'
import * as T from 'src/components/Layout/types'

const Layout = forwardRef<HTMLDivElement, T.LayoutProps>((...args) => {
  const { rootProps, mainProps } = useLogic(...args)

  return (
    <div {...rootProps}>
      <main {...mainProps} />
    </div>
  )
})

export default Layout
