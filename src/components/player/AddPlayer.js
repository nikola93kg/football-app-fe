import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addPlayer, fetchPlayerPositions } from '../../redux/actions/playerActions';
import { fetchTeams } from "../../redux/actions/teamActions"
import "../../styles/player/AddPlayer.css"

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    age: Yup.number().positive('Age must be positive').integer('Age must be an integer').required('Age is required'),
    nationality: Yup.string().required('Nationality is required'),
    jerseyNumber: Yup.number().positive('Jersey Number must be positive').integer('Jersey Number must be an integer').required('Jersey Number is required'),
    defaultPosition: Yup.string().required('Default position is required'), 
    teamId: Yup.string().required('Team is required'),
  });


function AddPlayer() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(fetchPlayerPositions());
        dispatch(fetchTeams());
      }, [dispatch]);


    const positions = useSelector(state => state.player.positions || []); //dodao sam [] jer mi je izlazila greska da je undefined
    const teams = useSelector(state => state.team.teams);

    const formik = useFormik({
      initialValues: {
        name: "",
        age: "",
        nationality: "",
        jerseyNumber: "",
        defaultPosition: "",
        positions: [],
        teamId: ""
      },
      validationSchema,
      onSubmit: (values) => {
        console.log("ovo saljem na bekend:", values);
        const playerData = {
          ...values,
          transferFee: values.transferFee ? values.transferFee : null,
          transferDate: values.transferDate ? values.transferDate : null,
        };
        dispatch(addPlayer(playerData))
          .then(() => {
            toast.success("Player added successfully!");
            navigate("/players");
          })
          .catch((error) => {
            toast.error(
              "There was an error adding the player: " + error.message
            );
          });
      },
    });

    const handlePositionChange = (e) => {
        const { options } = e.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        formik.setFieldValue("positions", value);
    };

      return (
        <div className="add-player-container">
          <h2>Add New Player</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
              {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
            </div>

            <div className="form-group">
              <label htmlFor="teamId">Team</label>
              <select id="teamId" name="teamId" onChange={formik.handleChange} value={formik.values.teamId} >
                <option value="">Select a team</option>
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
              </select>
              {formik.errors.teamId ? <div className="error">{formik.errors.teamId}</div> : null}
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
              <label htmlFor="jerseyNumber">Jersey Number</label>
              <input id="jerseyNumber" name="jerseyNumber" type="number" onChange={formik.handleChange} value={formik.values.jerseyNumber} />
              {formik.errors.jerseyNumber ? <div className="error">{formik.errors.jerseyNumber}</div> : null}
            </div>    

            <div className="form-group">
        <label htmlFor="defaultPosition">Default Position</label>
        <input id="defaultPosition" name="defaultPosition" type="text" onChange={formik.handleChange} value={formik.values.defaultPosition} />
        {formik.errors.defaultPosition ? <div className="error">{formik.errors.defaultPosition}</div> : null}
      </div>

      <div className="form-group">
        <label htmlFor="positions">Positions</label>
            <select className='positions-select' id="positions" name="positions" multiple onChange={handlePositionChange} value={formik.values.positions} >
                {positions.map((position) => (
                    <option key={position} value={position}>{position}</option>
                ))}
            </select>
        {formik.errors.positions ? <div className="error">{formik.errors.positions}</div> : null}
      </div>

      <div className="form-group">
        <label htmlFor="transferFee">Transfer Fee (Optional)</label>
        <input id="transferFee" name="transferFee" type="number" onChange={formik.handleChange} value={formik.values.transferFee || ''} />
        {formik.errors.transferFee ? <div className="error">{formik.errors.transferFee}</div> : null}
      </div>

      <div className="form-group">
        <label htmlFor="transferDate">Transfer Date (Optional)</label>
        <input id="transferDate" name="transferDate" type="date" onChange={formik.handleChange} value={formik.values.transferDate || ''} />
        {formik.errors.transferDate ? <div className="error">{formik.errors.transferDate}</div> : null}
      </div>
            
            <button type="submit">Submit</button>
          </form>
        </div>
      );
      
}

export default AddPlayer