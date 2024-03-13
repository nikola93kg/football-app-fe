import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { editPlayer, fetchPlayers, deletePlayer } from "../../redux/actions/playerActions";
import { fetchTeams } from "../../redux/actions/teamActions";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal";
import "../../styles/player/EditDeletePlayer.css"; 

const PlayerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number().required("Age is required").positive().integer(),
  nationality: Yup.string().required("Nationality is required"),
  jerseyNumber: Yup.number().required("Jersey Number is required").positive().integer(),
  teamName: Yup.string().required("Team Name is required"),
});

// TODO: Sortiraj klubove po abecedi kada se otvori modal za editovanje

function EditDeletePlayer() {
  const dispatch = useDispatch();
  // const { players } = useSelector((state) => state.player);
  const [editingPlayer, setEditingPlayer] = useState(null);

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchTeams());
  }, [dispatch]);

  const players = useSelector(state => state.player.players);
  const teams = useSelector(state => state.team.teams);

  const handleDelete = (id) => {
    dispatch(deletePlayer(id))
      .then(() => {
        toast.success("Player deleted successfully!");
      })
      .catch((error) => {
        toast.error("Something went wrong with deleting the player");
      });
  };

  if (!players.length) {
    return <div>Loading players...</div>;
  }
  return (
    <div className='edit-delete-player-container'>
      <h2>Players</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Nationality</th>
            <th>Jersey Number</th>
            <th>Team</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.age}</td>
              <td>{player.nationality}</td>
              <td>{player.jerseyNumber}</td>
              <td>{player.teamName}</td>
              <td>
              <div className="buttons">
                <button className="edit-btn" onClick={() => setEditingPlayer(player)}><BiSolidEditAlt /></button>
                <button className="delete-btn" onClick={() => handleDelete(player.id)}><MdDelete /></button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingPlayer && (
        <Modal onClose={() => setEditingPlayer(null)}>
          <Formik
            initialValues={{
              name: editingPlayer.name,
              age: editingPlayer.age,
              nationality: editingPlayer.nationality,
              jerseyNumber: editingPlayer.jerseyNumber,
              teamName: editingPlayer.teamName || '',
              teamId: editingPlayer.teamId || '',
            }}
            validationSchema={PlayerSchema}
            onSubmit={(values) => {
              const updatedValues = {
                ...values,
                teamId: values.teamId
              }
              dispatch(editPlayer(editingPlayer.id, updatedValues))
                .then(() => {
                  setEditingPlayer(null);
                  toast.success("Player successfully updated");
                })
                .catch((error) => {
                  toast.error("Something went wrong");
                });
            }}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
              <label htmlFor="name">Name</label>
                <Field name="name" />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}
                <label htmlFor="age">Age</label>
                <Field name="age" type="number" />
                {errors.age && touched.age ? <div>{errors.age}</div> : null}
                <label htmlFor="nationality">Nationality</label>
                <Field name="nationality" />
                {errors.nationality && touched.nationality ? <div>{errors.nationality}</div> : null}
                <label htmlFor="jerseyNumber">Jersey Number</label>
                <Field name="jerseyNumber" type="number" />
                {errors.jerseyNumber && touched.jerseyNumber ? <div>{errors.jerseyNumber}</div> : null}
                
                <div className="option-select">
                  <label htmlFor="teamId">Team</label>
                  <Field as="select" name="teamId" onChange={(e) => setFieldValue("teamId", e.target.value)}>
                 
                    <option value="">{values.teamName}</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </Field>
                  {errors.teamId && touched.teamId ? (
                    <div>{errors.teamId}</div>
                  ) : null}
              </div>
                
                <button type="submit">Save Changes</button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
}

export default EditDeletePlayer