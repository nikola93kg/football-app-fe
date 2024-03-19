import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchTeamCoach,
  fetchTeamDetails,
} from "../../redux/actions/teamActions";
import Loading from "../Loading";
import "../../styles/team/TeamDetails.css";

function TeamDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, teamDetails, error } = useSelector((state) => state.team);
  const { coachDetails, loadingCoach } = useSelector((state) => state.team);

  useEffect(() => {
    if (id) {
      dispatch(fetchTeamDetails(id));
      dispatch(fetchTeamCoach(id));
    }
  }, [dispatch, id]);

  if (loading) return <Loading />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!teamDetails) return <Loading />;

  return (
    <div className="team-details-container">
      <div className="team-details-card">
        <div className="team-header">
          <img src={teamDetails.logo} alt={`${teamDetails.name} logo`} />
          <h2>{teamDetails.name}</h2>
          {!loadingCoach && coachDetails && (
              <div className="coach-details">
                <h3>Coach: </h3>
                <p>{coachDetails.name}</p>
              </div>
            )}
        </div>
        <div className="players-list">
          <h3>Players:</h3>
          <ul>
            {teamDetails.listOfPlayers &&
              teamDetails.listOfPlayers.map((player) => (
                <li key={player.id}>
                  <span className="player-name">{player.name}</span> 
                  <span className="player-info">
                    {player.defaultPosition} - {player.age} years old
                  </span>
                </li>
              ))}
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeamDetails;
