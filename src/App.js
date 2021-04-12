import React from 'react'
import './App.css'
import './styles/global.scss'
import Game from './Components/Game/Game'
import Wrapper from './Components/Layout/Wrapper/Wrapper'

function App() {
  return (
    <>
      <Wrapper element='header'>
        <h1>Memory Game</h1>
      </Wrapper>
      <main>
        <Game />
      </main>
    </>
  );
}

export default App
