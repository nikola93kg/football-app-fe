import axios from "axios";
import {
  FETCH_COACHES_REQUEST,
  FETCH_COACHES_SUCCESS,
  FETCH_COACHES_FAILURE,
  ADD_COACH_SUCCESS,
  ADD_COACH_FAILURE,
  EDIT_COACH_SUCCESS,
  EDIT_COACH_FAILURE,
  DELETE_COACH_SUCCESS,
  DELETE_COACH_FAILURE,
} from "../types/types";


export const fetchCoaches = () => async (dispatch) => {
    dispatch({ type: FETCH_COACHES_REQUEST });
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/coach`);
      dispatch({ type: FETCH_COACHES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_COACHES_FAILURE, payload: error.message });
    }
  };

  
export const addCoach = (coachData) => async (dispatch) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/coach`, coachData);
      dispatch({ type: ADD_COACH_SUCCESS, payload: response.data });
      dispatch(fetchCoaches());
    } catch (error) {
      dispatch({ type: ADD_COACH_FAILURE, payload: error.message });
      throw error;
    }
  };
  

  export const editCoach = (id, coachData) => async (dispatch) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/coach/${id}`, coachData);
      dispatch({ type: EDIT_COACH_SUCCESS, payload: response.data });
      dispatch(fetchCoaches());
    } catch (error) {
      dispatch({ type: EDIT_COACH_FAILURE, payload: error.message });
    }
  };
  

  export const deleteCoach = (id) => async (dispatch) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/coach/${id}`);
      dispatch({ type: DELETE_COACH_SUCCESS, payload: id });
      dispatch(fetchCoaches());
    } catch (error) {
      dispatch({ type: DELETE_COACH_FAILURE, payload: error.message });
    }
  };