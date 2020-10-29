import React from "react";
import styled from "styled-components";
import { UserPost } from "components/Base/UserMenu";

const UserPostListWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const UserPostList = ({ userpost, username }) => {
  const List = userpost.map(post => (
    <UserPost key={post._id} post={post} username={username} />
  ));
  return (
    <UserPostListWrapper className="userpostlist">{List}</UserPostListWrapper>
  );
};

export default UserPostList;
