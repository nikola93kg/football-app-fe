import React from "react";
import playerNotFound from "../../assets/playerNotFound.svg";
import { useDispatch } from "react-redux";
import "../../styles/player/PlayerNotFound.css";
import { fetchPlayers, resetSearch } from "../../redux/actions/playerActions";

function PlayerNotFound({ onReset }) {
  const dispatch = useDispatch();

  const handleResetSearch = () => {
    dispatch(resetSearch()); 
    dispatch(fetchPlayers());
    if (onReset) onReset();
  }

  return (
    <div className="player-not-found-container">
      <h2>Player not found, try again</h2>
      <img src={playerNotFound} alt="Player not found!" />
      <button className="submit-btn" onClick={handleResetSearch}>Try Again</button>
    </div>
  );
}

export default PlayerNotFound;
