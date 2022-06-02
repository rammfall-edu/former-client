import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { user } from './user/reducer';
import { profile } from './profile/reducer';

const store = createStore(
  combineReducers({
    user,
    profile,
  }),
  composeWithDevTools()
);

export default store;
