import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { shadow } from "css/styleUtil";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
// 너비, 그림자 설정
const ShadowedBox = styled.div`
  width: 500px;
  ${shadow(2)}
`;
// 로고
const LogoWrapper = styled.div`
  background: ${oc.indigo[3]};
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Logo = styled(Link)`
  color: white;
  font-family: "Rajdhani";
  font-size: 2.4rem;
  letter-spacing: 5px;
  text-decoration: none;
`;

// children 이 들어가는 곳
const Contents = styled.div`
  background: white;
  padding: 2rem;
  height: auto;
`;

const AuthWrapper = ({ children }) => (
  <Wrapper>
    <Positioner>
      <ShadowedBox>
        <LogoWrapper>
          <Logo to="/">Net TouR</Logo>
        </LogoWrapper>
        <Contents>{children}</Contents>
      </ShadowedBox>
    </Positioner>
  </Wrapper>
);

export default AuthWrapper;
