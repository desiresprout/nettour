import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';  
import * as PostActions from 'store/modules/post';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { ContentState, EditorState, convertFromRaw, convertFromHTML  } from "draft-js";
import htmlToDraft from 'html-to-draftjs';

import axios from 'axios';
import Escapeurl from 'lib/common';

import { PostHead, PostBody, PostContent, PostLike, PostComments} from 'components/Post';
import { PostWrapperCss } from 'css/PostHead';
import { PostContentCss} from 'css/PostContent';




class PostViewContainer extends Component {
   

    initialize = async () => {
        
        const { PostActions, name, urlslug } = this.props;
        
        if(this.props.username && this.props.urlslug ) return;          
       
        try { 
            await PostActions.readpost({
                name,
                urlslug
            });                           
        } catch(e) {
             console.log(e);          
        } 
            //console.log("readpost");
    }

    handleRemovePost = async () => {
        
        const { PostActions, postid, history }  = this.props;
        try{
            await PostActions.removepost(postid);
        }catch(e){
            console.log(e);
        }
        history.push('/main');
        
    }
       
        
    
    componentDidMount(){
        this.initialize();       
    }

    render() {
        const { title, username, content,  likesCount, date, currentuser, logged, postid } = this.props;
        //const contentBlock = htmlToDraft(content); 

        const { handleRemovePost } = this;
       
      
        return (            
            <Fragment>            
                    <PostBody  //posthead
                        title = {title}
                        likes = {likesCount}
                        date = {date}
                        username = {username}
                        own = {currentuser===username}
                        onremovepost = {handleRemovePost}
                        id={postid}
                    />
                    <PostContentCss className="PostContent" 
                            dangerouslySetInnerHTML={{__html: content }}>           
                    </PostContentCss>             
                
                
            
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        username : state.post.readpost.username,        
        title: state.post.readpost.title, 
        content: state.post.readpost.content,              
        likesCount : state.post.readpost.likesCount,
        date : state.post.readpost.date,
        askremove : state.post.askremove,
        postid : state.post.readpost.postid,        
        currentuser : state.user.loggedInfo.username,
        logged : !!state.user.loggedInfo.username,
        
        
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(PostActions, dispatch)
      })    
)(withRouter(PostViewContainer)); 


