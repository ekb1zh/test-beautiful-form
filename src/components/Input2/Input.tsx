import React from 'react'

import styles from 'src/components/Input2/Input.module.scss'

const INPUT_ID = 'input-id'

const Input: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.inputContainer}>
        <input className={styles.input} id={INPUT_ID} />
        <label className={styles.label} htmlFor={INPUT_ID}>
          label
        </label>
        <button type='button' className={styles.showPasBtn}>
          show pass
        </button>
      </div>
      <span className={styles.error}>Error text</span>
    </div>
  )
}

export default Input
