import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Airplane from "react-icons/lib/md/airplanemode-active";
import {
  HomeWrapperCss,
  MenubarCss,
  MenuLiCss,
  FontCss,
  CommentBoxCss,
} from "css/Home";
const HomePage = () => {
  return (
    <HomeWrapperCss>
      <MenubarCss>
        <MenuLiCss first>
          <Link to="/">
            <Airplane />
          </Link>
        </MenuLiCss>
        <MenuLiCss second>
          <Link to="/">About</Link>
        </MenuLiCss>
        <MenuLiCss>
          <Link to="/main">Our Posts</Link>
        </MenuLiCss>
      </MenubarCss>
      <FontCss>Net ToUR</FontCss>
      <CommentBoxCss>
        <p>여행경험을 공유해보세요</p>
      </CommentBoxCss>
    </HomeWrapperCss>
  );
};

export default HomePage;
