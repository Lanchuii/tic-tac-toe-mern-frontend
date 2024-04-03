import { useState } from "react"

interface Props {
  setPlayer: React.Dispatch<React.SetStateAction<string>>
  handlePage: (currentPage: number) => void
  currentPage: number
}

const EnterUser = ({ setPlayer, handlePage, currentPage }: Props) => {
  const handleName = () => {
    setPlayer(playerName)
    handlePage(currentPage)
  }

  const [playerName, setPlayerName] = useState('')

  return (
    <div>
      {currentPage === 0 ? (
        <div>Player 1 - X</div>
      ) : (
        <div>Player 2 - O</div>
      )}
      <form>
        <label htmlFor="">Enter name:</label>
        <input
          type="text"
          onChange={(event) => {
            if (event.target) {
              setPlayerName(event.target.value);
            }
          }}
        />
      </form>
      <button type="button" onClick={handleName}>Enter</button>
    </div>
  )
}

export default EnterUser