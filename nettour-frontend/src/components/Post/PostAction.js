import React from "react";
import { PostActionCss } from "css/PostAction";
import { Link } from "react-router-dom";
import { ButtonCss } from "css/common";

const PostAction = ({ id, onremovepost }) => {
  return (
    <PostActionCss>
      <Link to={`/write?id=${id}`}> 수정 </Link>

      <ButtonCss action onClick={onremovepost}>
        {" "}
        삭제{" "}
      </ButtonCss>
    </PostActionCss>
  );
};

export default PostAction;
