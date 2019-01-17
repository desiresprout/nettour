import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link } from 'react-router-dom';

export const PostBodyCss = styled.div`
    margin-top : 4rem;
    font-size : 1rem;     

`;

export const PostHeadCss = styled.div`
    margin-top : 3rem;
    font-size : 1rem;
    & > h1{
        margin : 0;
        font-size : 3rem;
        line-height : 3rem;
    }
`;

export const UserdisplayCss = styled.div`
    display : flex;
    margin-top : 1rem;
    margin-bottom : 2rem;
    align-items : center;
    justify-content : flex-end;     
    
`;

export const UserThunmailCss = styled(Link)`
    flex-shrink : 0;
    width : 4em;
    height : 4em;
    position : relative;

    & > img{
        border-radius : 50%;
        object-fit : cover;
        width : 100%;
        height : 100%;
    }
`;

export const UserInfoCss = styled.div`
    margin-left : 1em;
    font-size : 0.875rem;
    line-height : 1.5em;
    & > a{
        font-weight : 500;
        color : #212529;
    }
`;

export const Date_likes_number = styled.div`
    display : flex;
    align-items : center;
    justify-content : flex-end;
    maring-top : 1.5rem;
    & > h3{
        font-size : 1rem;
        color : blue;
    }
`;

export const PostContentCss = styled.div`

`;



