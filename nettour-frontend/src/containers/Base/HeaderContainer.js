import React, { Component,  Fragment } from 'react';
import Header, {ButtonLogin, UserThumbnail} from 'components/Base/Header';
import { connect } from 'react-redux';
import * as userActions from 'redux/modules/user';
import * as baseActions from 'redux/modules/base';
import { bindActionCreators } from 'redux';
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
        const { visible, user } = this.props;
        const { handleThumbnailClick } = this;
        if(!visible) return null;
        
        return (          
            <Fragment>
            
            <Helmet>
            <title>NetTouR - 여행 후기  </title>
            </Helmet>            
            <Header>            
               {     user.get('logged') 
                    ? ( <UserThumbnail thumbnail={user.getIn(['loggedInfo', 'thumbnail'])} onClick={handleThumbnailClick}/>)
                    : <ButtonLogin/>                    
               }    
               <UserMenuContainer eventTypes="click"/>
            </Header>   
            </Fragment>         
            
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['header', 'visible']),        
        user: state.user
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(HeaderContainer);