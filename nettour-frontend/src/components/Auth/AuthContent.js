import React from 'react';
import  { Title } from 'css/AuthContent';


const AuthContent = ({title, children}) => (
    <div>
        <Title>{title}</Title>
        {children}
    </div>
);

export default AuthContent;