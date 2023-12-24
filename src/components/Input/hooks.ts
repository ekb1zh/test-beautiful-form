import React, { useEffect, useId, useRef, useState } from 'react'
import clsx from 'clsx'
import styles from 'src/components/Input/Input.module.scss'
import * as T from 'src/components/Input/types'

export const useLogic = (
  props: T.InputProps,
  rootRef: React.ForwardedRef<HTMLDivElement>,
) => {
  const { label, type, errorText, disabled, ...other } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const eyeButtonRef = useRef<HTMLButtonElement>(null)

  const [isValueVisible, setIsValueVisible] = useState(type !== 'password')
  const [isFocused, setIsFocused] = useState(false)
  const inputId = useId()

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

  const rootProps: React.JSX.IntrinsicElements['div'] = {
    className: clsx(styles.Root, disabled && styles.Root_disabled),
    ref: rootRef,
  }

  const containerProps: React.JSX.IntrinsicElements['div'] = {
    className: styles.Container,
  }

  const inputProps: React.JSX.IntrinsicElements['input'] = {
    className: clsx(styles.Input, type === 'password' && styles.Input_password),
    ref: inputRef,
    type: isValueVisible ? 'text' : 'password',
    id: inputId,
    disabled,
    ...other,
  }

  const labelProps: React.JSX.IntrinsicElements['label'] | null = label
    ? {
        className: clsx(
          styles.Label,
          isFocused
            ? styles.Label_small
            : isValueEmpty
            ? styles.Label_big
            : styles.Label_small,
        ),
        htmlFor: inputId,
        children: label,
      }
    : null

  const eyeButtonProps: React.JSX.IntrinsicElements['button'] | null =
    type === 'password'
      ? {
          className: styles.EyeButton,
          ref: eyeButtonRef,
          type: 'button',
          disabled,
        }
      : null

  const errorMessageProps: React.JSX.IntrinsicElements['div'] | null = errorText
    ? {
        className: styles.ErrorMessage,
        children: errorText,
      }
    : null

  return {
    rootProps,
    containerProps,
    inputProps,
    labelProps,
    eyeButtonProps,
    errorMessageProps,
    isValueVisible,
  }
}
