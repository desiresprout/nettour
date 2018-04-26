import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import { penderReducer } from 'redux-pender';
import user from './user';

export default combineReducers({
    base,
    auth,
    user,
    pender: penderReducer
});