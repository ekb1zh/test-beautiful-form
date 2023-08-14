import React, { useState } from 'react'

import Button from 'src/components/Button'
import LinkButton from 'src/components/LinkButton'

import { GlobalContextValue, useGlobalContext } from 'src/context'
import { signOut, ping } from 'src/api'

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

      setContext((prev) => {
        const next: GlobalContextValue = JSON.parse(JSON.stringify(prev)) // better do it with lodash.cloneDeep
        delete next.token
        delete next.user

        return next
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
      if (error || typeof pong !== 'string') {
        throw new Error(error)
      }

      setPongMessage(pong)
    } catch (error) {
      console.error(error)
    } finally {
      setIsPingLoading(false)
    }
  }

  return (
    <div>
      <div>
        Email: <strong>{user?.email}</strong>
        <br />
        Password: <strong>{user?.password}</strong>
        <br />
        Token: <strong>{token}</strong>
        <br />
        {typeof pongMessage === 'string' && (
          <span>
            Pong message: <strong>{pongMessage}</strong>
          </span>
        )}
      </div>
      <div>
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
