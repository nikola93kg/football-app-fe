import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoaches } from '../../redux/actions/coachActions';
import "../../styles/coach/CoachList.css"

const CoachList = () => {
  const dispatch = useDispatch();
  const { loading, coaches, error } = useSelector(state => state.coach);

  useEffect(() => {
    dispatch(fetchCoaches());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="coaches-list-container">
      <h2>All Coaches</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Nationality</th>
            <th>Trophies Won</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {coaches.map((coach) => (
            <tr key={coach.id}>
              <td>{coach.name}</td>
              <td>{coach.age}</td>
              <td>{coach.nationality}</td>
              <td>{coach.trophiesWon}</td>
              <td>{coach.teamName ? coach.teamName : 'Unassigned'}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoachList;
