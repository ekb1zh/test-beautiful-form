import React, { useEffect, useMemo } from 'react'

import Button from 'src/components/Button'
import LinkButton from 'src/components/LinkButton'

import { useGlobalContext } from 'src/contexts/global'
import { useSignOut, usePing } from 'src/api/front'
import styles from 'src/pages/UserPage/UserPage.module.scss'

const UserPage: React.FC = () => {
  const [context, setContext] = useGlobalContext()

  if (context.page !== 'user') {
    throw new Error(`Unexpected page: ${context.page}`)
  }

  const { mutateAsync: signOut, isPending: isSignOutLoading } = useSignOut()

  const {
    data,
    refetch: ping,
    isFetching: isPingLoading,
  } = usePing(context.token)

  const onClickPingButton = async () => {
    try {
      await ping()
    } catch (error) {
      console.error(error)
    }
  }

  const onClickSignOutButton = async () => {
    try {
      await signOut(context.token)
      setContext({ page: 'auth' })
    } catch (error) {
      console.error(error)
    }
  }

  const infoItems = useMemo(() => {
    const { token } = context
    const items = [['Token', token]]

    if (typeof data?.pong === 'string') {
      items.push(['Pong message', data.pong])
    }

    return items
  }, [context, data])

  useEffect(() => {
    document.title = 'User'
  }, [])

  return (
    <div className={styles.Root}>
      <h1 className={styles.Header}>User</h1>

      <ul className={styles.List}>
        {infoItems.map(([key, value]) => (
          <li key={key}>
            {key}: <strong title={value}>{value}</strong>
          </li>
        ))}
      </ul>

      <div className={styles.Footer}>
        <Button onClick={onClickPingButton} loading={isPingLoading}>
          Ping
        </Button>

        <LinkButton onClick={onClickSignOutButton} disabled={isSignOutLoading}>
          Sign out
        </LinkButton>
      </div>
    </div>
  )
}

export default UserPage
