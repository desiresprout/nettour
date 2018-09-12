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


export const SidebarContainer = styled.div`
    margin : 0 auto;

`;

export const SidebarIcon = styled.div`
`;


export const Sidebar = styled.div`

`;