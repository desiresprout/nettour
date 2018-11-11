import { handleActions, createAction } from 'redux-actions';
import * as PostsAPI from 'lib/api/post';
import { pender } from 'redux-pender';
import produce from 'immer';

const FULL_POST = 'posts/FULL_POST'; // 포스트 리스트 초기 로딩
const READ_POST = 'posts/READ_POST';

//const RESET = 'posts/INITIALIZE';
const CHANGE_TITLE = 'posts/CHANGE_TITLE';
const CHANGE_CONTENT = 'posts/CHANGE_CONTENT';
const WRITE_POST = 'posts/WRITE_POST';
const GET_POST = 'posts/GET_POST';
const EDIT_POST = 'posts/EDIT_POST';
const TOGGLE_ASK_REMOVE = 'posts/TOGGLE_ASK_REMOVE';


//export const reset = createAction(RESET);
export const changetitle = createAction(CHANGE_TITLE);
export const changecontent = createAction(CHANGE_CONTENT);
export const fulllist = createAction(FULL_POST, PostsAPI.fulllist);
export const writepost = createAction(WRITE_POST, PostsAPI.writepost);
export const readpost = createAction(READ_POST, PostsAPI.readpost);

export const toggleaskremove = createAction(TOGGLE_ASK_REMOVE);


const initialState ={
    next: '',
    data: [],
    readpost : {
        title : '',
        username : '',
        content : '',       
        likesCount:'',
        date:'',
    },    
    editor:{
        title: '',
        content: '',              
        error: '',
    },
    given:{        
        url_slug:'',
        error:'',
    },
    askremove : false,
};

export default handleActions({
    ...pender({
        type: FULL_POST,
        onSuccess: (state, action) => {
            return produce(state, (draft) => {
                const { next, data } = action.payload.data;
                //console.log(data);
                draft.next = next;
                draft.data = data;                
              });           
        }
    }),
    ...pender({
        type: READ_POST,
        onSuccess: (state, action) => {
            return produce(state, (draft) => {
                //console.log(action.payload.data);
                 const { likesCount, username, title, content, state, createdAt} = action.payload.data;
                 draft.readpost.title = title;
                 draft.readpost.username = username;                
                 draft.readpost.content = content;
                 draft.readpost.likesCount = likesCount;
                 draft.readpost.date = createdAt; 
                 
              });           
        },
        onFailure: (state, action) => produce(state, draft => {       
          draft.given.error = action.payload;
        }),
    }),

    [CHANGE_TITLE]: (state, action) => produce(state, draft => {    
        draft.editor.title = action.payload;  
    }),
    
    [CHANGE_CONTENT]: (state, action) => produce(state, draft => {          
        draft.editor.content = action.payload;
          
    }),
    
    ...pender({
        type: WRITE_POST,
        onSuccess: (state, action) => produce(state, draft => {
          const { username, url_slug } = action.payload.data;      
          draft.given.url_slug = url_slug;
    }),
        onFailure: (state, action) => produce(state, draft => {       
          draft.given.error = action.payload;
        }),
      }),

    [TOGGLE_ASK_REMOVE]: (state, action) =>{
        return {
            ...state,
            askremove : !state.askremove,
        }
    },
          

}, initialState);

