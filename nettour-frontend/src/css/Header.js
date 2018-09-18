import styled, { css } from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link } from 'react-router-dom';
import background from 'static/images/wave-hero-background.svg';


export const HeaderWrapper = styled.div`
    width:100%;    
    background-size : cover;
    background-repeat : no-repeat;  
    background-position: top;  
    background-image : url(${background});
    {
        padding: 10% 0;        
    }    
    ${props => props.main && `    
      
 `}    
    
`;

export const Positioner = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-items : center;   
    
`;


export const ContentWrapper = styled.div`
    width: 1200px;
    align-items : center;
    display: flex;
    flex-direction: column;    
    padding-right: 1rem;
    padding-left: 1rem;
    ${media.wide`
        width: 992px;
    `}

    ${media.tablet`
        width: 100%;
    `}
`;

export const LogoWrapper = styled.div`
    padding-top : 2rem;
    width:1000px;
    display:flex;
    flex-direction: row;
    align-items:center;
    justify-content: center;   
    margin-bottom : 2rem;

`;

export const Logo = styled(Link)`
    font-size: 1.8rem;
    letter-spacing: 2px;
    color: ${oc.gray[2]};
    font-family: 'Rajdhani';
    text-decoration: none;
    cursor : pointer;
    margin-left : 1rem;
    &:hover {        
        ${shadow(1)}
    }
`;

export const Space = styled.div`    
    flex-grow :  ${props => props.space};
`;

export const InfoWrapper = styled.div`
    width : 1000px;
    display : flex;
    flex-direction : row
    align-items : center;
    justify-items : center;
    margin : 0 auto;
`;

export const InfoButton = styled(Link)`
    flex : 1 0 auto;
    text-align : center;
    color: ${oc.gray[1]};
    &:hover {        
        ${shadow(1)}
    }
    font-weight : 500;
`;


export const BoardWrapper = styled.div`
    width : 680px;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-items : center;  
    margin-top : 4rem;
    color: ${oc.gray[1]};
    font-weight : 700;
    font-size : 2rem;
    

    & > p {
        line-height : 3rem;
        letter-spacing : 1.5px;
    }

    & > nth-child(2){
        margin-top : 2rem;
    }
`;







