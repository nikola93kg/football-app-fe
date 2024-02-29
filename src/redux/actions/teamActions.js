import { FETCH_TEAMS_REQUEST, FETCH_TEAMS_SUCCESS, FETCH_TEAMS_FAILURE, ADD_TEAM_SUCCESS, ADD_TEAM_FAILURE, EDIT_TEAM_SUCCESS, EDIT_TEAM_FAILURE} from '../types/types';
import axios from 'axios';

export const fetchTeams = () => async (dispatch) => {
    try {
      dispatch({ type: FETCH_TEAMS_REQUEST });
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/teams`);
      dispatch({ type: FETCH_TEAMS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_TEAMS_FAILURE, payload: error.message });
    }
}

export const addTeam = (teamData) => async (dispatch) => {
  try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/teams`, teamData);
      dispatch({
          type: ADD_TEAM_SUCCESS,
          payload: response.data 
      });
  } catch (error) {
      dispatch({
          type: ADD_TEAM_FAILURE,
          payload: error.response.data.message // Pretpostavljamo da backend šalje poruku o grešci
      });
      // Opcionalno: Možete da prikažete poruku o grešci
  }
}

export const editTeam = (id, teamData) => async (dispatch) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/teams/${id}`, teamData);
    dispatch({
      type: EDIT_TEAM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_TEAM_FAILURE,
      payload: error.response.data.message,
    });
  }
};

