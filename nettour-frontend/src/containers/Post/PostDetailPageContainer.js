import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';  
import * as editorActions from 'redux/modules/editor';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';


class PostDetailPageContainer extends Component {

    initialize = async () => {
        
        /* if (document.body && document.body.scrollTop) {
          document.body.scrollTop = 0;
        }
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        } */
        const { username, title } = this.props;
        console.log(username);
        //console.log(title);
      };
    
    
    
    
    componentDidMount(){
        this.initialize();       
    }




    render() {
        const { username, title } = this.props;
        return (
            <textarea>
                {username}
            </textarea>
        );
    }
}
export default connect(
    (state) => ({
                
        
    }),
    (dispatch) => ({
       // : bindActionCreators(editorActions, dispatch)
      })    
)(withRouter(PostDetailPageContainer)); 


