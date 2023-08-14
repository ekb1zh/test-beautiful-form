import React, { useEffect, useMemo } from 'react'

import AuthPage from 'src/pages/AuthPage'
import UserPage from 'src/pages/UserPage'
import {
  useGlobalContext,
  createDefaultValue,
  GlobalContextValue,
} from 'src/context'

const AppPage: React.FC = () => {
  const [{ token, user, page }, setContext] = useGlobalContext()

  const router = useMemo(() => {
    switch (page) {
      case 'auth':
        return <AuthPage />

      case 'user':
        return <UserPage />

      default:
        throw new Error(`Incorrect page: '${page}'`) // React will go to error page
    }
  }, [page])

  useEffect(() => {
    /*
      Token and user must both be exist or both be absent
    */
    if (token && user) {
      if (page !== 'user') {
        setContext((prev) => {
          const next: GlobalContextValue = JSON.parse(JSON.stringify(prev)) // better do it with lodash.cloneDeep
          next.page = 'user'

          return next
        })
      }
    } else if (!token && !user) {
      if (page !== 'auth') {
        setContext((prev) => {
          const next: GlobalContextValue = JSON.parse(JSON.stringify(prev)) // better do it with lodash.cloneDeep
          next.page = 'auth'

          return next
        })
      }
    } else {
      setContext(createDefaultValue())
    }
  }, [page, setContext, token, user])

  return router
}

export default AppPage
