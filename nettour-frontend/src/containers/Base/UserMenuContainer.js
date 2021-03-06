import React, { Component } from "react";
import UserMenu, { UserMenuItem, Username } from "components/Base/UserMenu";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "store/modules/base";
import * as userActions from "store/modules/user";
import storage from "lib/storage";
import onClickOutside from "react-onclickoutside";

class UserMenuContainer extends Component {
  handleClickOutside = e => {
    const { BaseActions } = this.props;
    BaseActions.setUserMenuVisibility(false);
  };

  handleLogout = async () => {
    const { UserActions } = this.props;

    try {
      await UserActions.logout();
    } catch (e) {
      console.log(e);
    }
    storage.remove("loggedInfo");
    window.location.href = "/";
  };

  render() {
    const { visible, username } = this.props;
    const { handleLogout } = this;

    if (!visible) {
      return null;
    }

    return (
      <UserMenu>
        <Username username={username} />
        <UserMenuItem>설정</UserMenuItem>
        <UserMenuItem onClick={handleLogout}>로그아웃</UserMenuItem>
      </UserMenu>
    );
  }
}

export default connect(
  state => ({
    visible: state.base.userMenu.visible,
    username: state.user.loggedInfo.username,
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(onClickOutside(UserMenuContainer));
