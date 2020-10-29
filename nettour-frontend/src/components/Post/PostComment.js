import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Fromnow } from "lib/common";
import { PostCommentInput } from "components/Post";

import {
  PostcommentCss,
  Comment_headCss,
  Comment_InfoCss,
  Comment_DateCss,
  Comment_bodyCss,
  Post_actionsCss,
  Comment_editCss,
  Comment_removeCss,
} from "css/PostComments";

class PostComment extends Component {
  state = {
    editing: false,
  };

  onToggleEdit = () => {
    this.setState({
      editing: !this.state.editing,
    });
  };

  onConfirmEdit = async comment => {
    const { onEditComment, currentusername, commentid } = this.props;
    try {
      await onEditComment({
        currentusername,
        commentid,
        comment,
      });
      this.setState({
        editing: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  onHandleComment = async () => {
    const { onRemoveComment, commentid } = this.props;
    try {
      await onRemoveComment(commentid);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { username, comment, date, currentusername } = this.props;
    const { editing } = this.state;

    return (
      <PostcommentCss className="post_comment">
        {editing ? (
          <PostCommentInput
            showCancel
            onCancel={this.onToggleEdit}
            onWriteComment={this.onConfirmEdit}
            editing
            defaultValue={comment || ""}
          />
        ) : (
          <Fragment>
            <Comment_headCss>
              <Comment_InfoCss>
                <Link to={"/"}>{username} </Link>
                <Comment_DateCss>{Fromnow(date)}</Comment_DateCss>
              </Comment_InfoCss>
              {username === currentusername && (
                <Post_actionsCss className="actions">
                  <Comment_editCss className="edit" onClick={this.onToggleEdit}>
                    수정
                  </Comment_editCss>
                  <Comment_removeCss
                    className="remove"
                    onClick={this.onHandleComment}
                  >
                    삭제
                  </Comment_removeCss>
                </Post_actionsCss>
              )}
            </Comment_headCss>

            <Comment_bodyCss>
              <div>{comment}</div>
            </Comment_bodyCss>
          </Fragment>
        )}
      </PostcommentCss>
    );
  }
}

export default PostComment;
