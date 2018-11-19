import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';  
import * as PostActions from 'redux/modules/post';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { PostComments } from 'components/Post';
import { PostCommentInput } from 'components/Post'


class PostCommentContainer extends Component {
    
      initialize = async () => {    

       
       
      };
    
      componentDidMount() {        
        this.initialize();
      }

      componentDidUpdate(prevProps) {
        
        if (prevProps.postid !== this.props.postid) {
            
            this.initialize();
        }
      }  

      onwritecomment = async (text, parentId) => {
        
      };
    
    
    
    
    
    
    render() {
        const { logged, commentinput, comments, currentusername } = this.props;
            //comment에는 _id username, comment
        return (
            <Fragment>
                <PostComments
                    logged = {logged}
                    commentinput = { logged && <PostCommentInput writecomment={this.onwritecomment} />}
                    comments = {comments}
                    currentusername = {currentusername}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        logged: !!state.user.logged,        
        postid : state.post.readpost.postid,
        title: state.post.readpost.title,        
        content: state.post.readpost.content,              
        likesCount : state.post.readpost.likesCount,
        date : state.post.readpost.date,
        comments: state.post.readpost.comment.comments,          
        currentusername : state.user.loggedInfo.username
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(PostActions, dispatch)
      })    
)(withRouter(PostCommentContainer)); 
