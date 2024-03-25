import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../../redux/actions/teamActions';
import Error from '../Error';
import "../../styles/team/TeamList.css"
import Loading from '../Loading';
import { Link } from 'react-router-dom';

function TeamList() {

    const dispatch = useDispatch()
    const { loading, teams, error } = useSelector(state => state.team);

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch])

    if (error) return <Error />
    if (loading) return <Loading /> // Ne zaboravi da imas wrapper klasu za suspense

    const sortedTeams = teams.sort((a, b) => a.name.localeCompare(b.name));

    return (
      <>
          <h1>Teams</h1>
          <div className='team-list-container'>
          {sortedTeams.map(team => (
            <Link to={`/teams/${team.id}`} key={team.id} style={{ textDecoration: 'none' }}>
            <div className='team-cards'> 
              <h3>{team.name}</h3>
              <img src={team.logo} />
            </div>
            </Link>
          ))}
        </div>
      </>
        
      )
}

export default TeamList