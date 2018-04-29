import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as menuActions from 'redux/modules/menu';
import { bindActionCreators } from 'redux';
import Menu from 'components/Base/Menu';

class MenuContainer extends Component {       
       
    render() {
        const { visible} =this.props;
        if(!visible) return null; 
                
        return (          
                     <Menu></Menu>            
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['menu', 'visible']),        
    }),
    (dispatch) => ({
        
    })
)(MenuContainer);