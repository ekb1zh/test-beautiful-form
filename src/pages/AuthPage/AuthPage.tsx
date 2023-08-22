import React, { useEffect, useState } from 'react'

/* 
  SignInForm and SignUpForm potentially can be absolutely different,
  that's why they was created separated.
*/
import SignInForm from 'src/pages/AuthPage/forms/SignInForm'
import SignUpForm from 'src/pages/AuthPage/forms/SignUpForm'
import LinkButton from 'src/components/LinkButton'
import styles from 'src/pages/AuthPage/AuthPage.module.scss'

const AuthPage: React.FC = () => {
  const [isSignInMode, setIsSignInMode] = useState(true) // sign-in or sign-up mode

  const onClick = () => {
    setIsSignInMode((prev) => !prev)
  }

  useEffect(() => {
    document.title = 'Auth'
  }, [])

  return (
    <div className={styles.Root}>
      {isSignInMode ? <SignInForm /> : <SignUpForm />}

      <LinkButton onClick={onClick}>
        {isSignInMode ? 'Sign Up' : 'Sign In'}
      </LinkButton>
    </div>
  )
}

export default AuthPage
