import React, { Component } from 'react';
import { SidebarTemplateCss, SidebarWrapperCss, SidebarMenuCss } from 'css/Main';
import { Link } from 'react-router-dom';
import Home from 'react-icons/lib/fa/home';
import Book from 'react-icons/lib/fa/book';
import styled from 'styled-components';
import oc from 'open-color';
import AuthContainer from 'containers/Main/AuthContainer';


 const debarCss = styled(Link)`
     margin-left : 0;
     display : flex;
     flex-direction : row;
     
     svg{
         font-size : 1.5rem;
         color : ${oc.indigo[7]};
         margin-right : 0.5rem;
     }
     div{
         font-size : 1.2rem;
         color : ${oc.indigo[9]};
         font-weight : 400;
         
     }
`;

class SidebarContainer extends Component {
    render() {
        return (
            <SidebarTemplateCss className="sidebartemplate"> 

                        <SidebarWrapperCss>                           
                            <SidebarMenuCss>                                                        
                                <Home/>
                                <div>메인 홈페이지</div>                             
                            </SidebarMenuCss>
                               
                        </SidebarWrapperCss>

                        <SidebarWrapperCss className="sidebarwrapper">
                            <Link to="/write"> 
                                <SidebarMenuCss>
                                    <Book/>                            
                                    <div>글 작성</div>
                                </SidebarMenuCss> 
                            </Link>                     
                        </SidebarWrapperCss>

                        <AuthContainer/>                     
                    
                </SidebarTemplateCss>
        );
    }
}

//맨밑에 로그인 자리를 놓을까나?

export default SidebarContainer;