import React, { Component } from 'react';
import { SidebarTemplate, SidebarWrapper, SidebarIcon, SidebarMenu } from 'css/Main';
import { IoMdHeart } from "react-icons/io";


class SidebarContainer extends Component {
    render() {
        return (
            <SidebarTemplate>
                    <SidebarContainer>

                        <SidebarWrapper>
                            <IoMdHeart/> 
                            <SidebarMenu> asdasd</SidebarMenu>                   
                        </SidebarWrapper>

                        <SidebarWrapper>
                            <IoMdHeart/> 
                            <SidebarMenu> asdasd</SidebarMenu>                    
                        </SidebarWrapper>

                        <SidebarWrapper>
                            <IoMdHeart/> 
                            <SidebarMenu>asdasd</SidebarMenu>                     
                        </SidebarWrapper>
                        
                    </SidebarContainer>
                </SidebarTemplate>
        );
    }
}

export default SidebarContainer;