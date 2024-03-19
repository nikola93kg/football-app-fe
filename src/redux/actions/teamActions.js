import {
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
  ADD_TEAM_SUCCESS,
  ADD_TEAM_FAILURE,
  EDIT_TEAM_SUCCESS,
  EDIT_TEAM_FAILURE,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILURE,
  FETCH_TEAM_DETAILS_REQUEST,
  FETCH_TEAM_DETAILS_SUCCESS,
  FETCH_TEAM_DETAILS_FAILURE,
} from "../types/types";
import axios from "axios";

export const fetchTeams = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TEAMS_REQUEST });
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/teams`
    );
    dispatch({ type: FETCH_TEAMS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TEAMS_FAILURE, payload: error.message });
  }
};

export const fetchTeamDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TEAM_DETAILS_REQUEST });
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/teams/${id}`
    );
    dispatch({ type: FETCH_TEAM_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TEAM_DETAILS_FAILURE, payload: error.message });
  }
};

export const addTeam = (teamData, coachId) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/teams`,
      teamData
    );
    const teamId = response.data.id;

    dispatch({
      type: ADD_TEAM_SUCCESS,
      payload: response.data,
    });

    if (coachId) {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/teams/${teamId}/assign-coach/${coachId}`
      );
    }
  } catch (error) {
    dispatch({
      type: ADD_TEAM_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const editTeam = (id, teamData, coachId) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/teams/${id}`,
      teamData
    );
    dispatch({
      type: EDIT_TEAM_SUCCESS,
      payload: response.data,
    });
    if (coachId) {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/teams/${id}/assign-coach/${coachId}`
      );
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data.message.includes("Coach is already assigned")
    ) {
    } else {
      dispatch({
        type: EDIT_TEAM_FAILURE,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  }
};

export const deleteTeam = (id) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/teams/${id}`);
    dispatch({
      type: DELETE_TEAM_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TEAM_FAILURE,
      payload: error.response.data.message,
    });
  }
};
