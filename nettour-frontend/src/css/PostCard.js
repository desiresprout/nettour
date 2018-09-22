import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link } from 'react-router-dom';

export const PostCardCss = styled.div`
    display : block;
    width : calc(33.3% - 1rem);
    text-decoration : none;
    cursor : pointer;
    position : relative;
    border  : 1px solid red;
    heigth : 33.3%;
    margin : 0.875rem;   
    
`;

export const PostThumnailCss = styled.div`
    display : block;
    position : relative;
    width: 100%;

    background-image: url(${props => props.image});
    
    & > img{
        display : block;
        object-fit : cover;
        position : absolute;
        top: 0;
        left : 0;
        width : 100%;
        height : 100%;
        border-top-left-radius : 4px;
        border-top-right-radius : 4px;  
    }
`;
export const RadiusMaskCss = styled.div`
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    opacity : 0;
    transition : all .125s ease-in;    
    border-top-left-radius : 4px;
    border-top-right-radius : 4px;
`;

