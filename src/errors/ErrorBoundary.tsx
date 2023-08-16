/*
  https://reactjs.org/docs/error-boundaries.html
*/
import React from 'react'
import ErrorPage from 'src/pages/ErrorPage'

interface State {
  hasError: boolean
}

export interface Props extends React.PropsWithChildren {}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo)
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    return hasError ? <ErrorPage /> : <>{children}</>
  }
}
