import React from 'react';
import { Wrapper, Menuul, Menuli, MenuLink } from 'css/Menu';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    

    return (               
         <Wrapper>
                <Menuul>
                <Menuli><MenuLink to="/">Home</MenuLink></Menuli>
                <Menuli><MenuLink to="/board" >게시판</MenuLink></Menuli>
                <Menuli><MenuLink to="/question" >문의</MenuLink></Menuli>
                <Menuli><MenuLink to="/information">정보</MenuLink></Menuli>
                </Menuul>
        </Wrapper>                       
        
    );
};

export default Menu;