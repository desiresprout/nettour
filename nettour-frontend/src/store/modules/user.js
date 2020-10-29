import { createAction, handleActions } from "redux-actions";
import * as AuthAPI from "lib/api/auth";
import { pender } from "redux-pender";
import produce from "immer";
import * as UsersAPI from "lib/api/user";

const SET_LOGGED_INFO = "user/SET_LOGGED_INFO";
const SET_VALIDATED = "user/SET_VALIDATED";
const LOGOUT = "user/LOGOUT";
const CHECK_STATUS = "user/CHECK_STATUS";
const GET_USER_INFO = "user/GET_USER_INFO";

export const setLoggedInfo = createAction(SET_LOGGED_INFO);
export const setValidated = createAction(SET_VALIDATED);
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const checkStatus = createAction(CHECK_STATUS, AuthAPI.checkStatus);
export const getUserInfo = createAction(GET_USER_INFO, UsersAPI.getUserInfo);

const initialState = {
  loggedInfo: {
    thumbnail: null,
    username: null,
  },
  logged: false,
  validated: false,
  info: {
    thumbnail: null,
    postCount: null,
  },
};

export default handleActions(
  {
    [SET_LOGGED_INFO]: (state, action) =>
      produce(state, draft => {
        draft.logged = true;
      }),
    [SET_VALIDATED]: (state, action) =>
      produce(state, draft => {
        draft.validated = action.payload;
      }),
    ...pender({
      type: CHECK_STATUS,
      onSuccess: (state, action) =>
        produce(state, draft => {
          const { thumbnail, username } = action.payload.data;
          draft.loggedInfo.thumbnail = thumbnail;
          draft.loggedInfo.username = username;
          draft.validated = true;
        }),
      onFailure: (state, action) => initialState,
    }),
    ...pender({
      type: GET_USER_INFO,
      onSuccess: (state, action) =>
        produce(state, draft => {
          draft.info.thumbnail = action.payload.data.profile;
          draft.info.postCount = action.payload.data.postCount;
        }),
    }),
  },
  initialState
);
