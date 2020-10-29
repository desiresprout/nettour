import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import {
  HomePage,
  AuthPage,
  MainPage,
  PostPage,
  NotFound,
  UserPage,
} from "pages";
import LoginContainer from "containers/Auth/LoginContainer";
import RegisterContainer from "containers/Auth/RegisterContainer";
import storage from "lib/storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "store/modules/user";
import { hot } from "react-hot-loader";
import EmailAuthContainer from "containers/Auth/EmailAuthContainer";
import EditorContainer from "containers/Post/EditorContainer";
import NotifyContainer from "containers/Base/NotifyContainer";
class App extends Component {
  initializeUserInfo = async () => {
    const loggedInfo = storage.get("loggedInfo");
    if (!loggedInfo) return;

    const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo);
    try {
      await UserActions.checkStatus();
    } catch (e) {
      storage.remove("loggedInfo");
      window.location.href = "/login?expired";
    }
  };

  componentDidMount() {
    this.initializeUserInfo();
  }

  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/register" component={RegisterContainer} />
          <Route path="/main" component={MainPage} />
          <Route path="/write" component={EditorContainer} />
          <Route path="auth" component={AuthPage} />
          <Route path="/@:username/:urlslug" component={PostPage} />
          <Route path="/auth-email" component={EmailAuthContainer} />
          <Route path="/@:username" component={UserPage} />
          <Route component={NotFound} />
        </Switch>
        <NotifyContainer />
      </Fragment>
    );
  }
}

export default connect(null, dispatch => ({
  UserActions: bindActionCreators(userActions, dispatch),
}))(hot(module)(App));
