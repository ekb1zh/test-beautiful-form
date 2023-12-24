import { forwardRef } from 'react'

import Icon from 'src/components/Icon'
import { useLogic } from 'src/components/Input/hooks'
import * as T from 'src/components/Input/types'

const Input = forwardRef<HTMLDivElement, T.InputProps>((...args) => {
  const {
    rootProps,
    containerProps,
    inputProps,
    labelProps,
    eyeButtonProps,
    errorMessageProps,
    isValueVisible,
  } = useLogic(...args)

  return (
    <div {...rootProps}>
      <div {...containerProps}>
        <input {...inputProps} />
        {labelProps && <label {...labelProps} />}
        {eyeButtonProps && (
          <button {...eyeButtonProps}>
            {isValueVisible ? <Icon.EyeClose /> : <Icon.EyeOpen />}
          </button>
        )}
      </div>
      {errorMessageProps && <div {...errorMessageProps} />}
    </div>
  )
})

export default Input
