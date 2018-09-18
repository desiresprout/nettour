import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link } from 'react-router-dom';

export const MainTemplate = styled.div`
        display : flex;
        flex-direction : row;
`;

export const SidebarTemplate = styled.div`
    display : flex;
    flex-direction : column;
    width : 15rem;
    border : 1px solid red;
    height : 100vh;
    justify-content : flex-start;
    margin-top : 8rem;
    
`;



export const SidebarWrapper = styled.div`
    padding : 3rem;    
    display : flex;
    border : 1px solid yellow;
    font-size : 1.3rem;

   
        
`;

export const SidebarIcon = styled.div`
    width : 40px;
    border : 1px solid red;
`;


export const SidebarMenu = styled.div`
     margin-left : 0.25rem;
     border : 1px solid blue;

`;

export const BoardContainer = styled.div`

`;

export const BoardList = styled.div`
        
`;

export const Board = styled.div`

`;