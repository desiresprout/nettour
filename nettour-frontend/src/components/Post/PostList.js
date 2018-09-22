import React, { Component } from 'react';
import { PostCard }  from 'components/Post';
import { PostListCss } from 'css/PostList';
import { PostCardCss } from 'css/PostCard';


const PostList = ({posts}) => {

    const postlist = posts.map(
        (post) =>(
            <PostCard key={post._id} post={post} />
        )
    ); 

   
    return (
        <PostCardCss>
            {postlist}
        </PostCardCss>
    );
};

export default PostList;






