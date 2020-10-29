import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "store/modules/base";
import { AuthWrapper } from "components/Auth";
import { Route } from "react-router-dom";
import { LoginContainer, RegisterContainer } from "containers/Auth";
class AuthPage extends Component {
  componentWillMount() {
    this.props.BaseActions.setHeaderVisibility(false);
  }

  componentWillUnmount() {
    this.props.BaseActions.setHeaderVisibility(true);
  }

  render() {
    return (
      <AuthWrapper>
        <Route path="/auth/login" component={LoginContainer} />
        <Route path="/auth/register" component={RegisterContainer} />
      </AuthWrapper>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(AuthPage);
