import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTeamDetails } from "../../redux/actions/teamActions";
import Loading from "../Loading";
import "../../styles/team/TeamDetails.css";

function TeamDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, teamDetails, error } = useSelector((state) => state.team);

  console.log(teamDetails);

  useEffect(() => {
    dispatch(fetchTeamDetails(id));
  }, [dispatch, id]);

  if (loading) return <Loading />
  if (error) return <div>Error: {error}</div>

  return (
    <div className="team-details-container">
      <div className="team-details-card">
        <div className="team">
          <h2>{teamDetails.name}</h2>
          <img src={teamDetails.logo} alt={`${teamDetails.name} logo`} />
        </div>
        <div className="team-details">
          <h3>Players:</h3>
          <ul>
            {teamDetails.listOfPlayers &&
              teamDetails.listOfPlayers.map((player) => (
                <li key={player.id}>
                  <h3>{player.name}</h3> ({player.defaultPosition}) -{" "}
                  {player.age} years old, {player.nationality}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeamDetails;
