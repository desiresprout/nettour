import React from 'react';
import { Positioner, LogoWrapper, HeaderWrapper, Space, Logo, ContentWrapper,InfoWrapper, InfoButton, BoardWrapper } from 'css/Header';
import {  Link } from 'react-router-dom';



const Header = ({children, main}) => {
    return (
        <HeaderWrapper main={main}>
            <Positioner  main={main}  >                
                    <ContentWrapper main={main} >
                        <LogoWrapper  main={main}>
                            <Logo to="/">Net ToUR</Logo>
                                <Space space="3"></Space>
                                {children}
                        </LogoWrapper>
                        <InfoWrapper>
                            <Space space="4"></Space>                            
                            <InfoButton to="/main" >Information</InfoButton>
                        </InfoWrapper>                
                    </ContentWrapper>
                    <BoardWrapper >
                        <p>Please let me know your experience.
                                You might have another experience.</p>
                        <InfoButton to="/main">게시판</InfoButton>
                        <InfoButton to="/main" >통계</InfoButton>                      
                    </BoardWrapper>
            </Positioner>
        </HeaderWrapper>
           

    );
};

export default Header;


