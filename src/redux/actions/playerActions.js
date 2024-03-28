import axios from "axios";
import {
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILURE,
  ADD_PLAYER_SUCCESS,
  ADD_PLAYER_FAILURE,
  EDIT_PLAYER_SUCCESS,
  EDIT_PLAYER_FAILURE,
  DELETE_PLAYER_SUCCESS,
  DELETE_PLAYER_FAILURE,
  FETCH_PLAYER_POSITIONS_SUCCESS,
  SEARCH_PLAYERS_REQUEST,
  SEARCH_PLAYERS_SUCCESS,
  SEARCH_PLAYERS_FAILURE,
  RESET_SEARCH 
} from "../types/types";

const fetchPlayersRequest = () => {
  return {
    type: FETCH_PLAYERS_REQUEST,
  };
};

export const fetchPlayers = () => async (dispatch) => {
  dispatch(fetchPlayersRequest());
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/players`
    );
    dispatch({ type: FETCH_PLAYERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PLAYERS_FAILURE, payload: error.message });
  }
};

export const searchPlayers = (name, nationality) => async (dispatch) => {
  dispatch({ type: SEARCH_PLAYERS_REQUEST });
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/players/search`,
      {
        params: { name, nationality },
      }
    );
    console.log("da li ima ovde tima: ", response.data) // ovde sam imao bug jer sam kupio podatke sa Player entiteta, a ne sa PlayerDTO-a
    dispatch({ type: SEARCH_PLAYERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SEARCH_PLAYERS_FAILURE, payload: error.message });
  }
};

export const addPlayer = (playerData) => async (dispatch) => {
  dispatch(fetchPlayersRequest());
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/players`,
      playerData
    );
    if (response.status === 200 || response.status === 201) {
      // proveri u postmanu examples!
      console.log("Podaci koji prolaze:", response.data);
      dispatch({
        type: ADD_PLAYER_SUCCESS,
        payload: response.data,
      });
      dispatch(fetchPlayers());
    } else {
      throw new Error("Failed to add player");
    }
  } catch (error) {
    dispatch({ type: ADD_PLAYER_FAILURE, payload: error.message });
    throw error;
  }
};

export const fetchPlayerPositions = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/players/positions`
    );
    dispatch({
      type: FETCH_PLAYER_POSITIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching player positions:", error);
  }
};

export const editPlayer = (id, playerData) => async (dispatch) => {
  console.log("isprati ovo", playerData);
  dispatch(fetchPlayersRequest());
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/players/${id}`,
      playerData
    );
    dispatch({
      type: EDIT_PLAYER_SUCCESS,
      payload: response.data,
    });
    dispatch(fetchPlayers());
  } catch (error) {
    dispatch({ type: EDIT_PLAYER_FAILURE, payload: error.message });
  }
};

export const deletePlayer = (id) => async (dispatch) => {
  dispatch(fetchPlayersRequest());
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/players/${id}`);
    dispatch({
      type: DELETE_PLAYER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({ type: DELETE_PLAYER_FAILURE, payload: error.message });
  }
};

export const resetSearch = () => ({
  type: RESET_SEARCH,
});