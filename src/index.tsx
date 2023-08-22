import 'src/styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
// import reportWebVitals from './reportWebVitals'

import AppPage from 'src/pages/AppPage'
import ErrorPage from 'src/pages/ErrorPage'
import { GlobalProvider } from 'src/context'
import { applyGlobalErrorCatching, applyMocks } from 'src/settings'

applyGlobalErrorCatching()
applyMocks()

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <GlobalProvider>
        <AppPage />
      </GlobalProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
