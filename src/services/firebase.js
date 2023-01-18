import firebase from 'firebase'
import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
} else {
  firebase.app() // if already initialized, use that one
}

export const db = app.firestore()

export const saveHighscore = (player, score) => {
  db.collection('highscoreList').doc().set({
    player: player,
    score: score,
  })
}

export const getHighscore = () => {
  return db.collection('highscoreList').orderBy('score', 'desc').limit(10).get()
}

/* export const streamHighscoreList = (observer) => {
  return db.collection('highscoreList')
      .orderBy('score', 'desc')
      .limit(10)
      .onSnapshot(observer)
}; */
