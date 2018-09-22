import React from 'react';
import { PostCardCss, PostThumnailCss, RadiusMaskCss, } from 'css/PostCard';
import { CardContentCss, UserThunmnailCss, ContentHeadCss, } from 'css/PostCardContent';
import UserThumbnail from 'components/Base/Header/UserThumbnail';

const PostCard = ( { post } ) => {
    const { likesCount, likes, _id, count, username, content, createdAt, comments } = post;

   
    //<PostThumnailCss image={`/api/users/${username}/thumbnail`}/>
    return (
        <PostCardCss>
            
        
        
        </PostCardCss>
        

    );
};

export default PostCard;
