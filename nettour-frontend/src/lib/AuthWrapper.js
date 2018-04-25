import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow } from 'lib/styleUtil';

// 화면의 중앙에 위치시킨다
export const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

// 너비, 그림자 설정
export const ShadowedBox = styled.div`
    width: 500px;
    ${shadow(2)}
`;

// 로고
export const LogoWrapper = styled.div`
    background: ${oc.teal[7]};
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled(Link)`
    color: white;
    font-family: 'Rajdhani';
    font-size: 2.4rem;
    letter-spacing: 5px;
    text-decoration: none;
`;

// children 이 들어가는 곳
export const Contents = styled.div`
    background: white;
    padding: 2rem;
    height: auto;
`;