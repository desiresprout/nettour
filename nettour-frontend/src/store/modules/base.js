import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY'; // 헤더 렌더링 여부 설정
const SET_USER_MENU_VISIBILITY = 'base/SET_USER_MENU_VISIBILITY'; // 유저메뉴 렌더링 여부 설정

const SET_NOTIFY_HIDE = 'base/SET_NOTIFY_HIDE';
const SET_NOTIFY_SHOW = 'base/SET_NOTIFY_SHOW';

export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY); // visible
export const setUserMenuVisibility = createAction(SET_USER_MENU_VISIBILITY); // visible

export const sethide = createAction(SET_NOTIFY_HIDE);
export const setshow = createAction(SET_NOTIFY_SHOW );

const initialState = {
    header: {
        visible: true
    },
    userMenu: {
        visible: false
    },
    notify:{
        code: null,
        message: null,
        watch: false,
    }
};

export default handleActions({
    [SET_HEADER_VISIBILITY]: (state, action) => produce(state, draft => {    
        draft.header.visible= action.payload;
      }),
    [SET_USER_MENU_VISIBILITY]: (state, action) => produce(state,draft => {
       draft.userMenu.visible = action.payload;
    }),
    [SET_NOTIFY_HIDE]: (state, action) => produce(state, draft => {
        draft.notify.watch = false;
     }),
     [SET_NOTIFY_SHOW]: (state, action) => produce(state, draft => {
        draft.notify.code = action.payload.code;
        draft.notify.message = action.payload.message;
        draft.notify.watch = true;
     }),
    

}, initialState);