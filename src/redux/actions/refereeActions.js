import axios from "axios";
import {
  FETCH_REFEREE_REQUEST,
  FETCH_REFEREE_SUCCESS,
  FETCH_REFEREE_FAILURE,
  ADD_REFEREE_SUCCESS,
  ADD_REFEREE_FAILURE,
  EDIT_REFEREE_SUCCESS,
  EDIT_REFEREE_FAILURE,
  DELETE_REFEREE_SUCCESS,
  DELETE_REFEREE_FAILURE,
} from "../types/types";

export const fetchReferees = () => async (dispatch) => {
  dispatch({ type: FETCH_REFEREE_REQUEST });
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/referees`
    );
    dispatch({ type: FETCH_REFEREE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_REFEREE_FAILURE, payload: error.message });
  }
};

export const addReferee = (refereeData) => async (dispatch) => {
  dispatch({ type: FETCH_REFEREE_REQUEST });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/referees`,
      refereeData
    );
    dispatch({
      type: ADD_REFEREE_SUCCESS,
      payload: response.data,
    });
    fetchReferees(dispatch);
  } catch (error) {
    console.error("Error adding referee:", error.message);
    dispatch({ type: ADD_REFEREE_FAILURE, payload: error.message });
  }
};

export const editReferee = (id, refereeData) => async (dispatch) => {
  dispatch({ type: FETCH_REFEREE_REQUEST });
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/referees/${id}`,
      refereeData
    );
    dispatch({
      type: EDIT_REFEREE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: EDIT_REFEREE_FAILURE, payload: error.message });
  }
};

export const deleteReferee = (id) => async (dispatch) => {
  dispatch({ type: FETCH_REFEREE_REQUEST });
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/referees/${id}`);
    dispatch({
      type: DELETE_REFEREE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.error("Error deleting referee:", error.message);
    dispatch({ type: DELETE_REFEREE_FAILURE, payload: error.message });
  }
};
