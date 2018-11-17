import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Fromnow } from 'lib/common';

import { PostcommentCss, Comment_headCss, Comment_InfoCss,Comment_DateCss, Comment_bodyCss } from 'css/PostComments';

class PostComment extends Component {
    

    render() {
        const { username, comment, date } = this.props;

        return (
            <PostcommentCss>
                <Comment_headCss>
                    <Comment_InfoCss>
                        <Link to= {'/'} />
                        <Comment_DateCss>{Fromnow(date)}</Comment_DateCss>
                    </Comment_InfoCss>
                </Comment_headCss>

                <Comment_bodyCss>
                    <div>댓글 렌더링</div>
                
                </Comment_bodyCss>
                
            </PostcommentCss>
        );
    }
}

export default PostComment;