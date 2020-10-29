import React, { Component, Fragment } from "react";
import {
  PostBodyCss,
  PostHeadCss,
  UserdisplayCss,
  UserInfoCss,
  Date_likes_number,
  LikesWrapper,
  Likes,
} from "css/PostBody";
import { Fromnow } from "lib/common";
import { Link } from "react-router-dom";
import { SeparatorCss } from "css/Separator";
import { PostAction } from "components/Post";
import FaThumbsOUp from "react-icons/lib/fa/thumbs-o-up";
import FaThumbsUp from "react-icons/lib/fa/thumbs-up";
import Tooltip from "react-tooltip";

class PostBody extends Component {
  render() {
    const {
      title,
      likesCount,
      date,
      username,
      own,
      id,
      onremovepost,
      onToggleLike,
      liked,
      logged,
    } = this.props;

    return (
      <PostBodyCss className="PostBody">
        <PostHeadCss className="PostHead">
          <UserdisplayCss className="Userdisplay">
            <UserInfoCss>
              <Link to={`/@${username}`}> 작성자 : {username}</Link>
            </UserInfoCss>
          </UserdisplayCss>
          <h1>{title}</h1>
          <Date_likes_number className="Date">
            <LikesWrapper className="likes_wrapper">
              <Likes
                className="likes"
                onClick={onToggleLike}
                {...(logged
                  ? {}
                  : {
                      "data-tip": "로그인 후 눌러주세요",
                    })}
              >
                {liked ? <FaThumbsUp /> : <FaThumbsOUp />}
              </Likes>
              <h3>{likesCount}</h3>
            </LikesWrapper>
            <h3>{Fromnow(date)}</h3>
          </Date_likes_number>
          <SeparatorCss />
          {own && <PostAction id={id} onremovepost={onremovepost} />}
        </PostHeadCss>
        <Tooltip effect="solid" className="tooltip" />
      </PostBodyCss>
    );
  }
}

export default PostBody;
