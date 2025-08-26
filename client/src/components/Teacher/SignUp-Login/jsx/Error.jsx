import React from 'react'
import styles from '../css/Error.module.css'

const Error = ({error}) => {
  return (
    <div>
      <p className={styles.error}>{error}</p>
    </div>
  )
}

export default Error
