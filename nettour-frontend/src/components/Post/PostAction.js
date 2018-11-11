import React from 'react';
import { PostActionCss} from 'css/PostAction';
import { Link } from 'react-router-dom';
import { ButtonCss} from 'css/common';

const PostAction = (id, onaskmove) => {
    return (
        <PostActionCss>
            <Link to={"/write?edit=${id}"} > 수정 </Link>

            <ButtonCss action onclick={onaskmove}> 삭제 </ButtonCss>

        </PostActionCss>
        
    );
};

export default PostAction;