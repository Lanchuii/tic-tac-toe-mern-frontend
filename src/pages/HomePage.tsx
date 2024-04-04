import { Link } from "react-router-dom"
import { motion } from "framer-motion";
import './homePage.scss'
import MatchHistory from "../components/MatchHistory/MatchHistory"
import Title from "../components/Title/Title";
import { FaArrowDown } from "react-icons/fa";

const HomePage = () => {
  return (
    <>
      <section>
        <motion.div className="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <div className="wrapper">
            <Title />
            <Link to={'/game'}><motion.button className="play" whileHover={{ scale: 1.1 }}>Let's Play!</motion.button></Link>
            <div className="history-info">
              <FaArrowDown />
              <p>match history</p>
            </div>
          </div>
        </motion.div>
      </section>
      <section>
        <MatchHistory />
      </section>
    </>
  )
}

export default HomePage