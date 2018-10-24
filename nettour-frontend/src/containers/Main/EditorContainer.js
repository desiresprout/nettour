import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';  
import * as editorActions from 'redux/modules/editor';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import draftToMarkdown from 'draftjs-to-markdown';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';
import styled, { css } from 'styled-components';


const editorWrapper = {
  
};

const editorStyle = {
  background: "white",
  userSelect: "none",
  margin: "0 auto",
  width: "100%",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  height: "850vh",
  padding: "1rem 2rem",
  fontSize: "1.15rem"
};
const toolbarStyle = {
  marginTop: "0.5rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
};

const Button = styled.div`
    cursor : pointer;
    
`;

const Title = styled.input`
    width : 50%;
    height : 2rem;
`;

const TitleWrapper = styled.div`
    display : flex;
`;

class EditorContainer extends Component {
    state = {
        editorState: EditorState.createEmpty(),        
      };

      promisedSetState = (newState) => {
        return new Promise((resolve) => {
            resolve(
                this.setState(newState))
            });
        };
        //await this.promisedSetState(editorState);
        //console.log(this.state.editorState);
        //console.log(this.state.editorState);
        //let html2 = (editorState.getCurrentContent());    
    
    onEditorStateChange = async(editorState) => {
        this.setState({
          editorState,
        })            
        const { EditorActions } = this.props;
        let html = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        
        const content = {
            HTML : html,
            EDITORSTATE : editorState,
        };        
        EditorActions.changecontent(content);     
    };

    uploadImageCallBack = (file) => {
        //https://github.com/velopert/velog/blob/master/velog-frontend/src/containers/write/SubmitBoxContainer.js     
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
                
        const { EditorActions, title, content, state, history } = this.props;       
        try {
            await EditorActions.writepost(title, content, state);                
        } catch(e) {
          console.log(e);          
        }
        
        //const { response } = this.props.errors;        
        //console.log(response.status); stauts상태대로 오류 모달창 보여주기, 400 : 글자수제한
     
        if (!this.props.username || !this.props.title) return;
        const redirecturl = `/@${this.props.username}/${this.props.title}`;
        history.push(redirecturl);     
      
    } 

    handletitleChange = (e) => {      
      const { EditorActions } = this.props;         
      EditorActions.changetitle(e.target.value);     
    }

    render() {
        const { editorState} = this.state;
        const { title } = this.props;
        const { handleSubmit } = this;        

        return (
            <Fragment>
                <TitleWrapper>
                <Button onClick={this.handleSubmit}>올리기</Button>
                
                <Title 
                placeholder="제목을 입력하세요"
                value={title}
                onChange={this.handletitleChange}
                />
                
                </TitleWrapper>               

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
                    image: { uploadCallback: this.uploadImageCallBack, previewImage: true }
                }}
                onEditorStateChange={this.onEditorStateChange}
                />
             </Fragment>
        );
    }
}
export default connect(
    (state) => ({
        username : state.editor.username,
        title: state.editor.title, 
        content: state.editor.content,
        url_slug : state.editor.url_slug,
        state : state.editor.state,
        errors : state.editor.error,  
        loading : state.pender.pending['editor/WRITE_POST'],        
        
    }),
    (dispatch) => ({
        EditorActions: bindActionCreators(editorActions, dispatch)
      })    
)(withRouter(EditorContainer));
    