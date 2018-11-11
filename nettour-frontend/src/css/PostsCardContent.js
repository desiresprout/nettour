import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link } from 'react-router-dom';
import { RadiusMask} from 'css/PostsCard';
 
export const CardContentCss = styled.div`
    position : relative;
    border-bottom-left-radius : 4px;
    border-bottom-right-radius : 4px;
    padding : 1.5rem 1rem;
    color : #343a40;
`;

export const UserThunmnailCss = styled(Link)`
    position : absolute;
    top : 0;
    right : 1rem;
    width : 3.5rem;
    height : 3.5rem;
    transform : translateY(-50%);
    display : flex;
    align-items : center;
    justify-content : center;
    border-radius : 50%


    & > img{
        display : block;
        width  2.75rem;
        height : 2.75rem;
        object-fit : cover;
        border-radius : 50%; 
    }
`;

export const ContentHeadCss = styled.div`
    height : 8.5rem;
    padding-bottom : 1.5rem;
    border-bottom : 1px solid #e9ecef;

    

        
`;

export const UsernameCss = styled.h3`
    display : block;
    margin : 0;
    line-height : 2rem;
    max-height : 4rem;
    font-weight : 600;
    overflow : hidden;
    font-size : 1.25rem;

    a{
        text-decoration: none;
    }
`;

export const SubinfoCss = styled.div`
    font-size : 0.875rem;
    margin-top : 0.5rem;
    color : #8aa6c1;
`;

export const DescriptionCss = styled.div`
    margin-top : 1.5rem;
    line-height : 1.5rem;
    height : 4.5rem;
    overflow-y : hidden;
    word-break: break-all;
    display : -webkit-box;
    -webkit-line-clamp : 3;
    overflow : hidden;
    text-overflow : ellipsis;
    color : #4c657d;
`;
