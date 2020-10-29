import React, { Component, Fragment } from "react";
import PostViewContainer from "containers/Post/PostViewContainer";
import PostCommentContainer from "containers/Post/PostCommentContainer";
import { PostTemplateCss, PostWrapperCss } from "css/PostHead";
import { PostHead } from "components/Post";

class PostPage extends Component {
  render() {
    const { match } = this.props;
    const { username, urlslug } = match.params;

    return (
      <PostTemplateCss className="PostTemplate">
        <PostHead />
        <PostWrapperCss className="PostAreaCss">
          <PostViewContainer name={username} urlslug={decodeURI(urlslug)} />
          <PostCommentContainer />
        </PostWrapperCss>
      </PostTemplateCss>
    );
  }
}

export default PostPage;
