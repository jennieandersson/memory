import React from 'react'
import cn from 'classnames'
import styles from './Card.module.scss'

const Card = ({ imageURL, isFlipped, onClick }) => { 

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={cn(styles.content, 
          {
            [styles.flipped]: !!isFlipped
          })}>
        <div className={styles.back} />
        <img 
          src={imageURL} 
          alt="memory" 
          className={styles.front}
        />
      </div>
    </div>
  )
}

export default Card