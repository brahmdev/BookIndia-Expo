import {combineReducers} from 'redux';

import UserLoginReducer from './userReducer';

const allReducers = combineReducers(
  {
    user: UserLoginReducer,
  });

const rootReducer = (state, action) => allReducers(state, action);

export default rootReducer;
