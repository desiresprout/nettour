import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { shadow, media } from "css/styleUtil";
import { Link } from "react-router-dom";

export const PostsCardCss = styled.div`
  margin: 0.875rem;
  display: flex;
  flex-direction: column;
  width: calc(25% - 1.75rem);
  text-decoration: none;
  cursor: pointer;
  background: #fff;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const PostsThumbnailCss = styled(Link)`
  width: 100%;
  padding-top: 52.63%;
  position: relative;
  display: block;

  & > img {
    background: #dee2e6;
    object-fit: cover;
    display: block;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
export const ImagePlaceholder = styled.div`
  background: ${oc.gray[3]};
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #98a8b9;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  & > svg {
    vertical-align: middle;
  }
`;

export const RadiusMaskCss = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.125s ease-in;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  opacity: 0;
`;
