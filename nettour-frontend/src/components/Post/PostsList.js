import React, { Component } from "react";
import { PostsCard } from "components/Post";
import { PostsListCss } from "css/PostsList";

const PostsList = ({ posts }) => {
  const postlist = posts.map(post => <PostsCard key={post._id} post={post} />);

  return <PostsListCss className="postlist">{postlist}</PostsListCss>;
};

export default PostsList;
