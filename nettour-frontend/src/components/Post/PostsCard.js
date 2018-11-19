import React from 'react';
import { PostsCardCss, PostsThumbnailCss, RadiusMaskCss, ImageholderCss } from 'css/PostsCard';
import UserThumbnail from 'components/Base/Header/UserThumbnail';
import { IoIosImage } from 'react-icons/io';

import { PostsCardContent } from 'components/Post';





const PostsCard = ( { post } ) => {
    const { likesCount, likes, _id, count, username, content, createdAt, comments, url_slug} = post;

    //<img src={`/api/users/${username}/thumbnail`}/>
    return (
        <PostsCardCss className="postcard">
            <PostsThumbnailCss to={url_slug}>
                <ImageholderCss>
                    
                    <RadiusMaskCss/>      
                
                </ImageholderCss>               
                
            </PostsThumbnailCss> 
            <PostsCardContent/>       
        
        </PostsCardCss>
        

    );
};

export default PostsCard;
