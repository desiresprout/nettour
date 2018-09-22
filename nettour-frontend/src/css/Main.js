import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link } from 'react-router-dom';

export const MainTemplateCss = styled.div`
        display : flex;
        flex-direction : row;
        width : 100vw;
        height : 100vh;
`;

export const SidebarTemplateCss = styled.div`
    display : flex;
    flex-direction : column;
    width : 15rem;
    height : 100vh;    
    justify-content : flex-start;    
    position : fixed;
    top : 0;
    left : 0;
    
`;



export const SidebarWrapperCss = styled.div`
    padding : 3rem;    
    display : flex;    
    font-size : 1.3rem;  
        
`;

export const SidebarIcon = styled.div`
    width : 40px;
   
`;


export const SidebarMenu = styled.div`
     margin-left : 0.25rem;
     

`;

export const ContentTemplateCss = styled.div`        
    width : calc(100vw - 15rem);
    height : 100vh;
    display : flex;
    flex-direction : column; 
    margin-left : 15rem;
`;

export const ContentWrapperCss = styled.div`
    width : calc(100vw - 15rem);
    height : calc(100vh - 8rem);
    border : 1px solid blue;

`;

