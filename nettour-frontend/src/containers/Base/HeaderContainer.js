import React, { Component,  Fragment } from 'react';
import Header, { Buttonstyle, UserThumbnail} from 'components/Base/Header';
import { connect } from 'react-redux';
import * as userActions from 'store/modules/user';
import * as baseActions from 'store/modules/base';
import { bindActionCreators, compose } from 'redux';
import storage from 'lib/storage';
import UserMenuContainer from './UserMenuContainer';
import { Helmet } from 'react-helmet';


class HeaderContainer extends Component {
    
    handleThumbnailClick = (e) => {
        e.nativeEvent.stopImmediatePropagation();        
        const { BaseActions } = this.props;
        BaseActions.setUserMenuVisibility(true);
    }   
    
    render() {
        const { visible, user, login, main } = this.props;
        const { handleThumbnailClick } = this;
        if(!visible) return null;
        
        return (          
            <Fragment>            
            <Helmet>
            <title>NetTouR - 여행 후기  </title>
            </Helmet>            
            
            { !main
                ? ( 
                        <Header>            
                        {     user.logged 
                            ? ( <UserThumbnail thumbnail={user.loggedInfo.thumbnail} onClick={handleThumbnailClick}/>)
                            : <Buttonstyle className="login" />                    
                        }    
                            <UserMenuContainer eventTypes="click"/>
                        </Header> 
                  )                  
                :  
                (  
                    <Header className="header" main={main}>            
                    {     user.logged 
                        ? ( <UserThumbnail thumbnail={user.loggedInfo.thumbnail} onClick={handleThumbnailClick}/>)
                        : <Buttonstyle className="login" />                    
                    }    
                        <UserMenuContainer eventTypes="click"/>
                    </Header>  
                )           
            }            
              
            </Fragment>         
            
        );
    }
}

export default connect(
    
    (state) => ({
        visible: state.base.header.visible,        
        user: state.user
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch)
    }),
)(HeaderContainer);





