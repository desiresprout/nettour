import React from 'react';
import { transitions } from 'css/styleUtil';
import { Wrapper } from 'css/AuthError';

const AuthError = ({children}) => (
    <Wrapper>
        {children}
    </Wrapper>
);

export default AuthError;