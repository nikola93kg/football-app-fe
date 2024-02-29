import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReferees } from '../../redux/actions/refereeActions';

const RefereeList = () => {
  const dispatch = useDispatch();
  const { loading, referees, error } = useSelector((state) => state.referee);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchReferees());
  }, [dispatch]);

  const filteredReferees = filter
    ? referees.filter((referee) =>
        referee.name.toLowerCase().includes(filter.toLowerCase())
      )
    : referees;

  return (
    <div>
      <h2>Referees</h2>
      <input type="text" placeholder="Search referees..." value={filter} onChange={(e) => setFilter(e.target.value)} />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {filteredReferees.map((referee) => (
            <li key={referee.id}>
              {referee.name}, Age: {referee.age}, Nationality: {referee.nationality}, Yellow Cards: {referee.totalYellowCardsGiven}, Red Cards: {referee.totalRedCardsGiven}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RefereeList;
