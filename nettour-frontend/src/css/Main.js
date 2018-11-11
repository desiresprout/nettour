import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link } from 'react-router-dom';

export const MainTemplateCss = styled.div`
       
        margin-left : 15rem;
        
`;

export const SidebarTemplateCss = styled.div`
    display : flex;
    flex-direction : column;
    width : 15rem;
    height : 100%;    
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
    padding-left : 1.75rem;
    padding-right : 1.75rem;
    
    
`;


