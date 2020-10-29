import React, { Component } from "react";
import {
  CardContentCss,
  UserThunmnailCss,
  ContentHeadCss,
  UsernameCss,
  SubinfoCss,
  DescriptionCss,
} from "css/PostsCardContent";
import { Link } from "react-router-dom";
import { Fromnow } from "lib/common";

const PostsCardContent = ({ username, title, date, count }) => {
  return (
    <CardContentCss>
      <UserThunmnailCss to="/">
        <img src="static/images/thumbnail.png" />
      </UserThunmnailCss>

      <ContentHeadCss>
        <UsernameCss to="/" />
        <h3>
          {" "}
          <Link to="/"> {title} </Link>{" "}
        </h3>
        <SubinfoCss>
          <span>{Fromnow(date)}</span>
          <span className="a">댓글 : {count}</span>
        </SubinfoCss>
      </ContentHeadCss>

      <DescriptionCss />
    </CardContentCss>
  );
};

export default PostsCardContent;
