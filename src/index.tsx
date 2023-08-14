import React from 'react'
import ReactDOM from 'react-dom/client'
// import reportWebVitals from './reportWebVitals'

import { GlobalProvider } from 'src/context'
import AppPage from 'src/pages/AppPage'
import 'src/styles/index.scss'
import 'src/settings'
import 'src/_mocks'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <GlobalProvider>
      <AppPage />
    </GlobalProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
