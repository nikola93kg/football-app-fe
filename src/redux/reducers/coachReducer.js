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
  
  const initialState = {
    loading: false,
    coaches: [],
    error: "",
  };
  
  const coachReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COACHES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_COACHES_SUCCESS:
        return {
          loading: false,
          coaches: action.payload,
          error: "",
        };
      case FETCH_COACHES_FAILURE:
        return {
          loading: false,
          coaches: [],
          error: action.payload,
        };
      case ADD_COACH_SUCCESS:
        return {
          ...state,
          coaches: [...state.coaches, action.payload],
          error: "",
        };
      case ADD_COACH_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case EDIT_COACH_SUCCESS:
        return {
          ...state,
          coaches: state.coaches.map((coach) =>
            coach.id === action.payload.id ? action.payload : coach
          ),
          error: "",
        };
      case EDIT_COACH_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_COACH_SUCCESS:
        return {
          ...state,
          coaches: state.coaches.filter((coach) => coach.id !== action.payload),
          error: "",
        };
      case DELETE_COACH_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default coachReducer;  