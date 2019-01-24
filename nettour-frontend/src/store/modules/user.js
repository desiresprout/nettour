import { createAction, handleActions } from 'redux-actions';
import * as AuthAPI from 'lib/api/auth';
import { pender } from 'redux-pender';
import produce from 'immer';
import * as UsersAPI from 'lib/api/user';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO'; // 로그인 정보 설정
const SET_VALIDATED = 'user/SET_VALIDATED'; // validated 값 설정
const LOGOUT = 'user/LOGOUT'; // 로그아웃
const CHECK_STATUS = 'user/CHECK_STATUS'; // 현재 로그인상태 확인

const GET_USER_INFO = 'user/GET_USER_INFO';

export const setLoggedInfo = createAction(SET_LOGGED_INFO); // loggedInfo
export const setValidated = createAction(SET_VALIDATED); // validated
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const checkStatus = createAction(CHECK_STATUS, AuthAPI.checkStatus);

export const getUserInfo = createAction(GET_USER_INFO, UsersAPI.getUserInfo);

const initialState = {
    loggedInfo: { // 현재 로그인중인 유저의 정보
        thumbnail: null,
        username: null
    },
    logged: false, // 현재 로그인중인지 알려준다
    validated: false, // 이 값은 현재 로그인중인지 아닌지 한번 서버측에 검증했음을 의미
    info : {
        thumbnail : null,
        postCount : null
    },
};

export default handleActions({
    [SET_LOGGED_INFO]: (state, action) => produce(state, draft => {    
        draft.logged = true; 
    }),
    [SET_VALIDATED]: (state, action) => produce(state, draft =>{
        draft.validated = action.payload;        
    }),
    ...pender({
        type: CHECK_STATUS,
        onSuccess: (state, action) => produce(state, draft => {
            const { thumbnail , username  } = action.payload.data;
            draft.loggedInfo.thumbnail = thumbnail;
            draft.loggedInfo.username = username;
            draft.validated  = true;
        }),
        onFailure: (state, action) => initialState
    }),
    ...pender({
        type: GET_USER_INFO,
        onSuccess: (state, action) => produce(state, draft => {
            draft.info.thumbnail = action.payload.data.profile;
            draft.info.postCount = action.payload.data.postCount;
        }),
    })
}, initialState);