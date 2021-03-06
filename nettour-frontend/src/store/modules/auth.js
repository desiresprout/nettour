import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import * as AuthAPI from "lib/api/auth";
import { pender } from "redux-pender";
import social from "lib/social";

const CHANGE_INPUT = "auth/CHANGE_INPUT";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const CHECK_EMAIL_EXISTS = "auth/CHECK_EMAIL_EXISTS";
const CHECK_USERNAME_EXISTS = "auth/CHECK_USERNAME_EXISTS";
const LOCAL_REGISTER = "auth/LOCAL_REGISTER";
const LOCAL_LOGIN = "auth/LOCAL_LOGIN";
const LOGOUT = "auth/LOGOUT";
const SET_ERROR = "auth/SET_ERROR";
const PROVIDER_LOGIN = "auth/PROVIDER_LOGIN";
const TOGGLE_ANIMATE = "auth/TOGGLE_ANIMATE";
const SOCIAL_LOGIN = "auth/SOCIAL_LOGIN";
const SOCIAL_REGISTER = "auth/SOCIAL_REGISTEER";
const GET_CODE = "auth/GET_CODE";
const RESET_CODE = "auth/RESET_CODE";

export const changeInput = createAction(CHANGE_INPUT);
export const initializeForm = createAction(INITIALIZE_FORM);
export const checkEmailExists = createAction(
  CHECK_EMAIL_EXISTS,
  AuthAPI.checkEmailExists
);
export const checkUsernameExists = createAction(
  CHECK_USERNAME_EXISTS,
  AuthAPI.checkUsernameExists
);
export const localRegister = createAction(
  LOCAL_REGISTER,
  AuthAPI.localRegister
);
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin);
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const setError = createAction(SET_ERROR);
export const providerLogin = createAction(
  PROVIDER_LOGIN,
  provider => social[provider](),
  provider => provider
);
export const toggleAnimation = createAction(TOGGLE_ANIMATE);
export const socialLogin = createAction(SOCIAL_LOGIN, AuthAPI.socialLogin);
export const socialRegister = createAction(
  SOCIAL_REGISTER,
  AuthAPI.socialRegister
);
export const getCode = createAction(GET_CODE, AuthAPI.getCode);
export const resetCode = createAction(RESET_CODE, AuthAPI.resetCode);

const initialState = {
  register: {
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    exists: {
      email: false,
      username: false,
      code: "",
      auth_message: "",
      resetcode: false,
    },
    error: null,
  },
  login: {
    email: "",
    password: "",
    status: "",
    error: null,
  },
  result: {},
  animate: false,
  social: {
    accessToken: null,
    provider: null,
    registered: null,
  },
};

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) =>
      produce(state, draft => {
        const { form, name, value } = action.payload;
        draft[form][name] = value;
      }),
    [INITIALIZE_FORM]: (state, action) =>
      produce(state, draft => {
        const initialForm = action.payload; //string : login
        draft.initialForm = initialState;
      }),
    ...pender({
      type: CHECK_EMAIL_EXISTS,
      onSuccess: (state, action) =>
        produce(state, draft => {
          draft.register.exists.email = action.payload.data.exists;
        }),
    }),
    ...pender({
      type: CHECK_USERNAME_EXISTS,
      onSuccess: (state, action) =>
        produce(state, draft => {
          draft.register.exists.username = action.payload.data.exists;
        }),
    }),
    ...pender({
      type: LOCAL_LOGIN,
      onSuccess: (state, action) =>
        produce(state, draft => {
          draft.result = action.payload.data;
        }),
    }),
    ...pender({
      type: LOCAL_REGISTER,
      onSuccess: (state, action) =>
        produce(state, draft => {
          draft.register.exists.confirming = action.payload.data;
          //draft.result = action.payload.data;
          //action.payload.data = account.profile
        }),
    }),
    [SET_ERROR]: (state, action) =>
      produce(state, draft => {
        const { form, message } = action.payload;
        draft[form].error = message;
      }),
    [TOGGLE_ANIMATE]: (state, action) =>
      produce(state, draft => {
        draft.animate = !action.payload;
      }),
    ...pender({
      type: PROVIDER_LOGIN,
      onSuccess: (state, action) =>
        produce(state, draft => {
          const { payload, meta } = action;
          draft.social.accessToken = payload;
          draft.social.provider = meta;
        }),
    }),
    ...pender({
      type: SOCIAL_LOGIN,
      onSuccess: (state, action) =>
        produce(state, draft => {
          if (action.payload.status === 204) {
            return (draft.social.registered = false);
          }
          draft.result = action.payload.data;
          draft.social.registered = true;
        }),
    }),
    ...pender({
      type: SOCIAL_REGISTER,
      onSuccess: (state, action) =>
        produce(state, draft => {
          draft.result = action.payload.data;
        }),
    }),
    ...pender({
      type: GET_CODE,
      onSuccess: (state, action) =>
        produce(state, draft => {
          draft.register.exists.code = action.payload.data.code;
          draft.register.exists.auth_message = action.payload.data.message;
        }),
    }),
    ...pender({
      type: RESET_CODE,
      onSuccess: (state, action) =>
        produce(state, draft => {
          draft.register.exists.resetcode = action.payload.data;
        }),
    }),
  },
  initialState
);
