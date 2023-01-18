import React from 'react'
import cn from 'classnames'
import styles from './HighscoreList.module.scss'

const HighscoreList = (list) => (
  <div className={styles.wrapper}>
    <h2>High Score</h2>
    <List highscoreList={list.list} />
  </div>
)

const List = ({ highscoreList }) => {
  return (
    <ul className={styles.list}>
      {highscoreList.map((highscore, index) => {
        console.log(highscore)
        return (
          <ListItem
            key={`${index}-${highscore.score}`}
            player={highscore.player}
            score={highscore.score}
            newItem={highscore.newItem}
            index={index}
          />
        )
      })}
    </ul>
  )
}

const ListItem = ({ player, score, index, newItem }) => {
  return (
    <li className={cn(styles.item, { [styles.newItem]: !!newItem })}>
      <span className={styles.place}>{index + 1}</span>
      <span className={styles.player}>{player}</span>
      <span className={styles.score}>{score}</span>
    </li>
  )
}

export default HighscoreList
