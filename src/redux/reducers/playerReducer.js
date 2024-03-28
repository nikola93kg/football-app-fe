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

const initialState = {
  loading: false,
  players: [],
  positions: [],
  error: "",
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        loading: false,
        players: action.payload,
        error: "",
      };
    case FETCH_PLAYERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_PLAYER_SUCCESS:
      return {
        ...state,
        players: [...state.players, action.payload],
        error: "",
      };
    case ADD_PLAYER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case EDIT_PLAYER_SUCCESS:
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.payload.id ? action.payload : player
        ),
        error: "",
      };
    case EDIT_PLAYER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_PLAYER_SUCCESS:
      return {
        ...state,
        players: state.players.filter((player) => player.id !== action.payload),
        error: "",
      };
    case DELETE_PLAYER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_PLAYER_POSITIONS_SUCCESS:
      return {
        ...state,
        positions: action.payload,
      };
    case SEARCH_PLAYERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_PLAYERS_SUCCESS:
      return {
        ...state,
        loading: false,
        players: action.payload,
        error: "",
      };
    case SEARCH_PLAYERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case RESET_SEARCH:
      return {
        ...state,
        players: [],
        error: null
        // ostatak stanja po potrebi
      };
    default:
      return state;
  }
};

export default playerReducer;
