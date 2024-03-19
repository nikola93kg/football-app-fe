import React, { useEffect } from 'react';
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addCoach } from '../../redux/actions/coachActions';
import { fetchTeams } from "../../redux/actions/teamActions"
import "../../styles/coach/AddCoach.css";

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    age: Yup.number().positive('Age must be positive').integer('Age must be an integer').required('Age is required'),
    nationality: Yup.string().required('Nationality is required'),
    // trophiesWon: Yup.number().positive('Number of trophies won must be positive').integer('Number of trophies won must be an integer').required('Number of trophies won is required'),
    // team: Yup.string().required('Team is required'),
    // teamId: Yup.string().required('Team is required'),
});

function AddCoach() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
      dispatch(fetchTeams());
    }, [dispatch]);

    const teams = useSelector(state => state.team.teams);

    const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            nationality: "",
            trophiesWon: "",
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(addCoach(values))
                .then(() => {
                    toast.success("Coach added successfully!");
                    navigate("/coaches");
                })
                .catch((error) => {
                    toast.error("There was an error adding the coach: " + error.message);
                });
        },
    });


    return (
        <div className="add-coach-container">
            <h2>Add New Coach</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
                    {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                </div>
                
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input id="age" name="age" type="number" onChange={formik.handleChange} value={formik.values.age} />
                    {formik.errors.age ? <div className="error">{formik.errors.age}</div> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="nationality">Nationality</label>
                    <input id="nationality" name="nationality" type="text" onChange={formik.handleChange} value={formik.values.nationality} />
                    {formik.errors.nationality ? <div className="error">{formik.errors.nationality}</div> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="trophiesWon">Trophies Won</label>
                    <input id="trophiesWon" name="trophiesWon" type="number" onChange={formik.handleChange} value={formik.values.trophiesWon} />
                    {formik.errors.trophiesWon ? <div className="error">{formik.errors.trophiesWon}</div> : null}
                </div>

                {/* <div className="form-group">
                    <label htmlFor="teamId">Team</label>
                    <select
                        id="teamId"
                        name="teamId"
                        onChange={formik.handleChange}
                        value={formik.values.teamId}
                    >
                        <option value="">Select a team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                    </select>
                    {formik.errors.teamId ? <div className="error">{formik.errors.teamId}</div> : null}
                </div> */}


                <button className='submit-btn' type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddCoach;
