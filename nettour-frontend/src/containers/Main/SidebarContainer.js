import React, { Component } from 'react';
import { SidebarTemplateCss, SidebarWrapperCss, SidebarIcon, SidebarMenu } from 'css/Main';




class SidebarContainer extends Component {
    render() {
        return (
            <SidebarTemplateCss>                

                        <SidebarWrapperCss>
                            
                            <SidebarMenu> 최신 포스트 </SidebarMenu>                   
                        </SidebarWrapperCss>

                        <SidebarWrapperCss>
                            
                            <SidebarMenu> 통 계 </SidebarMenu>                    
                        </SidebarWrapperCss>

                        <SidebarWrapperCss>
                             
                            <SidebarMenu>asdasd </SidebarMenu>                     
                        </SidebarWrapperCss>
                        
                    
                </SidebarTemplateCss>
        );
    }
}

export default SidebarContainer;