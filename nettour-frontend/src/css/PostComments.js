import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';


export const PostCommentsCss = styled.div`
    box-sizing : inherit;
    margin-top : 3rem;

    h3{
        display : block;
        font-size : 1em;

    }
`;

export const Comment_InputCss = styled.div`


`;

export const Ask_login = styled.div`
    margin-top : 1.5rem;
    margin-bottom : 1.5rem;
    color : #495057;
    a{
        color : ${oc.teal[7]};
        font-weight : 500;
    }
`;

export const Button_wrapperCss = styled.div`
    margin-top : 1rem;
    display : flex;
    justify-content : flex-end;
    position : absolute;
    right : 0;
    top : 0.6rem;
    font-size : 1rem;
    color : white;

    button{
        background : #845ef7;
        color : #fff;
        border-radius : 4px;
        cursor : pointer;
        
    }
`;

export const Comment_listCss = styled.div`
    margin-top : 2rem;
`;

export const PostcommentCss = styled.div`
    padding : 1rem;
`;

export const Comment_headCss = styled.div`
    display : flex;
    align-items : center;
    margin-bottom : 1rem;
    position : relative;
`;

export const Comment_InfoCss = styled.div`
    font-size : 1rem;
    
`;

export const Comment_DateCss = styled.div`
    margin-top : 0.5rem;
    color : #868e96;
`;

export const Comment_bodyCss = styled.div`

`
export const Postcomment_inputcss = styled.div`
    .textarea{
        max-height : 400px;
        overflow : hidden;
        overflow-wrap : break-word;
        height : 53px;
    }
`;