import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../../redux/actions/teamActions';
import "../../styles/team/TeamList.css"
import Loading from '../Loading';

function TeamList() {

    const dispatch = useDispatch()
    const { loading, teams, error } = useSelector(state => state.team);

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch])

    if (error) return <div>Error: {error}</div>
    if (loading) return <Loading /> // Ne zaboravi da imas wrapper klasu za suspense

    const sortedTeams = teams.sort((a, b) => a.name.localeCompare(b.name));

    return (
      <>
          <h1>Teams</h1>
          <div className='team-list-container'>
          {sortedTeams.map(team => (
            <div key={team.id} className='team-cards'> 
              <h3>{team.name}</h3>
              <img src={team.logo} />
            </div>
          ))}
        </div>
      </>
        
      )
}

export default TeamList