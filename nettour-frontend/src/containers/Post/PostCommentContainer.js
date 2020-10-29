import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as PostActions from "store/modules/post";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { PostComments } from "components/Post";
import { PostCommentInput } from "components/Post";
import PostAction from "components/Post/PostAction";

class PostCommentContainer extends Component {
  onwritecomment = async comment => {
    const { postid, currentusername, PostActions } = this.props;
    if (!postid) return Promise.resolve();

    let post_comment = null;
    try {
      post_comment = await PostActions.writecomment({
        postid,
        currentusername,
        comment,
      });
    } catch (e) {
      console.error(e);
    }
  };

  onEditComment = async ({ currentusername, commentid, comment }) => {
    const { PostActions, postid } = this.props;

    let edit_comment = null;

    try {
      edit_comment = await PostActions.editcomment({
        commentid,
        comment,
      });
    } catch (e) {
      console.error(e);
    }
  };

  onRemoveComment = async commentid => {
    const { PostActions } = this.props;

    let removecomment = null;
    try {
      removecomment = await PostActions.removecomment(commentid);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { logged, commentinput, comments, currentusername } = this.props;
    return (
      <Fragment>
        <PostComments
          logged={logged}
          commentinput={
            logged && <PostCommentInput onWriteComment={this.onwritecomment} />
          }
          comments={comments}
          currentusername={currentusername}
          commentsCount={comments ? comments.length : 0}
          onEditComment={this.onEditComment}
          onRemoveComment={this.onRemoveComment}
        />
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    logged: !!state.user.logged,
    postid: state.post.readpost.postid,
    title: state.post.readpost.title,
    content: state.post.readpost.content,
    likesCount: state.post.readpost.likesCount,
    date: state.post.readpost.date,
    comments: state.post.readpost.comment.comments,
    currentusername: state.user.loggedInfo.username,
  }),
  dispatch => ({
    PostActions: bindActionCreators(PostActions, dispatch),
  })
)(withRouter(PostCommentContainer));
