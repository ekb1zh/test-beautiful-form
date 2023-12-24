import { forwardRef } from 'react'

import { useLogic } from 'src/components/LinkButton/hooks'
import * as T from 'src/components/LinkButton/types'

const LinkButton = forwardRef<HTMLButtonElement, T.LinkButtonProps>(
  (...args) => {
    const { rootProps } = useLogic(...args)

    return <button {...rootProps} />
  },
)

export default LinkButton
