import React, { Component } from "react";
import { PostsList } from "components/Post";
import { ContentTemplateCss } from "css/Main";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postsActions from "store/modules/post";

class ContentContainer extends Component {
  prev = null;

  load = async () => {
    const { PostsActions } = this.props;
    try {
      await PostsActions.postlists();
      const { next } = this.props;
      if (next) {
        await PostsActions.prefetchpost(next);
      }
    } catch (e) {
      console.log(e);
    }
  };

  loadNext = async () => {
    const { PostsActions, next } = this.props;

    PostsActions.showPrefetchedPost();

    if (next === this.prev || !next) return;
    this.prev = next;
    console.log(next);
    try {
      await PostsActions.prefetchpost(next);
    } catch (e) {
      console.log(e);
    }
    this.handleScroll();
  };

  handleScroll = () => {
    const { nextdata } = this.props;
    if (nextdata.size === 0) return;

    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 100) {
      this.loadNext();
    }
  };

  componentDidMount() {
    this.load();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { data } = this.props;

    return (
      <ContentTemplateCss className="contenttemplate">
        <PostsList posts={data} />
      </ContentTemplateCss>
    );
  }
}

export default connect(
  state => ({
    next: state.post.next,
    data: state.post.data,
    nextdata: state.post.nextdata,
  }),
  dispatch => ({
    PostsActions: bindActionCreators(postsActions, dispatch),
  })
)(ContentContainer);
