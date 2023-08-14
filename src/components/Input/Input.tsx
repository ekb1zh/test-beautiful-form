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
  disabled,
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

    /*
      Update root styles
    */
    if (disabled) {
      classes.RootContainer = classes.RootContainer_disabled
    }

    /*
      Update styles for password type
    */
    if (type === 'password') {
      classes.Input = `${classes.Input} ${classes.Input_password}`
    }

    return classes
  }, [disabled, isFocused, type])

  const onFocusInput = () => setIsFocused(true)
  const onBlurInput = () => setIsFocused(false)

  const onMouseDownEyeButton: React.ButtonHTMLAttributes<HTMLButtonElement>['onMouseDown'] =
    (event) => {
      /*
        Prevent focus out
      */
      if (inputRef.current === document.activeElement) {
        event.preventDefault()
      }

      setIsValueVisible((prev) => !prev)
    }

  useEffect(() => {
    setIsValueVisible(type !== 'password')
  }, [type])

  const onKeyDownEyeButton: React.ButtonHTMLAttributes<HTMLButtonElement>['onKeyDown'] =
    (event) => {
      const { code } = event
      const isEnter = code === 'Enter'
      const isSpace = code === 'Space' || code === ' ' || code === 'Spacebar'

      if (isEnter || isSpace) {
        setIsValueVisible((prev) => !prev)
      }
    }

  return (
    <div className={classes.RootContainer}>
      <div className={classes.InnerContainer}>
        <input
          ref={inputRef}
          type={isValueVisible ? 'text' : 'password'}
          id={id}
          className={classes.Input}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          disabled={disabled}
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
            onKeyDown={onKeyDownEyeButton}
            disabled={disabled}
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
