import React, { Component } from "react";
import UserContainer from "containers/Base/UserContainer";
import styled, { css } from "styled-components";
import { shadow, media } from "css/styleUtil";

const Wrapper = styled.div`
  margin-top: 58px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  ${props =>
    props.responsive &&
    css`
      width: 1200px;
      margin-left: auto;
      margin-right: auto;
      ${media.wide`
            width: 992px;
        `}
      ${media.desktop`
            width: 100%;
        `}
    `}
  div {
    &.container {
      height: 100%;
    }
  }
`;

const PageWrapper = ({ responsive, children }) => (
  <Wrapper responsive={responsive}>{children}</Wrapper>
);

class UserPage extends Component {
  render() {
    const { match } = this.props;
    const { username } = match.params;
    return (
      <PageWrapper>
        <div className="container">
          <UserContainer username={username} />
        </div>
      </PageWrapper>
    );
  }
}

export default UserPage;
