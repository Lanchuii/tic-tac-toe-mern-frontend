import { useState } from "react";

interface Props {
  firstPlayer: string
  secondPlayer: string
}

const GameBoard = ({ firstPlayer, secondPlayer }: Props) => {
  const [cellValue, setCellValue] = useState<string[]>(Array(9).fill(null));
  const [isX, setIsX] = useState<boolean>(true);
  const [currentPlayer, setCurrentPlayer] = useState<string>(firstPlayer);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const handleCell = (i: number) => {
    if (calculateWinner(cellValue) || cellValue[i]) {
      return
    }

    if (cellValue[i] === null) {
      cellValue[i] = isX ? 'X' : 'O';
      setCellValue(cellValue);
      setIsX(!isX);
    }

    const winner = calculateWinner(cellValue)

    if (winner) {
      setIsGameOver(true)
    }
    else {
      if (isX) {
        setCurrentPlayer(secondPlayer);
      }
      else {
        setCurrentPlayer(firstPlayer);
      }
    }
  };

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

      if (cell[a] && cell[a] === cell[b] && cell[a] === cell[c]) {
        setIsGameOver(true);
        return cell[a]
      }

    }
    return null
  };

  return (
    <div>
      <div className="game-board">
        <div className="board-row">
          <div className='board-cell' onClick={() => handleCell(0)}>{cellValue[0]}</div>
          <div className='board-cell' onClick={() => handleCell(1)}>{cellValue[1]}</div>
          <div className='board-cell' onClick={() => handleCell(2)}>{cellValue[2]}</div>
        </div>
        <div className="board-row">
          <div className='board-cell' onClick={() => handleCell(3)}>{cellValue[3]}</div>
          <div className='board-cell' onClick={() => handleCell(4)}>{cellValue[4]}</div>
          <div className='board-cell' onClick={() => handleCell(5)}>{cellValue[5]}</div>
        </div>
        <div className="board-row">
          <div className='board-cell' onClick={() => handleCell(6)}>{cellValue[6]}</div>
          <div className='board-cell' onClick={() => handleCell(7)}>{cellValue[7]}</div>
          <div className='board-cell' onClick={() => handleCell(8)}>{cellValue[8]}</div>
        </div>
      </div>
      {isGameOver ? <p>{currentPlayer} wins!</p> : <p>{currentPlayer}'s Turn!</p>}
    </div>
  )
}

export default GameBoard