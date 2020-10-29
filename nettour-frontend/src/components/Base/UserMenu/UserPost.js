import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import oc from "open-color";
import { Fromnow } from "lib/common";

const UserPostWrapper = styled.div`
  width: calc(33%);
  display: flex;
  flex-direction: column;
  margin: 0.8rem;
  box-shadow: 0 4px 8px 0 #808080;
  transition: 0.3s;
  border-radius: 5px;
  h2 {
    font-size: 1.3rem;
    margin: 0;
    font-weight: 600;
    a {
      cursor: pointer;
    }
  }
  p {
    margin: 0;
    margin-top: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    font-weight: 400;
    color: blue;
  }
`;

const UserSubWrapper = styled.div`
  margin-top: 0.8rem;
  span {
    &.padding {
      &:before {
        content: "·";
        padding-left: 1rem;
      }
    }
  }
`;

const UserPost = ({ post, username }) => {
  const { title, content, createdAt, likesCount, url_slug } = post;

  const link = `/@${username}/${url_slug}`;
  console.log(content);
  return (
    <UserPostWrapper className="userpost">
      <h2>
        <Link to={link}>{title}</Link>
      </h2>
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
      <UserSubWrapper>
        <span>{Fromnow(createdAt)}</span>
        <span className="padding">좋아요 : {likesCount}</span>
      </UserSubWrapper>
    </UserPostWrapper>
  );
};

export default UserPost;
