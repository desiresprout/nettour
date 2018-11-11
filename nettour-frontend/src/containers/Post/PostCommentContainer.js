import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';  
import * as postActions from 'redux/modules/post';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';


class PostCommentContainer extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default connect(
    (state) => ({
        //username : state.post.detaildata.username,        
       // title: state.post.detaildata.title, 
       // content: state.post.detaildata.content,        
       // editorstate : state.post.detaildata.editorstate,        
        
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)
      })    
)(withRouter(PostCommentContainer)); 
