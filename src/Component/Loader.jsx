import React from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from "./Styles.module.css"

export const Loader = () => {
  return (
    <div style={{width: "100%", margin: "100px 0px ", textAlign: "center"}}>
        <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
    </div>
  )
}
