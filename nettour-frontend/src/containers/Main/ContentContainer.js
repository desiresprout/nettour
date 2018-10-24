import React, { Component } from 'react';
import { PostList } from 'components/Post'; 
import { ContentTemplateCss } from 'css/Main';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from 'redux/modules/post';



class ContentContainer extends Component {
      load = async () => {
        const { PostsActions } = this.props;
        PostsActions.loadPost();
    }

    componentDidMount() {
        // 컴포넌트가 마운트 됐을 때 호출 합니다.
        this.load();
    }




    
    render() {
        const { data } = this.props;
        
        return (
                 
            <ContentTemplateCss className="contenttemplate">
                <PostList
                    posts={data}
                
                
                
                /> 
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



