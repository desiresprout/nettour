import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';


export const Imagewrapper = styled.div`   
   width : 100%;      
   border : 2px solid blue;
       
`;


export const ImageContainer = styled.div`
    margin : 2rem;
    border : 5px solid green;
    display : flex;
    flex-wrap : wrap;


`;



export const ImgA = styled.img.attrs({
    src: props=> (props.url)
})`   
    display : inline-block;
    width : 500px;
    height : 500px;

`;








