import React from 'react'

import styles from 'src/pages/ErrorPage/ErrorPage.module.scss'

const ErrorPage: React.FC = () => {
  return (
    <main className={styles.Root}>
      <h1 className={styles.Header}>Error page</h1>

      <p>
        This page will be displayed when the synchronous code throws an error.
      </p>
      <p>Please reload the page.</p>
    </main>
  )
}

export default ErrorPage
