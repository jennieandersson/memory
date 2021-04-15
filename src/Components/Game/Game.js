import React, { useState, useEffect } from 'react'
import styles from './Game.module.scss'
import Card from '../Card/Card'
import Finished from '../Finished/Finished'
import { Images } from '../Images/Images'

/* 
Klicka på en bild
Kolla om den har blivit vänd redan
Om det är första bilden, vänd bilden
Om det är andra bilden, vänd bilden och jämför den med första bilden
Matchar dem? Om ja, låt de ligga kvar
Om nej, vänd tillbaka
*/

const shuffleArray = (array) => {
  return array.sort(() => .5 - Math.random());
}

const generateCards = () => {    
  const cards = shuffleArray(Images)
    .flatMap(i => [i,i])
    .map((imageURL, index) => ({
      id: index,
      imageURL: imageURL,
      isFlipped: false,
      canFlip: true
    }))

  return shuffleArray(cards)
}

const Game = () => {

  const [cards, setCards] = useState(generateCards())
  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  const [flippedCount, setFlippedCount] = useState(0)
  const [score, setScore] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const finished = !cards.some(card => card.canFlip)

  const resetFirstAndSecondCards = () => {
    setFirstCard(null)
    setSecondCard(null)
  }

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
          setSeconds(seconds => seconds + 1)
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval);

  }, [isActive, seconds])

  useEffect(() => {
    if (finished) {
      setIsActive(false);
      const bestPossible = cards.length
      const pointsLost = seconds + flippedCount - bestPossible
      setScore(Math.floor(100 - pointsLost))
    }
  }, [
    finished, 
    flippedCount, 
    setIsActive, 
    seconds, 
    setScore, 
    score, 
    cards
  ])

  //Om firstCard eller secondCard ändras
  useEffect(() => {

    const onSuccessGuess = () => {

      const firstCardID = firstCard.id;
      const secondCardID = secondCard.id;
      setCardCanFlip(firstCardID, false);
      setCardCanFlip(secondCardID, false);

      resetFirstAndSecondCards()
    }
  
    const onFailureGuess = () => {
      const firstCardID = firstCard.id;
      const secondCardID = secondCard.id;

      setTimeout(() => {
        setCardIsFlipped(firstCardID, false);
      }, 1000);
      setTimeout(() => {
        setCardIsFlipped(secondCardID, false);
      }, 1200);

      resetFirstAndSecondCards()
    }

    if (!firstCard || !secondCard) {
      return
    }
    (firstCard.imageURL === secondCard.imageURL) ? onSuccessGuess() : onFailureGuess()
  }, [firstCard, secondCard])

  const setCardIsFlipped = (cardID, isFlipped) => {
  setCards(prev => prev.map(c => {
    if (c.id !== cardID)
      return c;
    return {...c, isFlipped}
  }))
  }
  
  const setCardCanFlip = (cardID, canFlip) => {
  setCards(prev => prev.map(c => {
    if (c.id !== cardID)
      return c;
    return {...c, canFlip}
  }))
}

  const handleOnClick = (card) => {
    if (!card.canFlip) {
      return
    }

    // Returnera ifall användaren klickar två gånger på samma kort
    // eslint-disable-next-line no-mixed-operators
    if (firstCard && (card.id === firstCard.id) || secondCard && (card.id === firstCard.id)) {
      return
    }
    if (secondCard) return

    setFlippedCount(flippedCount + 1);
    setCardIsFlipped(card.id, true);
    
    (firstCard) ? setSecondCard(card) : setFirstCard(card)
    if (flippedCount === 0) {
      setIsActive(true)
    }
  }

  const handleResetGame = () => {
    setCards(generateCards())
    setFlippedCount(0)
    setSeconds(0)
    setScore(0)
  }

  return (
    <>
      {finished
        ? <Finished score={score} resetGame={handleResetGame} />
        : (
          <div className={styles.game}>
            {cards.map(card => <Card key={card.id} onClick={() => handleOnClick(card)} {...card}/>)}
          </div>
        )
      }
    </>
  )
}

export default Game