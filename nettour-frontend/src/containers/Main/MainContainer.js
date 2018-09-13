import React, { Component } from 'react';
import SidebarContainer from './SidebarContainer';
import HeadContainer from 'containers/Base/HeaderContainer';
import BoardContainer from './BoardContainer';
import { MainTemplate } from 'css/Main';



class MainContainer extends Component {
    render() {
        return (
            <MainTemplate>
                <SidebarContainer/>


        
                   
                
            </MainTemplate>
        );
    }
}

export default MainContainer;


//여긴 Board컴포넌트를 만들어서 json받아서 boardlist에 넘겨주고 boardlist에서 map으로 해서 board에 넘겨주기


