import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReferees } from '../../redux/actions/refereeActions';
import "../../styles/referee/RefereeList.css"

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
      <div className="referee-list-container">
        <input type="text" placeholder="Search referees" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <div className="ag-courses_box">
          {filteredReferees.map((referee) => (
            <div className="ag-courses_item" key={referee.id}>
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">{referee.name}</div>
                <div className="ag-courses-item_date-box">Age: {referee.age}</div>
                <div className="ag-courses-item_date-box">Nationality: {referee.nationality}</div>
                <div className="ag-courses-item_date">Yellow Cards: {referee.totalYellowCardsGiven}</div>
                <div className="ag-courses-item_date">Red Cards: {referee.totalRedCardsGiven}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
};

export default RefereeList;
