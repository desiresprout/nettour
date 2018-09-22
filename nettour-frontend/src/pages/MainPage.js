import React, { Component, Fragment } from 'react';
import SidebarContainer from 'containers/Main/SidebarContainer';
import ContentContainer from 'containers/Main/ContentContainer'
import HeaderContainer from 'containers/Base/HeaderContainer';

import { MainTemplateCss, ContentTemplateCss } from 'css/Main';

class MainPage extends Component {
    render() {
        return (            
            <MainTemplateCss>
                <SidebarContainer/>
                <ContentTemplateCss>
                    <HeaderContainer main/>
                    <ContentContainer/>
                </ContentTemplateCss>
            </MainTemplateCss>
           
            
        );
    }
}

/* MainTemplete : flex-direction : row

boardtemplate 안에 headercontainer랑 boardcontainer





*/

/* <Switch>
          <Route exact path="/(|trending)" component={Trending} />
          <Route path="/recent" component={Recent} />
          <Route path="/tags/:tag?" component={Tags} />
        </Switch> */

export default MainPage;