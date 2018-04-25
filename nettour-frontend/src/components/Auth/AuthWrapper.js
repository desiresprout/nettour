import React from 'react';
import { Positioner, ShadowedBox, LogoWrapper, Logo, Contents} from 'css/AuthWrapper'

const AuthWrapper = ({children}) => (
    <Positioner>
        <ShadowedBox>
            <LogoWrapper>
                <Logo to="/">Net TouR</Logo>
            </LogoWrapper>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
);

export default AuthWrapper;