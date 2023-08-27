import React, { useEffect, useMemo } from 'react'

import AuthPage from 'src/pages/AuthPage'
import UserPage from 'src/pages/UserPage'
import Main from 'src/components/Main/Main'
import { useGlobalContext, createDefaultValue } from 'src/context'

const AppPage: React.FC = () => {
  const [{ token, user, page }, setContext] = useGlobalContext()

  const router = useMemo(() => {
    switch (page) {
      case 'user':
        return <UserPage />

      case 'auth':
      default:
        return <AuthPage />
    }
  }, [page])

  useEffect(() => {
    /*
      Token and user must both be exist or both be absent
    */
    if (token && user) {
      if (page !== 'user') {
        setContext((draft) => {
          draft.page = 'user'
        })
      }
    } else if (!token && !user) {
      if (page !== 'auth') {
        setContext((draft) => {
          draft.page = 'auth'
        })
      }
    } else {
      setContext(createDefaultValue())
    }
  }, [page, setContext, token, user])

  return <Main>{router}</Main>
}

export default AppPage
