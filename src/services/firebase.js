import firebase from 'firebase'
import app from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
  apiKey: "AIzaSyCZizTJ-SFWG2WOdk6HnMKehrf6ilTJiDU",
  authDomain: "memory-52471.firebaseapp.com",
  projectId: "memory-52471",
  storageBucket: "memory-52471.appspot.com",
  messagingSenderId: "712411416174",
  appId: "1:712411416174:web:c90b4c9205bddddba8487f",
  measurementId: "G-3TGHN2QJL8"
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
    score: score
  })
}

export const getHighscore = () => {
  return db.collection('highscoreList')
    .orderBy('score', 'desc')
    .limit(10)
    .get()
}

/* export const streamHighscoreList = (observer) => {
  return db.collection('highscoreList')
      .orderBy('score', 'desc')
      .limit(10)
      .onSnapshot(observer)
}; */