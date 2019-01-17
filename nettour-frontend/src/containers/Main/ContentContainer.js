import React, { Component } from 'react';
import { PostsList } from 'components/Post'; 
import { ContentTemplateCss } from 'css/Main';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from 'store/modules/post';



class ContentContainer extends Component {
      load = async () => {
        const { PostsActions } = this.props;
        PostsActions.fulllist();
    }

    componentDidMount() {        
        this.load();
    }

    render() {
        const { data } = this.props;
        
        return (
                 
            <ContentTemplateCss className="contenttemplate">
                <PostsList
                    posts={data}  /> 
                </ContentTemplateCss>          

         );
    }
}

export default connect(
  (state) => ({
      next: state.post.next,
      data: state.post.data,
  }),
  (dispatch) => ({
      PostsActions: bindActionCreators(postsActions, dispatch)
  })
)(ContentContainer);



