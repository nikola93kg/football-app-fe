import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editReferee, fetchReferees, deleteReferee  } from "../../redux/actions/refereeActions";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import "../../styles/referee/EditReferee.css";
import Modal from "../Modal";

function EditReferee() {

    const dispatch = useDispatch();
    const { referees } = useSelector(state => state.referee);
    const [editingReferee, setEditingReferee] = useState(null);
    const [refereeName, setRefereeName] = useState('');
    const [refereeAge, setRefereeAge] = useState('');
    const [refereeNationality, setRefereeNationality] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [refereeIdToDelete, setRefereeIdToDelete] = useState(null);


    useEffect(() => {
        if(editingReferee) {
            setRefereeName(editingReferee.name);
            setRefereeAge(editingReferee.age);
            setRefereeNationality(editingReferee.nationality);
        }
    }, [editingReferee]);
  
    const handleEdit = (id, refereeData) => {
        dispatch(editReferee(id, refereeData))
        .then(() => {
            setEditingReferee(null);
            toast.success("Referee successfully updated");
        }).catch((error) => {
            toast.error("Something went wrong");
        });
    };

    const handleDelete = (id) => {
        dispatch(deleteReferee(id))
        .then(() => {
            dispatch(fetchReferees());
            toast.success("Referee deleted successfully!")
        })
        .catch((error) => {
            toast.error("Something went wrong with deleting the referee");
        });
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEdit(editingReferee.id, { name: refereeName, age: refereeAge, nationality: refereeNationality });
    };

    const handleOpenDeleteModal = (refereeId) => {
        setIsDeleteModalOpen(true);
        setRefereeIdToDelete(refereeId);
      };
      
      const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setRefereeIdToDelete(null);
      };
      
      const handleConfirmDelete = () => {
        if (refereeIdToDelete) {
          dispatch(deleteReferee(refereeIdToDelete))
            .then(() => {
              dispatch(fetchReferees()); 
              toast.success("Referee deleted successfully!");
              handleCloseDeleteModal();
            })
            .catch((error) => {
              toast.error("Something went wrong with deleting the referee");
              handleCloseDeleteModal();
            });
        }
      };
      
  
    useEffect(() => {
        dispatch(fetchReferees());
    }, [dispatch]);

    if (!referees.length) {
        return <div>Loading referees...</div>;
    }

    return (
        <div className='edit-referee-container'>
            <h2>Select a Referee to Edit</h2>
            <ul>
                {referees.map(referee => (
                    <li key={referee.id}>
                        {referee.name}
                        <div className="buttons">
                            <button className='edit-btn' onClick={() => setEditingReferee(referee)}><BiSolidEditAlt /></button>
                            <button className='delete-btn' onClick={() => handleOpenDeleteModal(referee.id)}><MdDelete /></button>
                        </div>
                    </li>
                ))}
            </ul>
            {isDeleteModalOpen && (
                <Modal onClose={handleCloseDeleteModal}>
                    <h2>Are you sure?</h2>
                    <p>Do you really want to delete this referee?</p>
                    <button onClick={handleConfirmDelete}>Yes</button>
                </Modal>
                )}

            {editingReferee && (
                <Modal onClose={() => setEditingReferee(null)}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            Name:
                            <input type="text" value={refereeName} onChange={(e) => setRefereeName(e.target.value)} />
                        </div>
                        <div>
                            Age:
                            <input type="number" value={refereeAge} onChange={(e) => setRefereeAge(e.target.value)} />
                        </div>
                        <div>
                            Nationality:
                            <input type="text" value={refereeNationality} onChange={(e) => setRefereeNationality(e.target.value)} />
                        </div>
                        <button className='save-btn' type="submit">Save Changes</button>
                    </form>
                </Modal>
            )}
        </div>
    );
}

export default EditReferee