import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link } from 'react-router-dom';


export const PostTemplateCss = styled.div`         
   box-sizing : inherit;
    
`;

export const PostHeadCss = styled.div`
   height : 7rem;
   display : flex;
   align-items : center;
   padding-left : 2rem;
   padding-right : 2rem;
   justify-content : center;

   & > a {
       font-size : 2rem;
       line-height: 2rem;
       font-family : "Inconsolata";
       color : #212529;
   }
        

`;



