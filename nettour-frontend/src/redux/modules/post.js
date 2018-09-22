import { handleActions, createAction } from 'redux-actions';
import * as PostsAPI from 'lib/api/post';
import { pender } from 'redux-pender';
import produce from 'immer';

const LOAD_POST = 'posts/LOAD_POST'; // 포스트 리스트 초기 로딩

export const loadPost = createAction(LOAD_POST, PostsAPI.list);

const initialState ={
    next: '',
    data: [],    
    

};

export default handleActions({
    ...pender({
        type: LOAD_POST,
        onSuccess: (state, action) => {
            return produce(state, (draft) => {
                const { next, data } = action.payload.data;
                draft.next = next;
                draft.data = data;
              });           
        }
    })
}, initialState);

