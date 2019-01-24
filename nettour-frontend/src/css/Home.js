import styled, { css } from 'styled-components';
import oc from 'open-color';
import a from 'static/images/asdf.png';

export const HomeWrapperCss = styled.div`
     background-image : url(${a});
    background-size : cover;
    background-repeat : no-repeat;
    background-position : top; 
    height : 100vh;
    width : 100%;
    opacity : 1;
`;
export const MenubarCss = styled.ul`
    list-style : none;
    display : flex;
    flex-direction : row;
    padding : 1rem;
    border : 1px solid green;
    border-radius : 10px;
    a{
        text-decoration : none;
    }        
    margin-left : 3rem;
    margin-right : 3rem;
    align-items : center;
    border-color : #fff;
`;

export const MenuLiCss = styled.li`
    padding : 4px;
    font-family: 'Permanent Marker', cursive;
    color : #fff;
   
    ${props => props.first && `
        margin-right : auto;
        svg{
            font-size : 2rem;
            color : #fff;
        }
        
    `}
    ${props => props.second && `
        margin-right : 1rem;
    `}
    a{
        font-weight : 700;
    }
    
`;

export const FontCss = styled.div`
    margin-top : 11rem;
    text-align : center;
    font-size : 153px;
    color : ${oc.gray[8]};
    font-family: 'Permanent Marker', cursive;
    font-weight : 1000;

`;

export const CommentBoxCss = styled.div`
    position : relative;
    margin : 0 auto;
    width : 833px;
    height : 248px;
    background-color : rgba(0, 0, 0, 0.5);
    border-radius : 15px;
    color : #fff;
    p{        
        padding-top : 20px;
        text-align : center;
        font-size : 25px;
    }
`;