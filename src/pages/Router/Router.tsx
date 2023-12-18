import React, { useMemo } from 'react'

import AuthPage from 'src/pages/AuthPage'
import UserPage from 'src/pages/UserPage'
import Layout from 'src/components/Layout'
import { useGlobalContext } from 'src/contexts/global'

const Router: React.FC = () => {
  const [{ page }] = useGlobalContext()

  const router = useMemo(() => {
    switch (page) {
      case 'user':
        return (
          <Layout>
            <UserPage />
          </Layout>
        )

      case 'auth':
      default:
        return (
          <Layout>
            <AuthPage />
          </Layout>
        )
    }
  }, [page])

  return router
}

export default Router
