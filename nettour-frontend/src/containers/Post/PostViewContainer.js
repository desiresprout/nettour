import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';  
import * as PostActions from 'redux/modules/post';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { ContentState, EditorState, convertFromRaw, convertFromHTML  } from "draft-js";
import htmlToDraft from 'html-to-draftjs';

import axios from 'axios';
import Escapeurl from 'lib/common';

import { PostHead, PostBody, PostContent, PostLike, PostComments} from 'components/Post';
import { PostTemplateCss} from 'css/PostHead';
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

    }

    onToggleAskremove = () => {
        //PostActions.toggleaskremove();
    };

    onConfirmRemove = () => {
        const { PostActions } = this.props;
        PostActions.toggleaskremove();

    };
       
        
    
    componentDidMount(){
        this.initialize();       
    }

    render() {
        const { title, username, content,  likesCount, date, askremove, currentuser, logged} = this.props;
        const contentBlock = htmlToDraft(content); 
        //const contentState = ContentState.createFromBlockArray(
        //    contentBlock.contentBlocks
        //  );
        //const postContent = EditorState.createWithContent(contentState); //변환된 editorstate 
        //const blocksFromHTML = convertFromHTML(content);      
      
        return (            
            <PostTemplateCss className="PostTemplate">                
               
                <PostHead/>                
                
                <PostBody
                    title = {title}
                    likes = {likesCount}
                    date = {date}
                    username = {username}
                    own = {currentuser===username}
                    onaskremove = {this.onToggleAskremove}
                />
                <PostContentCss classNmae="PostContent" dangerouslySetInnerHTML={{__html: content }}>               
                </PostContentCss>

                <PostComments>
                    
                </PostComments>
                

               
            
            </PostTemplateCss>
        );
    }
}
/*
    <QuestionModal
        open={askremove}
        title = "타이틀"
        descripttion= "진짜삭제?"
        confrim = "삭제"
        onconfirm ={this.onConfirmRemove}
        oncancel = {this.onToggleAskremove}
*/



//dangerouslySetInnerHTML={{__html: content }}
// <Editor editorState = {postContent} />
export default connect(
    (state) => ({
        username : state.post.readpost.username,        
        title: state.post.readpost.title, 
        content: state.post.readpost.content,              
        likesCount : state.post.readpost.likesCount,
        date : state.post.readpost.date,
        askremove : state.post.askremove,
        
        currentuser : state.user.loggedInfo.username,
        logged : !!state.user.loggedInfo.username,
        
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(PostActions, dispatch)
      })    
)(withRouter(PostViewContainer)); 


