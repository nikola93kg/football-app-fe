import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTeam } from '../../redux/actions/teamActions';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    logo: Yup.string().url('Invalid URL').required('Logo is required'),
  });

function AddTeam() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
          name: '',
          logo: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
          dispatch(addTeam(values))
              .then(() => {
                  toast.success('Team added successfully!');
                  navigate("/teams");
              })
              .catch((error) => {
                  console.error('There was an error adding the team', error);
                  toast.error('There was an error adding the team.');
              });
          resetForm({});
        }
      })


      return (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="name">Team Name</label>
            <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
            {/* napravi custom hook za ovakve stvari */}
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
          </div>
          <div>
            <label htmlFor="logo">Team Logo URL</label>
            <input id="logo" name="logo" type="text" onChange={formik.handleChange} value={formik.values.logo} />
            {formik.errors.logo ? <div>{formik.errors.logo}</div> : null}
          </div>
          <button type="submit">Submit</button>
        </form>
      )
}

export default AddTeam