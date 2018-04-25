import React from 'react';
import {Wrapper} from 'css/AuthButton'



const AuthButton = ({children, onClick}) => (
    <Wrapper onClick={onClick}>
        {children}
    </Wrapper>
);

export default AuthButton;