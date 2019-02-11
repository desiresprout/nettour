import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';  
import * as PostActions from 'store/modules/post';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { ContentState, EditorState, convertFromRaw, convertFromHTML  } from "draft-js";
import htmlToDraft from 'html-to-draftjs';
import axios from 'lib/client';
import Escapeurl from 'lib/common';
import { PostHead, PostBody, PostContent, PostLike, PostComments} from 'components/Post';
import { PostWrapperCss } from 'css/PostHead';
import { PostContentCss} from 'css/PostContent';
import { pender } from 'redux-pender';

class PostViewContainer extends Component {

    initialize = async () => {    
       
        const { PostActions, name, urlslug } = this.props;       
        if(!this.props.username && !this.props.urlslug ) return;        
       
        try { 
            const a = await PostActions.readpost({ name,urlslug });                                     
        } catch(e) {
             console.log(e);          
        } 
            
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

    onToggleLike = async() =>{        
        const { PostActions, postid, liked } = this.props;      

         if(liked){
             PostActions.unlikePost(postid);
         }else{
            PostActions.likePost(postid);
        }
    };

    

    render() {
        const { title, username, content,  likesCount, date, currentuser, logged, postid, liked} = this.props;
        const { handleRemovePost } = this;
      
        return (            
            <Fragment>            
                    <PostBody  
                        title = {title}
                        likesCount = {likesCount}
                        date = {date}
                        username = {username}
                        own = {currentuser===username}
                        onremovepost = {handleRemovePost}
                        id={postid}                        
                        liked={liked}
                        onToggleLike={this.onToggleLike}
                        logged={logged}
                        
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
        //processLike : state.pender.pending['posts/LIKE_POST'] || pender.pending['posts/UNLIKE_POST'],
        date : state.post.readpost.date,
        askremove : state.post.askremove,
        postid : state.post.readpost.postid,
        liked : state.post.readpost.liked,        
        currentuser : state.user.loggedInfo.username,
        logged : !!state.user.loggedInfo.username,        
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(PostActions, dispatch)
      })    
)(withRouter(PostViewContainer)); 


