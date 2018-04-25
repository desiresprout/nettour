import React from 'react';
import { Positioner, WhiteBackground, HeaderContents, Logo, Spacer, GradientBorder} from 'css/Header';
import FaRoad from 'react-icons/lib/fa/road';

const Header = ({children}) => {
    return (
        <Positioner>
            <WhiteBackground>
                <HeaderContents>
                    <FaRoad/>
                    <Spacer/>
                    {children}
                </HeaderContents>
            </WhiteBackground>
            <GradientBorder/>
        </Positioner>
    );
};

export default Header;


