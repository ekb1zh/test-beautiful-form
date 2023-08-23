import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import clsx from 'clsx'

import Icon from 'src/components/Icon'
import styles from 'src/components/Input/Input.module.scss'
import type * as T from 'src/components/Input/types'

const Input = forwardRef<HTMLDivElement, T.InputProps>(
  ({ label, type, errorText, disabled, ...other }, rootRef) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const eyeButtonRef = useRef<HTMLButtonElement>(null)

    const [isValueVisible, setIsValueVisible] = useState(type !== 'password')
    const [isFocused, setIsFocused] = useState(false)

    const id = useId()

    const isValueEmpty = inputRef.current
      ? inputRef.current.value.length === 0
      : true

    useEffect(() => {
      setIsValueVisible(type !== 'password')
    }, [type])

    useEffect(() => {
      const { current: input } = inputRef

      const onFocus = () => setIsFocused(true)
      const onBlur = () => setIsFocused(false)

      if (input) {
        input.addEventListener('focus', onFocus, true)
        input.addEventListener('blur', onBlur, true)
      }

      return () => {
        if (input) {
          input.removeEventListener('focus', onFocus, true)
          input.removeEventListener('blur', onBlur, true)
        }
      }
    }, [])

    useEffect(() => {
      const { current: button } = eyeButtonRef

      const onMouseDown = (event: MouseEvent) => {
        if (inputRef.current === document.activeElement) {
          event.preventDefault()
        }

        setIsValueVisible((prev) => !prev)
      }

      const onKeyDown = (event: KeyboardEvent) => {
        const { code } = event
        const isEnter = code === 'Enter'
        const isSpace = code === 'Space' || code === ' ' || code === 'Spacebar'

        if (isEnter || isSpace) {
          setIsValueVisible((prev) => !prev)
        }
      }

      if (button) {
        button.addEventListener('mousedown', onMouseDown, true)
        button.addEventListener('keydown', onKeyDown, true)
      }

      return () => {
        if (button) {
          button.removeEventListener('mousedown', onMouseDown, true)
          button.removeEventListener('keydown', onKeyDown, true)
        }
      }
    }, [])

    return (
      <div
        ref={rootRef}
        className={clsx(styles.RootContainer, disabled && styles.disabled)}
      >
        <div className={styles.InnerContainer}>
          <input
            ref={inputRef}
            type={isValueVisible ? 'text' : 'password'}
            id={id}
            className={clsx(
              styles.Input,
              type === 'password' && styles.password,
            )}
            disabled={disabled}
            {...other}
          />

          {label && (
            <label
              className={clsx(
                styles.Label,
                isFocused
                  ? styles.small
                  : isValueEmpty
                  ? styles.big
                  : styles.small,
              )}
              htmlFor={id}
            >
              {label}
            </label>
          )}

          {type === 'password' && (
            <button
              ref={eyeButtonRef}
              type='button'
              className={styles.EyeButton}
              disabled={disabled}
            >
              {isValueVisible ? <Icon.EyeClose /> : <Icon.EyeOpen />}
            </button>
          )}
        </div>

        {errorText && <div className={styles.ErrorMessage}>{errorText}</div>}
      </div>
    )
  },
)

export default Input
