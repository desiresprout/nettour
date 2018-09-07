import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';

export const Wrapper = styled.div`    
   display: flex;
   justify-content: center;
   align-items : center;
   flex-wrap: wrap;
   width : 100%;      
   padding-left: 2rem;
   padding-right : 2rem;       
`;

export const Imgcover = styled.div`
    
    border:10px solid yellow;


`;

export const ImgA = styled.img.attrs({
    src : '/static/images/wave-hero-background.svg'})
    `  
    width: 450px;
    max-width: 100%; 
    max-height: 450px; 

`;

export const ImgB = styled.img`
    background-image: url('/static/images/458x354.jpg');
    background-repeat: no-repeat;
    width:50%;
    height:auto;   
   
`; 

//background: ${props => props.primary ? 'palevioletred' : 'white'};
  //color: ${props => props.primary ? 'white' : 'palevioletred'};






