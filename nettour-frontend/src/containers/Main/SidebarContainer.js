import React, { Component } from 'react';
import { SidebarTemplateCss, SidebarWrapperCss, SidebarIcon, SidebarMenu } from 'css/Main';




class SidebarContainer extends Component {
    render() {
        return (
            <SidebarTemplateCss className="sidebartemplate">                

                        <SidebarWrapperCss>
                            
                            <SidebarMenu> 최신 포스트 </SidebarMenu>                   
                        </SidebarWrapperCss>

                        <SidebarWrapperCss>
                            
                            <SidebarMenu>  </SidebarMenu>                    
                        </SidebarWrapperCss>

                        <SidebarWrapperCss>
                             
                            <SidebarMenu> </SidebarMenu>                     
                        </SidebarWrapperCss>
                        
                    
                </SidebarTemplateCss>
        );
    }
}

export default SidebarContainer;