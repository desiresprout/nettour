import React from 'react';
import { Positioner, LogoWrapper, HeaderWrapper, Space, Logo, ContentWrapper,InfoWrapper, InfoButton, BoardWrapper } from 'css/Header';
import { Link } from 'react-router-dom';

const Header = ({children}) => {
    return (
        <HeaderWrapper className="Wrapper">
            <Positioner>                
                    <ContentWrapper>
                        <LogoWrapper>
                            <Logo to="/">NET ToUR</Logo>
                                <Space space="3"></Space>
                                {children}
                        </LogoWrapper>
                        <InfoWrapper>
                            <Space space="4"></Space>
                            <InfoButton>Question</InfoButton>
                            <InfoButton>InfoMation</InfoButton>
                        </InfoWrapper>                
                    </ContentWrapper>
                    <BoardWrapper>
                        <p></p>
                        <InfoButton>게시판</InfoButton>
                        <InfoButton>통계</InfoButton>                      
                    </BoardWrapper>
            </Positioner>
        </HeaderWrapper>
           

    );
};

export default Header;


