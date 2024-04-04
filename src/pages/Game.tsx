import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from "framer-motion"
import GameBoard from '../components/GameBoard/GameBoard'
import EnterUser from '../components/EnterUser/EnterUser'
import Title from '../components/Title/Title'
import playerModel from '../models/playerModel';
import { FaArrowLeft } from "react-icons/fa";
import './game.scss'

const Game = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [firstPlayer, setFirstPlayer] = useState<playerModel>({ name: '', score: 0 })
  const [secondPlayer, setSecondPlayer] = useState<playerModel>({ name: '', score: 0 })

  const handlePage = (currentPage: number) => {
    if (currentPage === 0) {
      setCurrentPage(currentPage + 1)
    }
    else if (currentPage === 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <motion.div className='game' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className='game-wrapper'>
        <Title />
        {currentPage === 0 ? <EnterUser setPlayer={setFirstPlayer} handlePage={handlePage} currentPage={currentPage} /> : ''}
        {currentPage === 1 ? <EnterUser setPlayer={setSecondPlayer} handlePage={handlePage} currentPage={currentPage} /> : ''}
        {currentPage === 2 ? <GameBoard firstPlayer={firstPlayer} secondPlayer={secondPlayer} /> : ''}
        <Link className="link" to='/'>
          <motion.div className='home-btn' whileHover={{ scale: 1.1 }}><FaArrowLeft />return home</motion.div>
        </Link>
      </div>
    </motion.div>
  )
}

export default Game