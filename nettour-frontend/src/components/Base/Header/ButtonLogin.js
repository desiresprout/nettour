import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow } from 'css/styleUtil';

export const Button = styled(Link)`
    font-weight: 600;
    color: ${oc.gray[1]};    
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    transition: .2s all;

    &:hover {        
        ${shadow(1)}
    }

    &:active {
        /* 마우스 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

const ButtonLogin = () => (
    <Button to="/auth/login">
        Login / Resigter
    </Button>
);

export default ButtonLogin;