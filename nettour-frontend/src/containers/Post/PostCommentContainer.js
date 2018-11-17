import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';  
import * as PostActions from 'redux/modules/post';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { PostComments } from 'components/Post';
import { PostCommentInput } from 'components/Post'


class PostCommentContainer extends Component {
    
      initialize = async () => {        

        const { postid } = this.props;
        console.log(postid);
        if(!postid) return;         

        try{
            console.log("readcommnet");
            await PostActions.readcomment(postid);
            const { comments} = this.props;
            console.log(comments);      
        } 
        catch (e){      
            console.log(e);      
        }
       
      };
    
      componentDidMount() {        
        this.initialize();
      }

      componentDidUpdate(prevProps) {
        console.log("didupdate");
        if (prevProps.postid !== this.props.postid) {
            console.log("notprops");
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
                <PostComments>
                    logged = {logged}
                    commentinput = { logged && <PostCommentInput writecomment={this.onwritecomment} />}
                    comments = {comments}
                    currentusername = {currentusername}
                </PostComments>
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        logged: state.user.logged,        
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
