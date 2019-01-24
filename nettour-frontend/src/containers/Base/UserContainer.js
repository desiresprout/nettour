import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserHead from 'components/Base/UserMenu/UserHead';
import * as userActions from 'store/modules/user';
import UserPostContainer from 'containers/Base/UserPostContainer';

class UserContainer extends Component {

    getUserInfo = async () => {
        const { UserActions, username } = this.props;        
        
        try {
            UserActions.getUserInfo(username);
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getUserInfo();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.username !== this.props.username) {
            this.getUserInfo(); 
        }
    }
    
    render() {
        const { thumbnail, username, postCount } = this.props;
       
        
        return (
            <Fragment>

                <UserHead thumbnail={thumbnail} username={username} postCount={postCount} />
                <UserPostContainer username={username} />

            </Fragment>
            
        );
    }
}

export default connect(
    (state) => ({
        thumbnail: state.user.info.thumbnail,
        postCount: state.user.info.postCount,
        fetched: state.pender.success['user/GET_USER_INFO']
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    }),
)(UserContainer);

