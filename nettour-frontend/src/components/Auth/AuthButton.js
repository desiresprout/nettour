import React from 'react';
import {Wrapper} from 'lib/AuthButton'



const AuthButton = ({children, onClick}) => (
    <Wrapper onClick={onClick}>
        {children}
    </Wrapper>
);

export default AuthButton;