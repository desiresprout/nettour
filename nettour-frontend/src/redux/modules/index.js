import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import { penderReducer } from 'redux-pender';
import user from './user';
import post from './post';
import editor from './editor';


export default combineReducers({
    base,
    auth,
    user,
    post,
    editor,
    pender: penderReducer
});