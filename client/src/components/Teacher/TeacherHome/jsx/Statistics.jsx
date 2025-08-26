import React from 'react'
import styles from '../css/Statistics.module.css'
import DonutChart from './DonutChart'

const Statistics = () => {
  return (
    <>
      <div className={styles['statistics-title-h4']} >
        <h4>Statistics</h4><hr />
      </div>
    <DonutChart />
    </>
  )
}

export default Statistics
