import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as EditorAPI from 'lib/api/editor';
import produce from 'immer';

const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_TITLE = 'editor/CHANGE_TITLE';
const CHANGE_CONTENT = 'editor/CHANGE_CONTENT';

const WRITE_POST = 'editor/WRITE_POST';
const GET_POST = 'editor/GET_POST';
const EDIT_POST = 'editor/EDIT_POST';


export const initialize = createAction(INITIALIZE);
export const changetitle = createAction(CHANGE_TITLE);
export const changecontent = createAction(CHANGE_CONTENT);


export const writepost = createAction(WRITE_POST, EditorAPI.writePost);



const initialState = {
  title: '',
  content: '',
  state:'',
  username:'',
  url_slug:'',
  error: '',
};


export default handleActions({
  //[INITIALIZE]: (state, action) => initialState,
  [CHANGE_TITLE]: (state, action) => produce(state, draft => {    
    draft.title = action.payload    
  }),

  [CHANGE_CONTENT]: (state, action) => produce(state, draft => {
    const { HTML, EDITORSTATE } = action.payload;  
    draft.content = action.payload.HTML,
    draft.state = action.payload.EDITORSTATE  
  }),


  ...pender({
    type: WRITE_POST,
    onSuccess: (state, action) => produce(state, draft => {
      const { username, url_slug } = action.payload.data;
      //console.log(action.payload.data);
      draft.username = username,
      draft.url_slug = url_slug;
    }),
    onFailure: (state, action) => produce(state, draft => {       
      draft.error = action.payload;
    }),
  })

}, initialState)