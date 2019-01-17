import React, { Component } from 'react';
import { SidebarTemplateCss, SidebarWrapperCss, SidebarIcon, SidebarMenu } from 'css/Main';
import { Link } from 'react-router-dom';



class SidebarContainer extends Component {
    render() {
        return (
            <SidebarTemplateCss className="sidebartemplate">                

                        <SidebarWrapperCss>
                            
                            <SidebarMenu> 최신 포스트11 </SidebarMenu>                   
</SidebarWrapperCss>

                        <SidebarWrapperCss>
                            
                            <SidebarMenu > <Link to="/write" >글작성</Link> </SidebarMenu>                    
                        </SidebarWrapperCss>

                        <SidebarWrapperCss>
                             
                            <SidebarMenu> </SidebarMenu>                     
                        </SidebarWrapperCss>
                        
                    
                </SidebarTemplateCss>
        );
    }
}

export default SidebarContainer;