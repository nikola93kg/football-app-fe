import React from "react";
import playerNotFound from "../../assets/playerNotFound.svg";
import "../../styles/player/PlayerNotFound.css";
import { Link, useNavigate } from "react-router-dom";

function PlayerNotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/edit-delete-player");
    window.location.reload()
  }

  return (
    <div className="player-not-found-container">
      <h2>Player not found, try again</h2>
      <img src={playerNotFound} alt="Player not found!" />
      <button className="submit-btn" onClick={handleGoBack}>Go Back</button>
    </div>
  );
}

export default PlayerNotFound;
