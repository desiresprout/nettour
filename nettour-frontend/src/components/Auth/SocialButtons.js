import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { shadow, media } from "css/styleUtil";
import GoogleIcon from "react-icons/lib/io/social-google";
import FacebookIcon from "react-icons/lib/io/social-facebook";

const Wrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
`;

const SocialButton = styled.div`
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  transition: 0.2s all;
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
  cursor: pointer;
  * + & {
    margin-left: 1rem;
  }
  background: white;
  ${props =>
    props.facebook &&
    `
        border: 2px solid ${oc.blue[6]};
        color: ${oc.blue[6]};
        &:hover {
            background: ${oc.blue[6]};
        }
        &:active {
            background: ${oc.blue[9]};
            border: 2px solid ${oc.blue[9]};
        }
    `}
  ${props =>
    props.google &&
    `
        border: 2px solid ${oc.red[6]};
        color: ${oc.red[6]};
        &:hover {
            background: ${oc.red[6]};
        }
        &:active {
            background: ${oc.red[9]};
            border: 2px solid ${oc.red[9]};
        }
    `}
    &:hover {
    color: white;
    ${shadow(1)}
  }
  svg {
    font-size: 1.6rem;
    margin-right: 1rem;
  }
  ${media.tablet`
        font-size: 1rem;
        svg {
            font-size: 1.4rem;
            margin-right: 0.5rem;
        }
    `}
`;
//<GoogleIcon/>  <FacebookIcon/>
const SocialButtons = ({ onsocial }) => (
  <Wrapper>
    <SocialButton facebook onClick={() => onsocial("facebook")}>
      <FacebookIcon />
      페이스북
    </SocialButton>
    <SocialButton google onClick={() => onsocial("google")}>
      <GoogleIcon />
      구글
    </SocialButton>
  </Wrapper>
);

export default SocialButtons;
