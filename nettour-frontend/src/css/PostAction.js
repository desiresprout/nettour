import styled from 'styled-components';
import oc from 'open-color';
import {  media } from 'css/styleUtil';


export const PostActionCss = styled.div`   
    display : flex;
    justify-content : flex-start;
    margin-top : 1rem;
    margin-bottom : 2rem;

    a{
        font-size : 0.875rem;
        color : ${oc.gray[7]};
        font-weight : 700;
        padding : 0.15rem 0.5rem;
        cursor : pointer;
        &:hover{
            color : ${oc.indigo[9]}
        }
    }
`;

export const ContentCss = styled.div`

`;

export const RenderingCss = styled.div`
    
`;