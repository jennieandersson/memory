import React from 'react'
import styles from './Wrapper.module.scss'

const wrapper = ({element = 'div', children}) => {
  const Elem = element
  return (
    <Elem className={styles.wrapper}>
      {children}
    </Elem>
  )
}

export default wrapper
