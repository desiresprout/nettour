import { handleActions, createAction} from 'redux-actions';
import * as PostsAPI from 'lib/api/post';
import { pender } from 'redux-pender';
import produce from 'immer';

const POST_LISTS = 'posts/POST_LISTS'; 
const READ_POST = 'posts/READ_POST';
//const RESET = 'posts/INITIALIZE';
const CHANGE_TITLE = 'posts/CHANGE_TITLE';
const CHANGE_CONTENT = 'posts/CHANGE_CONTENT';
const WRITE_POST = 'posts/WRITE_POST';
const WRITE_COMMENT = 'posts/COMMENT_WRITE';
const EDIT_COMMENT = 'posts/EDIT_COMMENT';
const CHANGE_COMMENT_INPUT = 'posts/CHANGE_COMMENT_INPUT'; // 덧글 인풋 수정
const GET_POST = 'posts/GET_POST';
const EDIT_POST = 'posts/EDIT_POST';
const REMOVE_POST = 'posts/REMOVE_POST';
const REMOVE_COMMENT = 'posts/REMOVE_COMMENT';
const CREATE_URL = 'posts/CREATE_URL';

const LIKE_POST = 'posts/LIKE_POST'; 
const UNLIKE_POST = 'posts/UNLIKE_POST';

//export const reset = createAction(RESET);
export const changetitle = createAction(CHANGE_TITLE);
export const changecontent = createAction(CHANGE_CONTENT);
export const postlists = createAction(POST_LISTS, PostsAPI.postlists);
export const writepost = createAction(WRITE_POST, PostsAPI.writepost);
export const readpost = createAction(READ_POST, PostsAPI.readpost);
export const writecomment = createAction(WRITE_COMMENT, PostsAPI.writecomment);
export const editcomment = createAction(EDIT_COMMENT, PostsAPI.editcomment);
export const changecommentinput = createAction(CHANGE_COMMENT_INPUT); // { postId, value }
export const getpost = createAction(GET_POST, PostsAPI.getpost);
export const editpost = createAction(EDIT_POST, PostsAPI.editpost);
export const removepost = createAction(REMOVE_POST, PostsAPI.removepost);
export const removecomment =  createAction(REMOVE_COMMENT, PostsAPI.removecomment);
export const createurl = createAction(CREATE_URL,PostsAPI.createurl);

export const likePost = createAction(LIKE_POST, PostsAPI.likePost); 
export const unlikePost = createAction(UNLIKE_POST, PostsAPI.unlikePost); 

const initialState ={
    next: '',
    data: [],   
    readpost : {
        postid : '',
        title : '',
        username : '',
        content : '',       
        likesCount:'',
        liked : false,
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
        status : false,
        upload:{
            thumbnailURL : '',
            imagepath : '',
            status : false,            
        },
    },
    given:{        
        url_slug:'',
        error:'',
    },    
};

export default handleActions({
    ...pender({
        type: POST_LISTS,
        onSuccess: (state, action) =>  produce(state, draft => {
                const { next, data } = action.payload.data;
                draft.next = next;
                draft.data = data;                
        }),                 
    }),
    ...pender({
        type: READ_POST,
        onSuccess: (state, action) => produce(state, draft => {                                     
                 const { _id , username, title, content, createdAt, comments, likesCount} = action.payload.data.post;
                 draft.readpost.postid = _id;
                 draft.readpost.title = title;
                 draft.readpost.username = username;                
                 draft.readpost.content = content;                 
                 draft.readpost.date = createdAt; 
                 draft.readpost.comment.comments = comments;
                 draft.readpost.likesCount = likesCount;
                 
                 draft.readpost.liked = action.payload.data.liked;
        }),        
        onFailure: (state, action) => produce(state, draft => {       
          draft.given.error = action.payload;
        }),
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

      ...pender({
        type: WRITE_COMMENT,
        onSuccess: (state, action) => produce(state, draft => {
          const { comments } = action.payload.data;
          draft.readpost.comment.comments = comments;
        }),       
    }), 

    ...pender({
        type: EDIT_COMMENT,
        onSuccess: (state, action) => produce(state, draft => {
          const { comments } = action.payload.data;   
          draft.readpost.comment.comments = comments;
        }),       
    }), 

    ...pender({
        type: GET_POST,
        onSuccess: (state, action) => produce(state, draft => {               
                 const { _id , title, content, createdAt } = action.payload.data;                 
                 draft.editor.postid = _id;
                 draft.editor.title = title;
                 draft.editor.content = content;
                 draft.editor.date = createdAt;
                 
                            
        }),        
        onFailure: (state, action) => produce(state, draft => {       
          draft.given.error = action.payload.data;
        }),
    }),
    ...pender({
        type: EDIT_POST,
        onSuccess: (state, action) => produce(state, draft => {               
                 const { _id, username, title, content, createdAt, url_slug} = action.payload.data;
                 draft.readpost.postid = _id;
                 draft.readpost.title = title;
                 draft.readpost.username = username;                
                 draft.readpost.content = content;                
                 draft.readpost.date = createdAt; 
                 draft.given.url_slug = url_slug;           
        }),        
        onFailure: (state, action) => produce(state, draft => {       
          draft.given.error = action.payload.data;
        }),
    }), 

    ...pender({
        type: REMOVE_COMMENT,
        onSuccess: (state, action) => produce(state, draft => {                         
                 const { comments } = action.payload.data;
                 draft.readpost.comment.comments = comments;
                                 
        }),        
        onFailure: (state, action) => produce(state, draft => {       
          draft.given.error = action.payload;
        }),
    }),
    
    ...pender({
        type: CREATE_URL,
        onSuccess: (state, action) => produce(state, draft => {              
            draft.editor.upload.thumbnailURL = action.payload.data.url;
            draft.editor.upload.status = action.payload.data.status;
            draft.editor.upload.imagepath = action.payload.data.imagepath;                                           
        }),        
     }),

    ...pender({
        type: LIKE_POST,
        onPending : (state, action) => produce(state, draft=>{
            
            draft.readpost.liked = true;
            draft.readpost.likesCount +=1;
        }), 
             
        onSuccess: (state, action) => produce(state, draft=>{
            console.log(action.payload.data.likesCount);            
            draft.readpost.likesCount = action.payload.data.likesCount;
            draft.readpost.liked = action.payload.data.liked;
        }), 
    }),

    ...pender({
        type: UNLIKE_POST,
        onPending : (state, action) => produce(state, draft=>{
            draft.readpost.liked = false;
            draft.readpost.likesCount -=1;
        }),         
        onSuccess: (state, action) => produce(state, draft=>{
            console.log(action.payload.data.likesCount);
            draft.readpost.likesCount = action.payload.data.likesCount;
            draft.readpost.liked = action.payload.data.liked;
        }), 
    }),

    [CHANGE_TITLE]: (state, action) => produce(state, draft => {    
        draft.editor.title = action.payload;  
    }),
    
    [CHANGE_CONTENT]: (state, action) => produce(state, draft => {          
        draft.editor.content = action.payload;
          
    }),   
   
          

}, initialState);

