import React, { useState } from 'react'

import LinkButton from 'src/components/LinkButton'
import SignInForm from 'src/pages/AuthPage/SignInForm'
import SignUpForm from 'src/pages/AuthPage/SignUpForm'
import styles from 'src/pages/AuthPage/AuthPage.module.scss'

const AuthPage: React.FC = () => {
  const [isSignInMode, setIsSignInMode] = useState(true) // sign-in or sign-up mode

  const onClick = () => {
    setIsSignInMode((prev) => !prev)
  }

  return (
    <main className={styles.Main}>
      <div className={styles.Container}>
        <h1 className={styles.Header}>
          {isSignInMode ? 'Sign In' : 'Sign Up'}
        </h1>

        {isSignInMode ? <SignInForm /> : <SignUpForm />}

        <LinkButton onClick={onClick}>
          {isSignInMode ? 'Sign Up' : 'Sign In'}
        </LinkButton>
      </div>
    </main>
  )
}

export default AuthPage
