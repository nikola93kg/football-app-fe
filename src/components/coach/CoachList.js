import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoaches } from '../../redux/actions/coachActions';
import "../../styles/coach/CoachList.css"
import Loading from '../Loading';
import Error from '../Error';

const CoachList = () => {
  const dispatch = useDispatch();
  const { loading, coaches, error } = useSelector(state => state.coach);

  useEffect(() => {
    dispatch(fetchCoaches());
  }, [dispatch]);

  if (loading) return <Loading />
  if (error) return <Error />

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
