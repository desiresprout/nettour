import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as baseActions from 'store/modules/base';
import { bindActionCreators} from 'redux';
import Notify from 'components/Base/Notify';


class NotifyContainer extends Component {
    handleHide= ()=>{
        const { BaseActions } = this.props;
        BaseActions.sethide();

    }

    render() {
        const { notify } = this.props;

        return <Notify notify={notify} Hide={this.handleHide} />;
    }
}

export default connect(
    (state) => ({
        notify : state.base.notify,
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
        
    })
  )(NotifyContainer);