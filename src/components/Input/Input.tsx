import React, {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import cx from 'clsx'

import Icon from 'src/components/Icon'
import styles from 'src/components/Input/Input.module.scss'
import type * as T from 'src/components/Input/types'

const Input = forwardRef<HTMLDivElement, T.InputProps>(
  ({ label, type, errorText, disabled, ...other }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const [isValueVisible, setIsValueVisible] = useState(type !== 'password')
    const [isFocused, setIsFocused] = useState(false)

    const id = useId()

    const eyeIcon = useMemo(
      () => (isValueVisible ? <Icon.EyeClose /> : <Icon.EyeOpen />),
      [isValueVisible],
    )

    const isValueEmpty = inputRef.current
      ? inputRef.current.value.length === 0
      : true

    const onMouseDownEyeButton: React.ButtonHTMLAttributes<HTMLButtonElement>['onMouseDown'] =
      (event) => {
        if (inputRef.current === document.activeElement) {
          event.preventDefault()
        }

        setIsValueVisible((prev) => !prev)
      }

    const onKeyDownEyeButton: React.ButtonHTMLAttributes<HTMLButtonElement>['onKeyDown'] =
      (event) => {
        const { code } = event
        const isEnter = code === 'Enter'
        const isSpace = code === 'Space' || code === ' ' || code === 'Spacebar'

        if (isEnter || isSpace) {
          setIsValueVisible((prev) => !prev)
        }
      }

    useEffect(() => {
      setIsValueVisible(type !== 'password')
    }, [type])

    useEffect(() => {
      const { current: input } = inputRef

      const events = [
        ['focus', () => setIsFocused(true)],
        ['blur', () => setIsFocused(false)],
      ] as const

      events.forEach(
        ([event, handler]) =>
          input && input.addEventListener(event, handler, true),
      )

      return () =>
        events.forEach(
          ([event, handler]) =>
            input && input.removeEventListener(event, handler, true),
        )
    }, [])

    return (
      <div
        ref={ref}
        className={cx(styles.RootContainer, disabled && styles.disabled)}
      >
        <div className={styles.InnerContainer}>
          <input
            ref={inputRef}
            type={isValueVisible ? 'text' : 'password'}
            id={id}
            className={cx(styles.Input, type === 'password' && styles.password)}
            disabled={disabled}
            {...other}
          />

          {typeof label === 'string' && (
            <label
              className={cx(
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
              type='button'
              className={styles.EyeButton}
              onMouseDown={onMouseDownEyeButton}
              onKeyDown={onKeyDownEyeButton}
              disabled={disabled}
            >
              {eyeIcon}
            </button>
          )}
        </div>

        {typeof errorText === 'string' && (
          <div className={styles.ErrorMessage}>{errorText}</div>
        )}
      </div>
    )
  },
)

export default Input
