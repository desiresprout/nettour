import { handleActions, createAction, createActions } from 'redux-actions';
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

const WRITE_COMMENT = 'posts/WRITE_COMMENT';
const READ_COMMENTS = 'posts/READ_COMMENTS';
const TOGGLE_COMMENT = 'posts/TOGGLE_COMMENT'; // 덧글 창 열고 닫기
const CHANGE_COMMENT_INPUT = 'posts/CHANGE_COMMENT_INPUT'; // 덧글 인풋 수정



//export const reset = createAction(RESET);
export const changetitle = createAction(CHANGE_TITLE);
export const changecontent = createAction(CHANGE_CONTENT);
export const fulllist = createAction(FULL_POST, PostsAPI.fulllist);
export const writepost = createAction(WRITE_POST, PostsAPI.writepost);
export const readpost = createAction(READ_POST, PostsAPI.readpost);

export const toggleaskremove = createAction(TOGGLE_ASK_REMOVE);
export const writecomment = createAction(WRITE_COMMENT, PostsAPI.writecomment);
export const readcomment = createAction(READ_COMMENTS, PostsAPI.readcomment);
export const togglecomment = createAction(TOGGLE_COMMENT); // postId
export const changecommentinput = createAction(CHANGE_COMMENT_INPUT); // { postId, value }




const initialState ={
    next: '',
    data: [],
    askpostremove : false,
    readpost : {
        postid : '',
        title : '',
        username : '',
        content : '',       
        likesCount:'',
        date:'',
        comment : {
            visible : false,
            comments : [],                
        },        
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
        onSuccess: (state, action) => produce(state, (draft) => {
                //console.log(action.payload.data);
                 const { _id, likesCount, username, title, content, createdAt, comments} = action.payload.data;
                 draft.readpost.postid = _id;
                 draft.readpost.title = title;
                 draft.readpost.username = username;                
                 draft.readpost.content = content;
                 draft.readpost.likesCount = likesCount;
                 draft.readpost.date = createdAt; 
                 draft.readpost.comment.comments = comments;                
        }),        
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
            askpostremove : !state.askpostremove,
        }
    },

    [TOGGLE_COMMENT]: (state, action) => produce(state, draft => {       
        const comment = draft.readpost.comment.postid;
        if(comment){
            draft.readpost.comment.visible = !draft.readpost.comment.visible;
        }
        draft.readpost.comment.visible = true;
        draft.readpost.comment.comments = '';
      }), 
      
      ...pender({
        type: WRITE_COMMENT,
        onSuccess: (state, action) => produce(state, draft => {
          //const { comments } = action.payload.data;      
          draft.readpost.comments.comments = action.paylad.data.comments;
        }),
        
    }), 

    ...pender({
        type: READ_COMMENTS,
        onSuccess: (state, action) => produce(state, draft => {
        console.log(action.payload.data);
         // const { comments } = action.payload.data;      
          draft.readpost.comment.comments = action.paylad.data.comments;
        }),
        
    }), 
   
          

}, initialState);

