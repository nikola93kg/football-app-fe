import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addReferee } from '../../redux/actions/refereeActions';
import * as Yup from 'yup';


const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  age: Yup.number().positive('Age must be positive').integer('Age must be an integer').required('Age is required'),
  nationality: Yup.string().required('Nationality is required'),
  totalYellowCardsGiven: Yup.number().positive('Must be positive').integer('Must be an integer').required('Total yellow cards given is required'),
  totalRedCardsGiven: Yup.number().positive('Must be positive').integer('Must be an integer').required('Total red cards given is required'),
});

function AddReferee() {

    const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      nationality: '',
      totalYellowCardsGiven: '',
      totalRedCardsGiven: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addReferee(values))
        .then(() => {
          toast.success('Referee added successfully!');
          navigate("/referees");
        })
        .catch((error) => {
          console.error('There was an error adding the referee', error);
          toast.error('There was an error adding the referee.');
        });
      resetForm({});
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>

      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
      </div>
      

      <div>
        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" onChange={formik.handleChange} value={formik.values.age} />
        {formik.errors.age ? <div>{formik.errors.age}</div> : null}
      </div>
      

      <div>
        <label htmlFor="nationality">Nationality</label>
        <input id="nationality" name="nationality" type="text" onChange={formik.handleChange} value={formik.values.nationality} />
        {formik.errors.nationality ? <div>{formik.errors.nationality}</div> : null}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddReferee