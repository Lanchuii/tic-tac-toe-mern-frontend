import { useState } from 'react'
import GameBoard from '../components/GameBoard/GameBoard'
import './game.scss'
import EnterUser from '../components/EnterUser/EnterUser'
import { Link } from 'react-router-dom'

const Game = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [firstPlayer, setFirstPlayer] = useState<string>('')
  const [secondPlayer, setSecondPlayer] = useState<string>('')

  const handlePage = (currentPage: number) => {
    if (currentPage === 0) {
      setCurrentPage(currentPage + 1)
    }
    else if (currentPage === 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div>
      <h1>Game</h1>
      {currentPage === 0 ? <EnterUser setPlayer={setFirstPlayer} handlePage={handlePage} currentPage={currentPage} /> : ''}
      {currentPage === 1 ? <EnterUser setPlayer={setSecondPlayer} handlePage={handlePage} currentPage={currentPage} /> : ''}
      {currentPage === 2 ? <GameBoard firstPlayer={firstPlayer} secondPlayer={secondPlayer} /> : ''}
      <button><Link to='/'>return home</Link></button>
    </div>
  )
}

export default Game