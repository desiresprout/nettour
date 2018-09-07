import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.div`
    width:100%;    
    background-image : url('static/images/wave-hero-background.svg');
    background-size : cover;
    background-repeat : no-repeat;      
`;

export const Positioner = styled.div`
    height: 37.5rem;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-items : center;
    
`;

// 해더의 내용
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

// 로고
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

// 중간 여백
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

export const InfoButton = styled.div`
    flex : 1 0 auto;
    text-align : center;
    color: ${oc.gray[1]};
    &:hover {        
        ${shadow(1)}
    }
    font-weigth : 400;
`;


export const BoardWrapper = styled.div`
    width : 300px;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-items : center;
`;







