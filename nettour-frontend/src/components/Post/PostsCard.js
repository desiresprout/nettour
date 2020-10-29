import React from "react";
import {
  PostsCardCss,
  PostsThumbnailCss,
  RadiusMaskCss,
  ImagePlaceholder,
} from "css/PostsCard";
import UserThumbnail from "components/Base/Header/UserThumbnail";
import IoIosImage from "react-icons/lib/io/image";
import { PostsCardContent } from "components/Post";

const PostsCard = ({ post }) => {
  const {
    username,
    title,
    content,
    createdAt,
    comments,
    url_slug,
    thumbnail,
  } = post;

  return (
    <PostsCardCss className="postcard">
      <PostsThumbnailCss
        className="postsThumnbail"
        to={`@${username}/${url_slug}`}
      >
        {thumbnail == "no" ? (
          <ImagePlaceholder>
            <IoIosImage />
          </ImagePlaceholder>
        ) : (
          <img src={thumbnail} />
        )}
        <RadiusMaskCss className="radius" />
      </PostsThumbnailCss>

      <PostsCardContent
        title={title}
        date={createdAt}
        count={comments.length}
      />
    </PostsCardCss>
  );
};

export default PostsCard;
