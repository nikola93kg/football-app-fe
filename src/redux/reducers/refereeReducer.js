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

const initialState = {
  loading: false,
  referees: [],
  error: null,
};

export const refereeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REFEREE_REQUEST:
      return { ...state, loading: true };
    case FETCH_REFEREE_SUCCESS:
      return { ...state, loading: false, referees: action.payload };
    case FETCH_REFEREE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_REFEREE_SUCCESS:
      return {
        ...state,
        referees: [...state.referees, action.payload],
        loading: false,
        error: null,
      };
    case ADD_REFEREE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_REFEREE_SUCCESS:
      return {
        ...state,
        referees: state.referees.map((referee) =>
          referee.id === action.payload.id ? action.payload : referee
        ),
        loading: false,
        error: null,
      };
    case EDIT_REFEREE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
    case DELETE_REFEREE_SUCCESS:
      return {
        ...state,
        referees: state.referees.filter(
          (referee) => referee.id !== action.payload
        ),
        loading: false,
      };
    case DELETE_REFEREE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  }
};
