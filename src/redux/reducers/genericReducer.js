import { DELETE_ENTITY_SUCCESS, DELETE_ENTITY_FAILURE } from '../types/types';

const initialState = {
  teams: [],
  coaches: [],
  players: [],
  referees: [],
};

const entityReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ENTITY_SUCCESS:
      const { entityType, id } = action.payload;
      return {
        ...state,
        [entityType]: state[entityType].filter((entity) => entity.id !== id),
      };
    case DELETE_ENTITY_FAILURE:
      return state;
    default:
      return state;
  }
};

export default entityReducer;
