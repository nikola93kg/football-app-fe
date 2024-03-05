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
} from "../types/types";

const initialState = {
  loading: false,
  teams: [],
  error: null,
};

export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAMS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TEAMS_SUCCESS:
      return { ...state, loading: false, teams: action.payload };
    case FETCH_TEAMS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TEAM_SUCCESS:
      return {
        ...state,
        teams: [...state.teams, action.payload],
        error: null,
      };
    case ADD_TEAM_FAILURE:
      return { ...state, error: action.payload };
    case EDIT_TEAM_SUCCESS:
      return {
        ...state,
        teams: state.teams.map((team) =>
          team.id === action.payload.id ? action.payload : team
        ),
        loading: false,
      };
    case EDIT_TEAM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
    case DELETE_TEAM_SUCCESS:
      return {
        ...state,
        teams: state.teams.filter((team) => team.id !== action.payload),
        loading: false,
      };
    case DELETE_TEAM_FAILURE:
      return { ...state, loading: false, error: action.payload };
  }
};
