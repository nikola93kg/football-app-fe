import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { teamReducer } from '../reducers/teamReducer';
import { refereeReducer } from '../reducers/refereeReducer';
import musicReducer from '../reducers/musicReducer';

const rootReducer = combineReducers({
  team: teamReducer,
  referee: refereeReducer,
  music: musicReducer
  
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
