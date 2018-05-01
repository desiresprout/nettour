import React from 'react';
import { Positioner, WhiteBackground, HeaderContents, Spacer, Logo} from 'css/Header';
import FaRoad from 'react-icons/lib/fa/road';
import { Link } from 'react-router-dom';

const Header = ({children}) => {
    return (
        <Positioner>
            <WhiteBackground>
                <HeaderContents>
                <Logo to="/">NET ToUR</Logo>
                    <Spacer/>
                    {children}
                </HeaderContents>
            </WhiteBackground>            
        </Positioner>
    );
};

export default Header;


