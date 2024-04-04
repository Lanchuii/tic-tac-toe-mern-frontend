import { useEffect, useState } from "react";
import axios from 'axios';
import gameData from "../../models/GameDataModel";
import './matchHistory.scss'
import { FaTrashAlt } from "react-icons/fa";

const MatchHistory = () => {
  const [loading, setLoading] = useState(false);
  const [gameData, setGameData] = useState<gameData[]>([])

  const URL = import.meta.env.VITE_REACT_APP_API_URL

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${URL}/`)
      .then(res => {
        setGameData(res.data);
        setLoading(false)
      })
      .catch(error => {
        console.log(error);
        setLoading(false)
      });
  }, []);

  const handleDelete = async (id: string) => {
    axios
      .delete(`${URL}/${id}`)
      .then(() => {
        setGameData((prevData) =>
          prevData.filter((gameData) => gameData._id !== id)
        );
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="match-history">
      <h1>Match History</h1>
      {loading ? '' :
        <div className="wrapper">
          {gameData.length === 0 ? (
            <div>Play some games first!</div>
          ) : (
            <>
              {gameData.map((data, i) => (
                <div key={i} className="game-summary">
                  <div className="result-data-left">
                    <div className="result-title">
                      <p className="player1">{data.player1}</p>
                      <p className="vs">vs</p>
                      <p className="player2">{data.player2}</p>
                    </div>
                    <p>Winner: <span>{data.winner}</span></p>
                  </div>
                  <div className="result-data-right">
                    <p className="score">{data.score1} - {data.score2}</p>
                    <button onClick={() => handleDelete(data._id)}><FaTrashAlt /></button>
                  </div>
                </div>
              ))}
            </>
          )}

        </div>
      }
    </div>
  )
}

export default MatchHistory