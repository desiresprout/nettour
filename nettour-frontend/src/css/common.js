import styled, { css } from "styled-components";
import oc from "open-color";

export const commonbackground = css`
  border: ${props => props.main && "1px solid green"};
`;

export const ButtonCss = styled.div`
  ${props =>
    props.action &&
    `
        font-size : 0.875rem;
        color : ${oc.gray[7]};
        font-weight : 700;
        padding : 0.15rem 0.5rem;
        cursor : pointer;
        &:hover{
            color : ${oc.indigo[9]}
        }
    `}
`;
