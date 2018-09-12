import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { HomePage, AuthPage, MainPage } from 'pages';
import HeaderContainer from 'containers/Base/HeaderContainer';
import storage from 'lib/storage';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from 'redux/modules/user';
import { helmet } from 'react-helmet';


class App extends Component {

    initializeUserInfo = async () => {
        const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
        if(!loggedInfo) return; // 로그인 정보가 없다면 이 함수 종료

        const { UserActions } = this.props;
        UserActions.setLoggedInfo(loggedInfo);
        try {
            await UserActions.checkStatus();
        } catch (e) {
            storage.remove('loggedInfo');
            window.location.href = '/auth/login?expired';
        }
        
    }

    componentDidMount() {
        this.initializeUserInfo();
    }

    render() {
        return (
            <Fragment>
            <helmet>
            <title> NetTouR </title>
            </helmet>            
                <Route exact path="/" component={HomePage}/>
                <Route path="/auth" component={AuthPage}/>
                <Route path="/main" component={MainPage}/>
            </Fragment>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(App);