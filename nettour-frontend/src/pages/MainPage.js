import React, { Component, Fragment } from 'react';
import SidebarContainer from 'containers/Main/SidebarContainer';
import ContentContainer from 'containers/Main/ContentContainer'
import HeaderContainer from 'containers/Base/HeaderContainer';

import { MainTemplateCss, BodyTemplateCss } from 'css/Main';

class MainPage extends Component {
    render() {
        return (            
            <MainTemplateCss className="maintemplate">
            <SidebarContainer/>                
            
            <ContentContainer className="contentcontainer"/>
               
            </MainTemplateCss>
           
            
        );
    }
}

/* main템플릿 margin-left : 15rem;
    sidebar은 position : fixed, top :0 left:0
    bodytemplatecss flex, flex-direction : column


*/


/* <Switch>
          <Route exact path="/(|trending)" component={Trending} />
          <Route path="/recent" component={Recent} />
          <Route path="/tags/:tag?" component={Tags} />
        </Switch> */

export default MainPage;