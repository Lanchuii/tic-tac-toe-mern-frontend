import { Link } from "react-router-dom"
import MatchHistory from "../components/MatchHistory/MatchHistory"

const HomePage = () => {
  return (
    <div>
      <h1>TIC TAC TOE</h1>
      <Link to={'/game'}>Let's Play!</Link>
      <MatchHistory />
    </div>
  )
}

export default HomePage