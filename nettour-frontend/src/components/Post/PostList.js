import React, { Component } from 'react';
import { PostCard }  from 'components/Post';
import { PostListCss } from 'css/PostList';


//let result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45);
//console.log(result);

const PostList = ({posts}) => {

    const postlist = posts.map(
        (post) =>(
            <PostCard key={post._id} post={post} />
        )
    ); 

   
    return (
        <PostListCss className="postlist">
            {postlist}
        </PostListCss>
    );
};

export default PostList;






