import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { editCoach, fetchCoaches, deleteCoach } from "../../redux/actions/coachActions";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal";
import "../../styles/coach/EditDeleteCoach.css";

const CoachSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number().required("Age is required").positive().integer(),
  nationality: Yup.string().required("Nationality is required"),
  trophiesWon: Yup.number().required("Trophies Won is required").positive().integer(),
});

function EditDeleteCoach() {
  const dispatch = useDispatch();
  const [editingCoach, setEditingCoach] = useState(null);

  useEffect(() => {
    dispatch(fetchCoaches());
  }, [dispatch]);

  const coaches = useSelector(state => state.coach.coaches);

  const handleDelete = (id) => {
    dispatch(deleteCoach(id))
      .then(() => {
        toast.success("Coach deleted successfully!");
      })
      .catch((error) => {
        toast.error("Something went wrong with deleting the coach");
      });
  };

  if (!coaches.length) {
    return <div>Loading coaches...</div>;
  }

  return (
    <div className='edit-delete-coach-container'>
      <h2>Coaches</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Nationality</th>
            <th>Trophies Won</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coaches.map(coach => (
            <tr key={coach.id}>
              <td>{coach.name}</td>
              <td>{coach.age}</td>
              <td>{coach.nationality}</td>
              <td>{coach.trophiesWon}</td>
              <td>
              <div className="buttons">
                <button className="edit-btn" onClick={() => setEditingCoach(coach)}><BiSolidEditAlt /></button>
                <button className="delete-btn" onClick={() => handleDelete(coach.id)}><MdDelete /></button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingCoach && (
        <Modal onClose={() => setEditingCoach(null)}>
          <Formik
            initialValues={{
              name: editingCoach.name,
              age: editingCoach.age,
              nationality: editingCoach.nationality,
              trophiesWon: editingCoach.trophiesWon,
            }}
            validationSchema={CoachSchema}
            onSubmit={(values) => {
              dispatch(editCoach(editingCoach.id, values))
                .then(() => {
                  setEditingCoach(null);
                  toast.success("Coach successfully updated");
                })
                .catch((error) => {
                  toast.error("Something went wrong");
                });
            }}
          >
            {({ errors, touched }) => (
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
                
                <label htmlFor="trophiesWon">Trophies Won</label>
                <Field name="trophiesWon" type="number" />
                {errors.trophiesWon && touched.trophiesWon ? <div>{errors.trophiesWon}</div> : null}
                
                <button type="submit">Save Changes</button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
}

export default EditDeleteCoach;
