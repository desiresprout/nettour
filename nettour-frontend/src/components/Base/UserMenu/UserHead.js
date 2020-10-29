import React from "react";
import styled from "styled-components";
import oc from "open-color";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  div {
    &.change {
      position: absolute;
      top: 93px;
      right: 38%;
      padding: 0.6rem;
      text-align: center;
      font-weight: 600;
      width: 80px;
      color: white;
      border-radius: 5px;
      background: #5dc8cd;
      box-shadow: 0px 5px 0px 0px #1e8185;
      &:hover {
        transition: all 0.1s;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
  }
`;

const Thumbnail = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Username = styled.div`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${oc.gray[8]};
`;

const Count = styled.div`
  margin-top: 0.25rem;
  font-weight: 300;
  color: ${oc.gray[6]};
  b {
    font-weight: 500;
  }
`;

const UserHead = ({ thumbnail, username, postCount }) => (
  <Wrapper>
    <Thumbnail image={thumbnail} />
    <Username>{username}</Username>
    <Count>
      내가 쓴 여행글<b>{postCount}개</b>
    </Count>
    <div className="change">변경</div>
  </Wrapper>
);

export default UserHead;
