import { PLAY_MUSIC, PAUSE_MUSIC } from "../types/types";

const initialState = {
  playing: false,
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_MUSIC:
      return { ...state, playing: true };
    case PAUSE_MUSIC:
      return { ...state, playing: false };
    default:
      return state;
  }
};

export default musicReducer;
