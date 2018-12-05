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
                            <div>여행후기를 공유해보세요</div>                           
                            <InfoButton to="/main" >여행글보러가기</InfoButton>
                        </InfoWrapper>                
                    </ContentWrapper>
                    <BoardWrapper >                        
                
                                        
                    </BoardWrapper>
            </Positioner>
        </HeaderWrapper>
           

    );
};

export default Header;


