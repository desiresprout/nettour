import React from 'react';
import * as postActions from 'redux/modules/post';
import { Link } from 'react-router-dom';
import { PostCommentsCss, Comment_InputCss, Ask_login, Comment_listCss} from 'css/PostComments';
import { PostComment } from 'components/Post';


const PostComments = ({ onEditComment, commentsCount, commentinput, logged, comments, currentusername, onRemoveComment}) => (
  <PostCommentsCss className="PostComments">
    <h3>{commentsCount}개의 댓글</h3>
    <Comment_InputCss className="comment_input">{commentinput}</Comment_InputCss>
    { !logged && (
      <Ask_login className="ask-login">
        <Link to={`/auth/login`}>로그인</Link> 후 댓글을 작성하세요.
      </Ask_login>
    )}
    <Comment_listCss className="comment-list">
      {comments &&
        comments.map((comment,i) => {
          return (
            <PostComment  
               key = {comment.i}
               username = {comment.username}
               comment = {comment.comment}
               commentid = {comment._id}
               date = {comment.createdAt}
               currentusername = {currentusername}
               onEditComment={onEditComment}
               onRemoveComment={onRemoveComment}
            />
          );
        })}
    </Comment_listCss>
  </PostCommentsCss>
);

export default PostComments;