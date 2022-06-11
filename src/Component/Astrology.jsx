import React from 'react'
import styles from "./Styles.module.css"

export const Astrology = ({name, sign, data}) => {
  return (
    <div>
        <div className={styles.dataWrapper}>
            <h3>Name: </h3>
            <h3>{name}</h3>
        </div>
        <div className={styles.dataWrapper}>
            <h3>Current Date: </h3>
            <h3>{data.current_date}</h3>
        </div>
        <div className={styles.dataWrapper}>
            <h3>Date-Range: </h3>
            <h3>{data.date_range}</h3>
        </div>
        <div className={styles.dataWrapper}>
            <h3>Horoscope Sign: </h3>
            <h3>{sign}</h3>
        </div>
        <div className={styles.dataWrapper}>
            <h3>Description: </h3>
            <h3>{data.description}</h3>
        </div>
    </div>
  )
}
