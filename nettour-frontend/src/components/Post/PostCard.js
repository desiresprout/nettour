import React from 'react';
import { PostCardCss, PostThumbnailCss, RadiusMaskCss, ImageholderCss } from 'css/PostCard';
import UserThumbnail from 'components/Base/Header/UserThumbnail';
import { IoIosImage } from 'react-icons/io';
import { PostCardContent } from 'components/Post';





const PostCard = ( { post } ) => {
    const { likesCount, likes, _id, count, username, content, createdAt, comments } = post;

    //<img src={`/api/users/${username}/thumbnail`}/>
    return (
        <PostCardCss className="postcard">
            <PostThumbnailCss to={username}>
                <ImageholderCss>
                    <IoIosImage/>
                    <RadiusMaskCss/>      
                
                </ImageholderCss>               
                
            </PostThumbnailCss> 
            <PostCardContent/>       
        
        </PostCardCss>
        

    );
};

export default PostCard;
