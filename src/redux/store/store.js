import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { teamReducer } from '../reducers/teamReducer';
import { refereeReducer } from '../reducers/refereeReducer';

const rootReducer = combineReducers({
  team: teamReducer,
  referee: refereeReducer,
  
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
