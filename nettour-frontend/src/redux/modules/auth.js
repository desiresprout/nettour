import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as AuthAPI from 'lib/api/auth';
import { pender } from 'redux-pender';
import social from 'lib/social';


const CHANGE_INPUT = 'auth/CHANGE_INPUT'; // input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화
const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS'; // 이메일 중복 확인
const CHECK_USERNAME_EXISTS = 'auth/CHECK_USERNAME_EXISTS'; // 아이디 중복 확인
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER'; // 이메일 가입
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN'; // 이메일 로그인
const LOGOUT = 'auth/LOGOUT'; // 로그아웃
const SET_ERROR = 'auth/SET_ERROR'; // 오류 설정
const PROVIDER_LOGIN = 'auth/PROVIDER_LOGIN';
const TOGGLE_ANIMATE = 'auth/TOGGLE_ANIMATE'; // 애니메이션 토글

const SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN'; // 소셜 로그인
const SOCIAL_REGISTER = 'auth/SOCIAL_REGISTEER'; // 소셜 회원가입

export const changeInput = createAction(CHANGE_INPUT); //  { form, name, value }
export const initializeForm = createAction(INITIALIZE_FORM); // form 
export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists); // email
export const checkUsernameExists = createAction(CHECK_USERNAME_EXISTS, AuthAPI.checkUsernameExists); // username
export const localRegister = createAction(LOCAL_REGISTER, AuthAPI.localRegister); // { email, username, password }
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin); // { email, password }
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const setError = createAction(SET_ERROR); // { form, message }
export const providerLogin = createAction(PROVIDER_LOGIN, (provider)=>social[provider](), provider=>provider);
export const toggleAnimation = createAction(TOGGLE_ANIMATE);

export const socialLogin = createAction(SOCIAL_LOGIN, AuthAPI.socialLogin); // { provider, accessToken }
export const socialRegister = createAction(SOCIAL_REGISTER, AuthAPI.socialRegister); // { provider, accessToken, username }

const initialState = {
    register: {        
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',        
        exists: {
            email: false,
            username: false
        },
        error: null
    },

    login: {
        email: '',
        password: '',        
        error: null
    },
    result: {},
    animate: false,
    social:{
        accessToken : null,
        provider : null,
        registered : null

    },
};

export default handleActions({

    [CHANGE_INPUT]: (state, action) => produce(state,draft => {
        const { form, name, value } = action.payload;
        draft[form][name] = value;          
    }),         
    [INITIALIZE_FORM]: (state, action) => produce(state,draft => {
        const initialForm = action.payload;  //string : login
        draft.initialForm = initialState;       
    }),
    ...pender({
        type: CHECK_EMAIL_EXISTS,
        onSuccess: (state, action) => produce(state, draft => {
        draft.register.exists.email = action.payload.data.exists;    
        }),
    }),
    ...pender({
        type: CHECK_USERNAME_EXISTS,
        onSuccess: (state, action) => produce(state, draft => {
            draft.register.exists.username = action.payload.data.exists;  
        }),           
    }),
    ...pender({
        type: LOCAL_LOGIN,
        onSuccess: (state, action) => produce(state, draft => {
            draft.result = action.payload.data;
        }),                       
    }),
    ...pender({
        type: LOCAL_REGISTER,
        onSuccess: (state, action) => produce(state, draft => {
            draft.result = action.payload.data;  
        }),
    }),
    [SET_ERROR]: (state, action) => produce(state, draft => {
        const { form , message } = action.payload;            
        draft[form].error = message;  
    }),
    [TOGGLE_ANIMATE]: (state, action) => produce(state, draft =>{
        draft.animate = !action.payload;
    }),    
    ...pender({
        type: PROVIDER_LOGIN,
        onSuccess: (state, action) => produce(state, draft => {
            const { payload, meta } = action;
            draft.social.accessToken = payload;
            draft.social.provider = meta;  
        }),
    }),   
    ...pender({
        type: SOCIAL_LOGIN,
        onSuccess: (state, action) =>  produce(state, draft => {
            if(action.payload.status ===204 ){
                return draft.social.registered = false;
            }
            draft.result = action.payload.data;
            draft.social.registered = true;
        })
    }),       
    ...pender({
        type: SOCIAL_REGISTER,
        onSuccess: (state, action) => produce(state, draft => {
            draft.result = action.payload.data;
        }),        
    })    
    
}, initialState);