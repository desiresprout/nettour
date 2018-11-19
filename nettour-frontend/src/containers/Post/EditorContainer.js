import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';  
import * as PostActions from 'redux/modules/post';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';
import styled, { css } from 'styled-components';

import { Escapeurl } from 'lib/common';


        const editorWrapper = {
        
        };

        const editorStyle = {
            background: "#edf2ff",
            userSelect: "none",
            margin: "0 auto",
            width: "100%",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            height : "85vh",
            padding: "1rem 2rem",
            fontSize: "1.15rem"
        };
        const toolbarStyle = {
            paddingLeft : "13rem",
            background : "#edf2ff",
            marginTop: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
        };

        const Button = styled.div`
            cursor : pointer;
            height : 2.25rem;
            display : flex;
            align-items : center;
            padding : 0 .75rem;
            font-weight : 300;
            line-height : 0;
            font-size : 0.875rem;
            transition : all 0.1s ease-in;
            background : #748ffc;
            color : #fff;    
        `;
        const INPUT_AREA = styled.div`
            flex : 1 1;
            margin-left : 1rem;
            margin-right : 1rem;
            display : flex;
        `;
        const INPUT = styled.input`
            flex : 1 1;
            background : none;
            font-size : 1.25rem;
            outline : 0;
            border : 0;
            color : black;
        `;

        const EditorHeader = styled.div`
            border : 1px solid #364fc7;
            border-radius: 3px;
            display : flex;
            height : 4rem;
            padding-left : 2rem;
            padding-right : 2rem;
            align-items : center;
            color: #fff;
            margin-bottom : 2rem;

        `;

class EditorContainer extends Component {
    state = {
        editorState: EditorState.createEmpty(),        
      };

      componentWillUnmount() {
        //const { EditorActions } = this.props;  
        //EditorActions.reset(); 
      }

      /* promisedSetState = (newState) => {
        return new Promise((resolve) => {
            resolve(
                this.setState(newState))
            });
        };
        //await this.promisedSetState(editorState);
        //console.log(this.state.editorState);
        //console.log(this.state.editorState);
        //let html2 = (editorState.getCurrentContent());      */
    
    onEditorStateChange = async(editorState) => {
        this.setState({
          editorState,
        })            
        
        const { PostActions, username, title } = this.props;
        let html = (draftToHtml(convertToRaw(editorState.getCurrentContent())));
       

        /*const editor = {
            HTML : html,
            EDITORSTATE : editorState,             
        };     */    
        PostActions.changecontent(html);     
    };

    uploadImageCallBack = (file) => {     
        return new Promise(
          (resolve, reject) => {
            const reader = new FileReader(); 
            const data = new FormData();
    
            reader.onload = (e) => {
              data.append('file', file);
              axios.post('http://localhost:4000/api/posts/images', data)
                .then(function (res) {
                  resolve({ 
                    data: { 
                      link: `https://s3.amazonaws.com/s3nettour/${res.data}` 
                    }                
                  });    
                })            
                .catch(function (err) {
                  if(err) {
                    console.log('error', err);
                    return;
                  }
                  console.log(err);
                });              
            };
            reader.onerror = e => reject(e);
            reader.readAsDataURL(file);
          });
      }

     handleSubmit = async () => {         
        const { PostActions, title, content, history } = this.props;
         
       
        try { 
            await PostActions.writepost({
                title : Escapeurl(title),
                content
            });                           
        } catch(e) {
          console.log(e);          
        }
        //const { response } = this.props.errors;        
        //console.log(response.status); stauts상태대로 오류 모달창 보여주기, 400 : 글자수제한
     
        if (!this.props.username || !this.props.urlslug) return;          
        const redirecturl = `/@${this.props.username}/${this.props.urlslug}`;
        history.push(redirecturl); 
        
    }

    handletitleChange = (e) => {      
      const { PostActions } = this.props;         
      PostActions.changetitle(e.target.value);     
    }

    render() {
        const { editorState} = this.state;
        const { title } = this.props;
        const { handleSubmit } = this;        

        return (
            <Fragment>
                <EditorHeader>
                <INPUT_AREA>
                <INPUT
                placeholder="제목을 입력하세요"
                value={title}
                onChange={this.handletitleChange}
                />
                </INPUT_AREA>
                <Button onClick={this.handleSubmit}>올리기</Button>  
               
                </EditorHeader>               

                <Editor
                wrapperStyle={editorWrapper}
                editorState={editorState}
                editorStyle={editorStyle}
                toolbarStyle={toolbarStyle}
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { uploadCallback: this.uploadImageCallBack, previewImage: true },
                }}
                onEditorStateChange={this.onEditorStateChange}
                />
             </Fragment>
        );
    }
}
   

export default connect(
    (state) => ({
        username : state.user.loggedInfo.username,
        title: state.post.editor.title, 
        content: state.post.editor.content,        
        editorerrors : state.post.editor.error,       
        urlslug : state.post.given.url_slug,
        givenerros : state.post.given.error,  
        loading : state.pender.pending['editor/WRITE_POST'],        
        
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(PostActions, dispatch)
    }),  
)(withRouter(EditorContainer));
    