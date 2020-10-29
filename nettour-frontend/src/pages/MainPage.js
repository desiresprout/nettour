import React, { Component, Fragment } from "react";
import SidebarContainer from "containers/Main/SidebarContainer";
import ContentContainer from "containers/Main/ContentContainer";
import { MainTemplateCss, BodyTemplateCss } from "css/Main";
class MainPage extends Component {
  render() {
    return (
      <MainTemplateCss className="maintemplate">
        <SidebarContainer />
        <ContentContainer className="contentcontainer" />
      </MainTemplateCss>
    );
  }
}
export default MainPage;
