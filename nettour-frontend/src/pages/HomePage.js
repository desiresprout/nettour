import React, { Component, Fragment } from 'react';
import Background from 'components/Base/Background';
import HeaderContainer from 'containers/Base/HeaderContainer';


class HomePage extends Component {
    render() {
        return (
            <Fragment>
            <HeaderContainer/>            
            <Background></Background>            
            </Fragment>
        );
    }
}

export default HomePage;