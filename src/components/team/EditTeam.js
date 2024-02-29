import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../../redux/actions/teamActions';
import { editTeam } from '../../redux/actions/teamActions';
import EditTeamModal from "./EditTeamModal"
import { toast } from 'react-toastify';
import "../../styles/EditTeam.css"

function EditTeam() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teams } = useSelector(state => state.team)
    const [editingTeam, setEditingTeam] = useState(null);

    const handleEdit = (id, teamData) => {
        dispatch(editTeam(id, teamData))
        .then(() => {
            setEditingTeam(null); // zatvaram modal
            toast.success("Team successfully updated")
        }).catch((error) => {
            toast.error("Something went wrong")
        });
        
    }

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch])


    if (!teams.length) {
        return <div>Loading teams...</div>;
    }

    return (
        <div className='edit-team-container'>
            <h2>Select a Team to Edit</h2>
            <ul>
                {teams.map(team => (
                    <li key={team.id}>
                        {team.name}
                        <button className='edit-btn' onClick={() => setEditingTeam(team)}>Edit</button>
                    </li>
                ))}
            </ul>
            {editingTeam && (
                <EditTeamModal
                    team={editingTeam}
                    onClose={() => setEditingTeam(null)}
                    onSave={handleEdit}
                />
            )}
        </div>
    );
}

export default EditTeam;
