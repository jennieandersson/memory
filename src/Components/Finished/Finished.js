import React, { useState, useEffect } from 'react'
import Wrapper from '../Layout/Wrapper/Wrapper'
import HighscoreList from '../HighscoreList/HighscoreList'
import Modal from '../Modal/Modal'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import * as Firebase from '../../services/firebase'

import styles from './Finished.module.scss'

const Finished = ({ score, resetGame }) => { 
  const [ error, setError ] = useState()
  const [highscoreList, setHighscoreList] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(true)

  // onLoad:
  // - get data from firestore
  // - save in state
  // - use state to print list
  // onSave:
  // - save new name to firestore
  // - add new name to state with classname
  // - update component 

    // Do on page load
    useEffect(() => {
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
        setHighscoreList(data)
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => setError('highscore-list-get-fail'))
 
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const player = document.playerForm.name.value
    setError(null)
    
    if (!player) {
      setError('name-required')
      return
  }
  
  Firebase.saveHighscore(player, score)
  const list = [...highscoreList, {player, score, newItem: true}]
    .sort((a, b) => b.score - a.score)

  list.splice(10)

  setHighscoreList(list)
  handleModal()
  }

  const handleModal = () => {
    setIsModalVisible(!isModalVisible)
    document.querySelector('html').classList.toggle('scroll-lock')
    setError(null)
  }

  return (
    <Wrapper>
      <button onClick={handleModal}>open modal</button>
      {isModalVisible && (
        <Modal onModalClose={handleModal}>
          <h2>Congrats!</h2>
          <p>Your score is {score}</p>
          <form className={styles.inputWrapper} name="playerForm">
            <label htmlFor="name">Enter your name to save your score:</label>
            <input type="text" name="name" id="name" placeholder="Name" autoFocus />
            <button type="submit" onClick={handleSubmit}>Save</button>
            <button onClick={handleModal}>Cancel</button>
          </form>
          <ErrorMessage errorCode={error}></ErrorMessage>
        </Modal>
      )}
      { highscoreList.length > 0 && <HighscoreList list={highscoreList} /> }
      <div>
        <h3>Do you want to play again?</h3>
        <button onClick={resetGame} className={styles.button}>YES</button>
      </div>
    </Wrapper>
  )
}
  
export default Finished