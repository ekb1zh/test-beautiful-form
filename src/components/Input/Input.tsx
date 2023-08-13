import React, { useEffect, useMemo, useRef, useState } from 'react'

import Icon from 'src/components/Icon'
import { StringGenerator } from 'src/utils'
import styles from 'src/components/Input/Input.module.scss'
import * as T from 'src/components/Input/types'

const stringGenerator = new StringGenerator({
  allowedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  defaultSize: 4,
})

const Input: React.FC<T.InputProps> = ({
  label,
  type,
  errorText,
  ...other
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isValueVisible, setIsValueVisible] = useState(type !== 'password')
  const [isFocused, setIsFocused] = useState(false)

  const id = useMemo(() => stringGenerator.next(), [])
  const eyeIcon = useMemo(
    () => (isValueVisible ? <Icon.EyeClose /> : <Icon.EyeOpen />),
    [isValueVisible],
  )
  const classes = useMemo(() => {
    const classes = { ...styles }

    /*
      Update label styles
    */
    {
      const isValueEmpty = inputRef.current
        ? inputRef.current.value.length === 0
        : true

      let label = classes.Label

      label += ' '
      label += isFocused
        ? classes.Label_small
        : isValueEmpty
        ? classes.Label_big
        : classes.Label_small

      classes.Label = label
    }

    return classes
  }, [isFocused])

  const onFocusInput = () => setIsFocused(true)
  const onBlurInput = () => setIsFocused(false)

  const onMouseDownEyeButton: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'] =
    (event) => {
      /*
        Prevent focus out
      */
      if (inputRef.current === document.activeElement) {
        event.preventDefault()
      }

      /*
        Update isValueVisible
      */
      setIsValueVisible((prev) => !prev)
    }

  useEffect(() => {
    setIsValueVisible(type !== 'password')
  }, [type])

  return (
    <div>
      <div className={classes.InnerContainer}>
        <input
          ref={inputRef}
          type={isValueVisible ? 'text' : 'password'}
          id={id}
          className={classes.Input}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          {...other}
        />

        {typeof label === 'string' && (
          <label className={classes.Label} htmlFor={id}>
            {label}
          </label>
        )}

        {type === 'password' && (
          <button
            type='button'
            className={classes.EyeButton}
            onMouseDown={onMouseDownEyeButton}
          >
            {eyeIcon}
          </button>
        )}
      </div>

      {typeof errorText === 'string' && (
        <div className={classes.ErrorMessage}>{errorText}</div>
      )}
    </div>
  )
}

export default Input
