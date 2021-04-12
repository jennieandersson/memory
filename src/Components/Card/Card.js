import React from 'react'
import cn from 'classnames'
import styles from './Card.module.scss'

const Card = ({ imageURL, isFlipped, onClick }) => { 

  return (
    <div className={styles.container}>
      <img 
        src={imageURL} 
        alt="memory" 
        className={styles.card}
        onClick={onClick}
      />
      <div className={cn({[styles.flipped]: !isFlipped, [styles.notFlipped]: !!isFlipped})} />
    </div>
  )
}

export default Card