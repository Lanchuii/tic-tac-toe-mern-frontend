import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import './gameBoard.scss'
import playerModel from "../../models/playerModel";
import { VscDebugRestart } from "react-icons/vsc";
import { FaStop } from "react-icons/fa";

interface Props {
  firstPlayer: playerModel
  secondPlayer: playerModel
}

const GameBoard = ({ firstPlayer, secondPlayer }: Props) => {
  const [cellValue, setCellValue] = useState<string[]>(Array(9).fill(null));
  const [isX, setIsX] = useState<boolean>(true);
  const [currentPlayer, setCurrentPlayer] = useState<string>(firstPlayer.name);
  const [isRoundOver, setIsRoundOver] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const URL = import.meta.env.VITE_REACT_APP_API_URL

  // Handles user interaction with each square/cell
  const handleCell = async (i: number) => {

    // Disables interaction once a winner is decided
    if (calculateWinner(cellValue) || cellValue[i]) {
      return
    }

    // Allows player to interact with the cell but only if it's null
    if (cellValue[i] === null) {
      cellValue[i] = isX ? 'X' : 'O';
      setCellValue(cellValue);
      setIsX(!isX);
    }

    const winner = calculateWinner(cellValue)

    // Once a winner is decided, the round is over and the score is updated
    if (winner) {
      currentPlayer === firstPlayer.name ? firstPlayer.score++ : secondPlayer.score++
      setIsRoundOver(true)
    }
    else {

      // Set current player to be displayed
      if (isX) {
        setCurrentPlayer(secondPlayer.name);
      }
      else {
        setCurrentPlayer(firstPlayer.name);
      }
    }
  };

  // Determines winner based on winning patterns
  const calculateWinner = (cell: string[]) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];

      // if all the cells within the pattern are equal, then the game is decided
      if (cell[a] && cell[a] === cell[b] && cell[a] === cell[c]) {
        setIsRoundOver(true);
        return cell[a]
      }
    }
    return null
  };

  let overallWinner: string

  if (firstPlayer.score > secondPlayer.score) {
    overallWinner = firstPlayer.name
  }
  else if (firstPlayer.score === secondPlayer.score) {
    overallWinner = "Draw"
  }
  else {
    overallWinner = secondPlayer.name
  }

  // Resets the game
  const handleRematch = () => {
    setIsX(true);
    setIsRoundOver(false);
    setCellValue(Array(9).fill(null));
  }

  // decides overall winner upon pressing stop and saves the game
  const handleStop = async () => {

    const finishedData = {
      player1: firstPlayer.name,
      player2: secondPlayer.name,
      score1: firstPlayer.score,
      score2: secondPlayer.score,
      winner: overallWinner
    }
    setIsRoundOver(false);
    setIsGameOver(true);

    await axios.post(`${URL}/`, finishedData)
  }

  return (
    <div className="game-board-wrapper">
      {isGameOver ? (
        <div className="post-game-summary">
          <h1 className="post-game-result" style={{ color: overallWinner === firstPlayer.name ? '#519DD9' : '#DB0038' }}>{overallWinner !== "Draw" ? `${overallWinner} is the Winner!` : "It's a TIE!"}</h1>
          <p className="score">{firstPlayer.score} - {secondPlayer.score}</p>
        </div>
      ) : (
        <div>
          <div className="match-info">
            <div>
              <p className="turn-indicator" style={{ color: isX ? '#519DD9' : '#DB0038' }}>{isRoundOver ? `${currentPlayer} wins!` : `${currentPlayer}'s Turn!`}</p>
              <p className="score">{firstPlayer.score} - {secondPlayer.score}</p>
            </div>
            {isRoundOver ? (
              <div className="match-buttons">
                <motion.button className="rematch-btn" onClick={handleRematch} whileHover={{ scale: 1.1 }}><VscDebugRestart />Rematch</motion.button>
                <motion.button className="stop-btn" onClick={handleStop} whileHover={{ scale: 1.1 }}><FaStop />Stop</motion.button>
              </div>
            ) : ''}
          </div>
          <div className="game-board">
            <div className="board-row">
              <motion.div className="board-cell" style={{ color: cellValue[0] === 'X' ? '#519DD9' : '#DB0038' }} onClick={() => handleCell(0)} whileHover={{ scale: 1.1 }}>{cellValue[0]}</motion.div>
              <motion.div className="board-cell" style={{ color: cellValue[1] === 'X' ? '#519DD9' : '#DB0038' }} onClick={() => handleCell(1)} whileHover={{ scale: 1.1 }}>{cellValue[1]}</motion.div>
              <motion.div className="board-cell" style={{ color: cellValue[2] === 'X' ? '#519DD9' : '#DB0038' }} onClick={() => handleCell(2)} whileHover={{ scale: 1.1 }}>{cellValue[2]}</motion.div>
            </div>
            <div className="board-row">
              <motion.div className="board-cell" style={{ color: cellValue[3] === 'X' ? '#519DD9' : '#DB0038' }} onClick={() => handleCell(3)} whileHover={{ scale: 1.1 }}>{cellValue[3]}</motion.div>
              <motion.div className="board-cell" style={{ color: cellValue[4] === 'X' ? '#519DD9' : '#DB0038' }} onClick={() => handleCell(4)} whileHover={{ scale: 1.1 }}>{cellValue[4]}</motion.div>
              <motion.div className="board-cell" style={{ color: cellValue[5] === 'X' ? '#519DD9' : '#DB0038' }} onClick={() => handleCell(5)} whileHover={{ scale: 1.1 }}>{cellValue[5]}</motion.div>
            </div>
            <div className="board-row">
              <motion.div className="board-cell" style={{ color: cellValue[6] === 'X' ? '#519DD9' : '#DB0038' }} onClick={() => handleCell(6)} whileHover={{ scale: 1.1 }}>{cellValue[6]}</motion.div>
              <motion.div className="board-cell" style={{ color: cellValue[7] === 'X' ? '#519DD9' : '#DB0038' }} onClick={() => handleCell(7)} whileHover={{ scale: 1.1 }}>{cellValue[7]}</motion.div>
              <motion.div className="board-cell" style={{ color: cellValue[8] === 'X' ? '#519DD9' : '#DB0038' }} onClick={() => handleCell(8)} whileHover={{ scale: 1.1 }}>{cellValue[8]}</motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameBoard