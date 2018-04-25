import React from 'react';
import {BorderedButton} from 'lib/LoginButton';

const ButtonLogin = () => (
    <BorderedButton to="/auth/login">
        로그인 / 가입
    </BorderedButton>
);

export default ButtonLogin;