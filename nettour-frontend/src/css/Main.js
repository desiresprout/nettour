import styled from "styled-components";
import oc from "open-color";
import { shadow, media } from "css/styleUtil";
import { Link } from "react-router-dom";

export const MainTemplateCss = styled.div`
  margin-left: 15rem;
`;

export const SidebarTemplateCss = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 100%;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  background: ${oc.gray[0]};
`;

export const SidebarWrapperCss = styled.div`
  padding: 4rem;
  padding-left: 2rem;
  display: flex;
  align-items: center;
`;

export const SidebarMenuCss = styled.div`
  margin-left: 0;
  display: flex;
  flex-direction: row;
  svg {
    font-size: 1.5rem;
    color: ${oc.indigo[7]};
    margin-right: 0.5rem;
  }
  div {
    font-size: 1.2rem;
    color: ${oc.indigo[9]};
    font-weight: 400;
  }
`;

export const ContentTemplateCss = styled.div`
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  background: ${oc.blue[0]};
`;
