import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { teamReducer } from '../reducers/teamReducer';
import { refereeReducer } from '../reducers/refereeReducer';
import playerReducer from '../reducers/playerReducer';
import musicReducer from '../reducers/musicReducer';
import coachReducer from "../reducers/coachReducer"

const rootReducer = combineReducers({
  team: teamReducer,
  referee: refereeReducer,
  music: musicReducer,
  player: playerReducer,
  coach: coachReducer,
  
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
