import React, { Fragment } from 'react';
import { PostHeadCss } from 'css/PostHead';
import { Link } from 'react-router-dom';

const PostHead = ({ }) => {   
    
    return (
        <Fragment>
            <PostHeadCss className="PostHead">
                  <Link to="/">
                    NeT ToUR
                  </Link>
            
            </PostHeadCss>
        </Fragment>
    );
};

export default PostHead;