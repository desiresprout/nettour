import React from "react";
import styled from "styled-components";
import oc from "open-color";

const ThumbnailWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  margin: 0 auto;
`;
const Thumbnail = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;

  background: ${oc.cyan[5]};
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &:hover {
    filter: brightness(105%);
  }
`;

const UserThumbnail = ({ thumbnail, onClick }) => (
  <ThumbnailWrapper>
    <Thumbnail image={thumbnail} onClick={onClick}></Thumbnail>
  </ThumbnailWrapper>
);

export default UserThumbnail;
