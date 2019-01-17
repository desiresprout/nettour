import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';  
import * as PostActions from 'store/modules/post';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState  } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import queryString from 'query-string';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';
import styled from 'styled-components';
import Thumbnail from 'components/Post/Thumbnail';
import { Escapeurl } from 'lib/common';

        const editorWrapper = {
        
        };

        const editorStyle = {
            background: "white",
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
            background : #4c6ef5;
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
            display : flex;
            height : 4rem;
            padding-left : 2rem;
            padding-right : 2rem;
            align-items : center;
            color: #fff;
        `;

       

class EditorContainer extends Component {
    state = {
        editorState: EditorState.createEmpty(),        
      };


      initializePostInfo = async(id) => {
        
        const { PostActions} = this.props;
        try{
            await PostActions.getpost(id);
        }catch(e){
            console.log(e);
        }
        const { content } = this.props;
        const contentBlock = htmlToDraft(content);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
        this.setState({
            editorState,
        });
        }

      };      

      componentDidMount() {
         const { PostActions, location, user } = this.props;
         const { id } = queryString.parse(location.search);
        
         if(id){
            this.initializePostInfo(id);            
         }        
      }

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
              //https://s3.amazonaws.com/images.nettour.ml/postImages/20190116-zy3rf-d-.jpeg            
              axios.post('http://localhost:4000/api/posts/images', data)
                .then(function (res) {
                  resolve({ 
                    data: { 
                      link: `https://s3.amazonaws.com/images.nettour.ml/${res.data}` 
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
        const { PostActions, title, content, history, location, user, imagepath } = this.props; 
       
        if(!user.logged && !user.validated ) return;
        
        try {            
            const { id } = queryString.parse(location.search);
            
            if(id) {
              await PostActions.editpost({ 
                  id,
                  title,
                  content,
                  slug : Escapeurl(title),
                  imagepath
                }); 
              
            }else{
                await PostActions.writepost({
                    title,
                    content,
                    slug : Escapeurl(title),
                    imagepath
                }); 
            }            
            
            if (!this.props.username || !this.props.urlslug) return;          
            const redirecturl = `/@${this.props.username}/${this.props.urlslug}`;
            history.push(redirecturl); 
          } catch (e) {
            console.log(e);  //포스트 작성 , 수정 실패
          }        
        
        //const { response } = this.props.errors;        
        //console.log(response.status); stauts상태대로 오류 모달창 보여주기, 400 : 글자수제한        
    }

    handletitleChange = (e) => {      
      const { PostActions } = this.props;         
      PostActions.changetitle(e.target.value);     
    }
    
    handleThumbnail = () => {
        const upload = document.createElement('input');
        upload.type = 'file';
        upload.accept = 'image/*'
        upload.onchange = (e) => {
            if (!upload.files) return;
            const file = upload.files[0];           
            this.uploadThumbnail(file);            
        };
        upload.click();
        
    }

    uploadThumbnail = async(file) => { 
        const { PostActions } = this.props;       
        const type = file.type;
        if(!file || file.size > 1024 * 1024 * 80 || file.type.indexOf('gif') > 0 ) return;
        const filename = Escapeurl(file.name);
        await PostActions.createurl({filename, type});
        const { thumbnail, status, imagepath } = this.props;
        
        try{
            if(thumbnail && !status && !imagepath ) return;            
            await axios.put(thumbnail, file, {
                headers: {   'Content-Type': type,  }               
            });
        }catch(e){
            console.log(e);     
        }       


     }

    render() {
        const { editorState} = this.state;
        const { handleSubmit, handleThumbnail } = this;  
        const { match, location, title } = this.props;
        const { id } = queryString.parse(location.search);
        

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
                <Thumbnail
                    onThumbnailupload={handleThumbnail}
                />
                <Button onClick={this.handleSubmit}>{id ? '수정하기' : '등록하기' }</Button>  
               
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
        user: state.user,

        thumbnail : state.post.editor.upload.thumbnailURL,
        status : state.post.editor.upload.status,
        imagepath : state.post.editor.upload.imagepath,
        
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(PostActions, dispatch),
     
    }),  
)(withRouter(EditorContainer));
    