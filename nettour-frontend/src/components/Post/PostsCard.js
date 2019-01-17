import React from 'react';
import { PostsCardCss, PostsThumbnailCss, RadiusMaskCss, ImageholderCss } from 'css/PostsCard';
import UserThumbnail from 'components/Base/Header/UserThumbnail';
import  IoIosImage  from 'react-icons/lib/io/image';
// import { IoIosImages } from 'react-icons/io'

import { PostsCardContent } from 'components/Post';





const PostsCard = ( { post } ) => {
    const { _id, username, title, content, createdAt, comments, url_slug, user_thumbnail} = post;
    
    return (
        <PostsCardCss className="postcard">
            <PostsThumbnailCss to={`@${username}/${url_slug}`}>
                <ImageholderCss>
                    <IoIosImage/> 
                    <RadiusMaskCss className="radius"/>      
                
                </ImageholderCss>               
                
            </PostsThumbnailCss> 
            <PostsCardContent title={title} thumnail={user_thumbnail} date={createdAt} count={comments.length}/>       
        
        </PostsCardCss>
        

    );
};

export default PostsCard;
