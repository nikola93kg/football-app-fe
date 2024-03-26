import axios from "axios";
import { DELETE_ENTITY_SUCCESS, DELETE_ENTITY_FAILURE } from "../types/types";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const generateEndpoint = (entityType) => {
  return `${BASE_URL}/${entityType}`;
};

export const deleteEntity = (entityType, id) => async (dispatch) => {
  try {
    const endpoint = generateEndpoint(entityType);
    await axios.delete(`${endpoint}/${id}`);
    dispatch({
      type: DELETE_ENTITY_SUCCESS,
      payload: { entityType, id },
    });
  } catch (error) {
    dispatch({
      type: DELETE_ENTITY_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
