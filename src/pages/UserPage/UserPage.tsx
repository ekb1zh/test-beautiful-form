import React, { useEffect, useMemo, useState } from 'react'

import Button from 'src/components/Button'
import LinkButton from 'src/components/LinkButton'

import { useGlobalContext } from 'src/context'
import { signOut, ping } from 'src/api'
import styles from 'src/pages/UserPage/UserPage.module.scss'

const UserPage: React.FC = () => {
  const [{ user, token }, setContext] = useGlobalContext()
  const [pongMessage, setPongMessage] = useState<string | null>(null)
  const [isSignOutLoading, setIsSignOutLoading] = useState(false)
  const [isPingLoading, setIsPingLoading] = useState(false)

  const onClickSignOutButton = async () => {
    setIsSignOutLoading(true)

    try {
      const { error } = await signOut(token!)
      if (error) {
        throw new Error(error)
      }

      setContext((draft) => {
        delete draft.token
        delete draft.user
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsSignOutLoading(false)
    }
  }

  const onClickPingButton = async () => {
    setIsPingLoading(true)

    try {
      const { pong, error } = await ping(token!)
      if (error) {
        throw new Error(error)
      }

      setPongMessage(pong!)
    } catch (error) {
      console.error(error)
    } finally {
      setIsPingLoading(false)
    }
  }

  const infoItems = useMemo(() => {
    const items = [
      ['Email', user?.email],
      ['Password', user?.password],
      ['Token', token],
    ]

    if (typeof pongMessage === 'string') {
      items.push(['Pong message', pongMessage])
    }

    return items
  }, [pongMessage, token, user?.email, user?.password])

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
          loading={isPingLoading}
          disabled={isSignOutLoading}
        >
          Ping
        </Button>

        <LinkButton
          onClick={onClickSignOutButton}
          disabled={isPingLoading || isSignOutLoading}
        >
          Sign out
        </LinkButton>
      </div>
    </div>
  )
}

export default UserPage
