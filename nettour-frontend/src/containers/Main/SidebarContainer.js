import React, { Component } from 'react';
import { SidebarTemplate, SidebarWrapper, SidebarIcon, SidebarMenu } from 'css/Main';




class SidebarContainer extends Component {
    render() {
        return (
            <SidebarTemplate>                

                        <SidebarWrapper>
                            
                            <SidebarMenu> 최신 포스트 </SidebarMenu>                   
                        </SidebarWrapper>

                        <SidebarWrapper>
                            
                            <SidebarMenu> 통 계 </SidebarMenu>                    
                        </SidebarWrapper>

                        <SidebarWrapper>
                             
                            <SidebarMenu>asdasd </SidebarMenu>                     
                        </SidebarWrapper>
                        
                    
                </SidebarTemplate>
        );
    }
}

export default SidebarContainer;