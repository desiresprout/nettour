import React, { Component } from 'react';
import { PostsCard }  from 'components/Post';
import { PostsListCss } from 'css/PostsList';


//let result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45);
//console.log(result);

const PostsList = ({posts}) => {

    const postlist = posts.map(
        (post) =>(
            <PostsCard key={post._id} post={post} />
        )
    ); 

   
    return (
        <PostsListCss className="postlist">
            {postlist}
        </PostsListCss>
    );
};

export default PostsList;






