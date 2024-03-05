import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, editTeam, deleteTeam  } from '../../redux/actions/teamActions';
import { toast } from 'react-toastify';
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import "../../styles/EditTeam.css"
import Modal from '../Modal';

function EditTeam() {

    const dispatch = useDispatch();
    const { teams } = useSelector(state => state.team)
    const [editingTeam, setEditingTeam] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [teamLogo, setTeamLogo] = useState('');

    useEffect(() => {
        if(editingTeam) {
            setTeamName(editingTeam.name);
            setTeamLogo(editingTeam.logo);
        }
    }, [editingTeam]);

    const handleEdit = (id, teamData) => {
        dispatch(editTeam(id, teamData))
        .then(() => {
            setEditingTeam(null); // zatvaram modal
            toast.success("Team successfully updated");
        }).catch((error) => {
            toast.error("Something went wrong");
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEdit(editingTeam.id, { name: teamName, logo: teamLogo });
    };

    const handleDelete = (id) => {
        dispatch(deleteTeam(id))
          .then(() => {
            toast.success("Team successfully deleted");
          })
          .catch((error) => {
            toast.error("Something went wrong with deleting the team");
          });
      };
      

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
                        <div className="buttons">
                            <button className='edit-btn' onClick={() => setEditingTeam(team)}><BiSolidEditAlt /></button>
                            <button className="delete-btn" onClick={() => handleDelete(team.id)}><MdDelete /></button>
                        </div>              
                    </li>
                ))}
            </ul>
            {editingTeam && (
                <Modal onClose={() => setEditingTeam(null)}>
                    <form onSubmit={handleSubmit}>
                        <div className="team-name">
                            Team Name:
                            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                        </div>
                        <div className="team-logo-url">
                            Team Logo URL:
                            <input type="text" value={teamLogo} onChange={(e) => setTeamLogo(e.target.value)} />
                        </div>
                        <button className='save-btn' type="submit">Save Changes</button>
                    </form>
                </Modal>
            )}
        </div>
    );
}

export default EditTeam;
