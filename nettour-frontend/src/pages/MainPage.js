import React, { Component, Fragment } from 'react';
import SidebarContainer from 'containers/Main/SidebarContainer';
import BoardContainer from 'containers/Main/BoardContainer'
import { MainTemplate, ContentTemplate } from 'css/Main';
import HeaderContainer from 'containers/Base/HeaderContainer';

class MainPage extends Component {
    render() {
        return (            
            <MainTemplate>
                <SidebarContainer/>
                <ContentTemplate>
                    <HeaderContainer main/>
                    <BoardContainer/>
                </ContentTemplate>
            </MainTemplate>
           
            
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