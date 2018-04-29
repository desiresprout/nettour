import React from 'react';
import { Positioner, WhiteBackground, HeaderContents, Logo, Spacer} from 'css/Header';
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
        </Positioner>
    );
};

export default Header;


