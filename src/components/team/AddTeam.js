import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTeam } from "../../redux/actions/teamActions";
import { fetchCoaches } from "../../redux/actions/coachActions";
import "../../styles/team/AddTeam.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  logo: Yup.string().url("Invalid URL").required("Logo is required"),
  coachId: Yup.string().required('Coach is required'),
});

function AddTeam() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoaches());
  }, [dispatch]);

  const coaches = useSelector((state) => state.coach.coaches);

  console.log(coaches);

  const formik = useFormik({
    initialValues: {
      name: "",
      logo: "",
      coachId: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { name, logo, coachId } = values;
      const teamData = { name, logo };
    
      dispatch(addTeam(teamData, coachId))
        .then(() => {
          toast.success('Team added successfully!');
          navigate("/teams");
        })
        .catch((error) => {
          console.error('There was an error adding the team', error);
          toast.error('There was an error adding the team.');
        });
    
      resetForm({});
    },
  });

  return (
    <div className="add-team-container">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Team Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {/* napravi custom hook za ovakve stvari */}
          {formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="logo">Team Logo URL</label>
          <input
            id="logo"
            name="logo"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.logo}
          />
          {formik.errors.logo ? (
            <div className="error">{formik.errors.logo}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="coachId">Coach</label>
          <select
            id="coachId"
            name="coachId"
            onChange={formik.handleChange}
            value={formik.values.coachId}
          >
            <option value="">Select a coach</option>
            {coaches.map((coach) => (
              <option key={coach.id} value={coach.id}>
                {coach.name}
              </option>
            ))}
          </select>
          {formik.errors.coachId && (
            <div className="error">{formik.errors.coachId}</div>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddTeam;
