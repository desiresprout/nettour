import React, { Component } from "react";
import { SocialButtons } from "components/Auth";
import * as authActions from "store/modules/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "store/modules/user";
import storage from "lib/storage";
import { withRouter } from "react-router-dom";

class SocialLoginContainer extends Component {
  handleSocialLogin = async provider => {
    const { AuthActions, UserActions, history } = this.props;

    try {
      const accessToken = await AuthActions.providerLogin(provider);
      await AuthActions.socialLogin({ provider, accessToken });
      if (!this.props.social.registered) {
        return history.push("/register");
      }
      const loggedInfo = this.props.result;
      UserActions.setLoggedInfo(loggedInfo);
      history.push("/");
      storage.set("loggedInfo", loggedInfo);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { handleSocialLogin } = this;

    return <SocialButtons onsocial={handleSocialLogin} />;
  }
}

export default connect(
  state => ({
    social: state.auth.social,
    result: state.auth.result,
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(withRouter(SocialLoginContainer));
