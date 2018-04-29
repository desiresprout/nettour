import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_MENU_VISIBILITY = 'base/SET_MENU_VISIBILITY'; // 헤더 렌더링 여부 설정

export const setMenuVisibility = createAction(SET_MENU_VISIBILITY); // visible

const initialState = Map({
    menu: Map({
        visible: true
    })
});

export default handleActions({
    [SET_MENU_VISIBILITY]: (state, action) => state.setIn(['menu', 'visible'], action.payload)
}, initialState);