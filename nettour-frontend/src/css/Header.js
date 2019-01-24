import styled, { css } from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link } from 'react-router-dom';
import abc from 'static/images/a.jpg';
import { commonbackground }  from 'css/common.js';
import a from 'static/images/travel.jpg';

export const HeaderWrapper = styled.div`
    width: 100%;      
    background-size : cover;
    background-repeat : no-repeat;
    background-position : top;
        

    @media (min-width : 1920px)
    {
        padding: 10% 0;        
    }    
    ${props => props.main && `
        width: 100%;                          
        height : 15rem;    
        background-image : none;
        padding : 1.75rem;  
        
        background-color : #ffffff;      
        
    `}    
    
`;
// background-color : ${oc.gray[3]};

export const Positioner = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-items : center;   

    ${props => props.main && `    
        display : none;
 `}    
    
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

    ${props => props.main && `    
         display : none;
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

    ${props => props.main && `    
        display : none;
 `}   

`;

export const Logo = styled(Link)`
    font-size: 1.8rem;
    color : ${oc.indigo[6]};
    letter-spacing: 2px;
    font-family: 'Rajdhani';
    text-decoration: none;
    cursor : pointer;
    margin-left : 1rem;

    ${props => props.main && `    
        display : none;
 `}   
`;

export const Space = styled.div`    
    flex-grow :  ${props => props.space};

    ${props => props.main && ` 
        display : none;   
        
 `}   
`;

export const InfoWrapper = styled.div`
    width : 1000px;
    display : flex;
    flex-direction : row;
    align-items : center;
    justify-content : space-between;
   

    ${props => props.main && `    
        display : none;
 `}   
`;

export const Info = styled.div`
    display : flex;
    text-align : center;
    color : ${oc.indigo[3]};
    
    a{
        flex : 1 0 auto;
        text-align : center;
        color : ${oc.indigo[3]};
        &:hover {        
            ${shadow(1)}
        }
        font-weight : 500;
    }
`;

// export const InfoButton = styled(Link)`
//     flex : 1 0 auto;
//     text-align : center;
//     color : ${oc.indigo[3]};
//     &:hover {        
//         ${shadow(1)}
//     }
//     font-weight : 500;

//     ${props => props.main && `    
//         display : none;
//  `}   
// `;


export const BoardWrapper = styled.div`
    background-image : url(${a});
    background-size : cover;
    background-repeat : no-repeat;
    background-position : top; 
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-items : center;  
    margin-top : 4rem;
    color: ${oc.gray[1]};
    font-weight : 700;
    font-size : 2rem;
    width : 100%;
    height : 800px;    

    
`;







