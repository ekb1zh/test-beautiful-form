import React, { useEffect, useMemo } from 'react'
import cloneDeep from 'lodash.clonedeep'

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
        setContext((prev) => {
          const next = cloneDeep(prev)
          next.page = 'user'

          return next
        })
      }
    } else if (!token && !user) {
      if (page !== 'auth') {
        setContext((prev) => {
          const next = cloneDeep(prev)
          next.page = 'auth'

          return next
        })
      }
    } else {
      setContext(createDefaultValue())
    }
  }, [page, setContext, token, user])

  return <Main>{router}</Main>
}

export default AppPage
