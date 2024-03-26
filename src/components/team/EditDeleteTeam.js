import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams, editTeam } from "../../redux/actions/teamActions";
import { toast } from "react-toastify";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { fetchCoaches } from "../../redux/actions/coachActions";
import Modal from "../Modal";
import "../../styles/team/EditTeam.css";
import Loading from "../Loading";
import { deleteEntity } from "../../redux/actions/genericActions";


// TODO: Mozda neku logiku da premestis u redux?

function EditTeam() {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.team);
  const [editingTeam, setEditingTeam] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [teamLogo, setTeamLogo] = useState("");
  const [coachId, setCoachId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [teamIdToDelete, setTeamIdToDelete] = useState(null);

  useEffect(() => {
    if (editingTeam) {
      setTeamName(editingTeam.name);
      setTeamLogo(editingTeam.logo);
      setCoachId(editingTeam.coachId || "");
    }
  }, [editingTeam]);

  const handleEdit = (id, teamData) => {
    dispatch(editTeam(id, teamData, coachId))
      .then(() => {
        setEditingTeam(null);
        toast.success("Team successfully updated");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Coach is already assigned");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTeamData = { name: teamName, logo: teamLogo, coachId };
    handleEdit(editingTeam.id, updatedTeamData);
  };

  const handleOpenDeleteModal = (teamId) => {
    setIsDeleteModalOpen(true);
    setTeamIdToDelete(teamId);
  };
  
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTeamIdToDelete(null);
  };
  
  const handleConfirmDelete = () => {
    if (teamIdToDelete) {
      dispatch(deleteEntity('teams', teamIdToDelete)) 
        .then(() => {
          toast.success("Team successfully deleted");
          handleCloseDeleteModal();
          dispatch(fetchTeams()); 
        })
        .catch((error) => {
          toast.error("Something went wrong with deleting the team");
          handleCloseDeleteModal();
        });
    }
  };
  
  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchCoaches());
  }, [dispatch]);

  const coaches = useSelector((state) => state.coach.coaches);

  const sortedTeams = teams.sort((a, b) => a.name.localeCompare(b.name));

  if (!teams.length) {
    return <Loading /> // TODO: Napravi spinner (loader) i koristi <suspense>
  }

  return (
    <div className="edit-team-container">
      <h2>Select a Team to Edit</h2>
      <ul>
        {sortedTeams.map((team) => (
          <li key={team.id}>
            {team.name}
            <div className="buttons">
              <button className="edit-btn" onClick={() => setEditingTeam(team)}>
                <BiSolidEditAlt />
              </button>
              <button className="delete-btn" onClick={() => handleOpenDeleteModal(team.id)} >
  <MdDelete />
</button>
            </div>
          </li>
        ))}
      </ul>
      {isDeleteModalOpen && (
  <Modal onClose={handleCloseDeleteModal}>
    <h2>Are you sure?</h2>
    <p>Do you really want to delete this team? </p>
    <button onClick={handleConfirmDelete}>Yes</button>
  </Modal>
)}

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

            <div className="team-coach">
              Coach:
              <select value={coachId} onChange={(e) => setCoachId(e.target.value)} >
                <option value="">Select a coach</option>
                {coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="save-btn" type="submit">
              Save Changes
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default EditTeam;
