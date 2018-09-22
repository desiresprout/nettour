import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link } from 'react-router-dom';
import { RadiusMask} from 'css/PostCard';
 
export const CardContentCss = styled.div`
    position : relative;
    border-bottom-left-radius : 4px;
    border-bottom-right-radius : 4px;
`;

export const UserThunmnailCss = styled.img`
    position : absolute;
    top : 0px;
    left : 50%;
    width : 3.5rem;
    height : 3.5rem;
`;

export const ContentHeadCss = styled.div`
    height : 8.5rem;
    & > h3{
        display : block;
        margin : 0;
        line-height : 2rem;
        max-height : 4rem;
        font-weight : 600;
        overflow : hidden;
    }  
`;
