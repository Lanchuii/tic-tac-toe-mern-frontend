import { useState } from "react"
import { motion } from "framer-motion"
import playerModel from "../../models/playerModel"
import './enterUser.scss'

interface Props {
  setPlayer: React.Dispatch<React.SetStateAction<playerModel>>
  handlePage: (currentPage: number) => void
  currentPage: number
}

const EnterUser = ({ setPlayer, handlePage, currentPage }: Props) => {
  const [playerName, setPlayerName] = useState<playerModel>({
    name: '',
    score: 0
  })

  const handleName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setPlayer(playerName)
    handlePage(currentPage)
  }

  return (
    <div className="enter-user">
      <div className="name-container">
        <div className="player">{currentPage === 0 ? 'Player 1' : 'Player 2'}</div>
        <div className="symbol" style={{ color: currentPage === 0 ? '#519DD9' : '#DB0038' }}><span>symbol: </span>{currentPage === 0 ? 'X' : 'O'}</div>
      </div>
      <form onSubmit={handleName}>
        <input
          type="text"
          placeholder="max. 12 characters"
          onChange={(event) => {
            if (event.target) {
              setPlayerName({ ...playerName, name: event.target.value });
            }
          }}
        />
        <motion.button type="submit" disabled={playerName.name.length > 12 || playerName.name === ''} whileHover={{ scale: 1.1 }}>Enter</motion.button>
      </form>
    </div>
  )
}

export default EnterUser