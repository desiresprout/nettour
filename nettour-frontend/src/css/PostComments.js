import styled from "styled-components";
import oc from "open-color";
import { shadow, media } from "css/styleUtil";

export const PostCommentsCss = styled.div`
  box-sizing: inherit;
  margin-top: 3rem;
  h3 {
    display: block;
    font-size: 1em;
  }
`;

export const Comment_InputCss = styled.div``;

export const Ask_login = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  color: #495057;
  a {
    color: ${oc.teal[7]};
    font-weight: 500;
  }
`;

export const Button_wrapperCss = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
  color: black;
`;

export const Comment_listCss = styled.div`
  margin-top: 2rem;
`;

export const PostcommentCss = styled.div`
  padding: 1rem;
`;

export const Comment_headCss = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
`;

export const Comment_InfoCss = styled.div`
  font-size: 1rem;
`;

export const Comment_DateCss = styled.div`
  margin-top: 0.5rem;
  color: #868e96;
`;

export const Comment_bodyCss = styled.div``;
export const Postcomment_inputcss = styled.div`
  textarea {
    width: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 1rem;
    border: 1px solid ${oc.gray[2]};
    border-radius: 4px;
    resize: none;
    color: ${oc.gray[9]};
    display: block;
    line-height: 1.5;
  }
`;

export const Button_commentCss = styled.button`
  outline: none;
  background: none;
  color: black;
  margin: 0;
  padding: 0.5rem 0.7rem;
  overflow: visible;
  text-align: center;
  background: none;
  color: black;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  ${props =>
    props.edit &&
    `        
        &:hover {
            text-decoration : underline;
            
        }
        
    `}
  ${props =>
    props.cancel &&
    `        
        &:hover {
            text-decoration : underline;
            
        }
            
    `}
`;

export const Post_actionsCss = styled.div`
  position: absolute;
  right: 0;
  top: 0.6rem;
  font-size: 0.8rem;
  color: black;
`;

export const Comment_editCss = styled.button`
  cursor: pointer;
  outline: none;
  margin: 0;
  padding: 0;
  line-height: normal;
  text-align: center;
  overflow: visible;
  border: none;
  background: white;
`;

export const Comment_removeCss = styled.button`
  margin-left: 0.5rem;
  cursor: pointer;
  outline: none;
  padding: 0;
  width: auto;
  overflow: visible;
  line-height: normal;
  text-align: center;
  overflow: visible;
  background: white;
  border: none;
`;
