import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers } from '../../redux/actions/playerActions';
import {formatPlayerPositions} from "../../utils/formatHelpers";
import "../../styles/player/PlayerList.css"

const PlayersList = () => {
  const dispatch = useDispatch();
  const { loading, players, error } = useSelector(state => state.player); 

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="players-list-container">
      <h2>All Players</h2>
      {/* TODO: Napravi paginaciju za tabelu jer ce biti mnogo igraca */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Nationality</th>
            <th>Jersey Number</th>
            <th>Team</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.age}</td>
              <td>{player.nationality}</td>
              <td>{player.jerseyNumber}</td>
              <td>{player.teamName ? player.teamName : 'No team assigned'}</td>
              <td>{player.defaultPosition ? player.defaultPosition : formatPlayerPositions(player.positions)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersList;