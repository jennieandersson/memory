import React, { useState, useEffect } from 'react'
import Wrapper from '../Layout/Wrapper/Wrapper'
import HighscoreList from '../HighscoreList/HighscoreList'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import * as Firebase from '../../services/firebase'

import styles from './Finished.module.scss'

const Finished = ({ highScore, score, resetGame }) => { 
  const [ error, setError ] = useState()
  const [highscoreList, sethighscoreList] = useState([])

  // onLoad:
  // - get data from firestore
  // - save in state
  // - use state to print list
  // onSave:
  // - save new name to firestore
  // - add new name to state with classname
  // - update component 

  score = 120

  /* useEffect(() => {
    console.log('GET')
      Firebase.getHighscore()
      .then((snapshot) => {
        let data = []
        snapshot.forEach((doc) => {
          return (
            data.push({
              uid: doc.id,
              ...doc.data()
            })
          )
        })
        sethighscoreList(data)
      })
      .catch((err) => setError('grocery-list-get-fail'))
    },[]) */

    useEffect(() => {
      console.log('STREAM')
      const unsubscribe = Firebase.streamHighscoreList({
          next: querySnapshot => {
              const updatedGroceryItems = querySnapshot.docs.map(docSnapshot => docSnapshot.data())
              let data = []
              let newItem = false
              querySnapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                  newItem = true
                }
                return (
                  data.push({
                    newItem: newItem,
                    ...change.doc.data()
                  })
                )
              })
              console.log(updatedGroceryItems)
              console.log('*****')
              console.log(data)
              sethighscoreList(updatedGroceryItems)
          },
          error: () => setError('grocery-list-item-get-fail')
      })
      return unsubscribe;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const player = document.playerForm.name.value
    setError(null)
    
    if (!player) {
      setError('user-name-required')
    }

    Firebase.saveHighscore(player, score)
  }

    return (
      <Wrapper>
        <h2>Congrats!</h2>
        <p>Your score is {score}</p>
        {highScore > score 
          ? <p>You can do better!</p>
          : <p>You beat your high score!</p>
        }
        <form className={styles.inputWrapper} name="playerForm">
          <label htmlFor="name">Enter your name to save your score:</label>
          <input type="text" name="name" id="name" placeholder="Name" />
          <button type="submit" onClick={handleSubmit}>Save</button>
        </form>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <p>Do you want to play again?</p>
        <button onClick={resetGame} className={styles.button}>YES</button>
        <HighscoreList list={highscoreList} />
      </Wrapper>
    )
  }
  
  export default Finished