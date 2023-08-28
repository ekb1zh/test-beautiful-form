import React, { useEffect, useMemo, useState } from 'react'

import Button from 'src/components/Button'
import LinkButton from 'src/components/LinkButton'

import { useGlobalContext } from 'src/context'
import { signOut, ping, Schema } from 'src/api'
import styles from 'src/pages/UserPage/UserPage.module.scss'

const UserPage: React.FC = () => {
  const [context, setContext] = useGlobalContext()

  const [pingState, setPingState] = useState<Schema.Api.Ping.State>({
    status: 'idle',
  })
  const [signOutState, setSignOutState] = useState<Schema.Api.SignOut.State>({
    status: 'idle',
  })
  const [pongMessage, setPongMessage] = useState<string>()

  const onClickPingButton = async () => {
    try {
      if (context.page !== 'user') {
        setContext({ page: 'auth' })
        throw new Error(`Unexpected page: ${context.page}`)
      }

      setPingState({ status: 'loading' })
      const response = await ping(context.token)
      setPingState(response)

      if (response.status === 'success') {
        setPongMessage(response.pong)
      }
    } catch (error) {
      setPingState({
        status: 'error',
        message: error instanceof Error ? error.message : String(error),
      })

      console.error(error)
    }
  }

  const onClickSignOutButton = async () => {
    try {
      if (context.page !== 'user') {
        setContext({ page: 'auth' })
        throw new Error(`Unexpected page: ${context.page}`)
      }

      setSignOutState({ status: 'loading' })
      const response = await signOut(context.token)
      setSignOutState(response)

      if (response.status === 'success') {
        setContext({ page: 'auth' })
      }
    } catch (error) {
      setSignOutState({
        status: 'error',
        message: error instanceof Error ? error.message : String(error),
      })

      console.error(error)
    }
  }

  const infoItems = useMemo(() => {
    if (context.page === 'user') {
      const {
        user: { email, password },
        token,
      } = context

      const items = [
        ['Email', email],
        ['Password', password],
        ['Token', token],
      ]

      if (typeof pongMessage === 'string') {
        items.push(['Pong message', pongMessage])
      }

      return items
    } else {
      return []
    }
  }, [context, pongMessage])

  useEffect(() => {
    document.title = 'User'
  }, [])

  return (
    <div className={styles.Root}>
      <h1 className={styles.Header}>User</h1>

      <ul className={styles.List}>
        {infoItems.map(([key, value]) => (
          <li key={key}>
            {key}: <strong>{value}</strong>
          </li>
        ))}
      </ul>

      <div className={styles.Footer}>
        <Button
          onClick={onClickPingButton}
          loading={pingState.status === 'loading'}
          disabled={signOutState.status === 'loading'}
        >
          Ping
        </Button>

        <LinkButton
          onClick={onClickSignOutButton}
          disabled={
            pingState.status === 'loading' || signOutState.status === 'loading'
          }
        >
          Sign out
        </LinkButton>
      </div>
    </div>
  )
}

export default UserPage
