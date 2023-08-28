import React, { useMemo } from 'react'

import AuthPage from 'src/pages/AuthPage'
import UserPage from 'src/pages/UserPage'
import Main from 'src/components/Main/Main'
import { useGlobalContext } from 'src/context'

const AppPage: React.FC = () => {
  const [{ page }] = useGlobalContext()

  const router = useMemo(() => {
    switch (page) {
      case 'user':
        return <UserPage />

      case 'auth':
      default:
        return <AuthPage />
    }
  }, [page])

  return <Main>{router}</Main>
}

export default AppPage
