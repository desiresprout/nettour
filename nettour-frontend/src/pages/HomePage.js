import React, { Component, Fragment } from 'react';
import Background from 'components/Base/Background';
import { HeaderContainer}  from 'containers/Base';


class HomePage extends Component {
    render() {
        return (
            <Fragment>
            <HeaderContainer main={false}/>            
            <Background></Background>
            </Fragment>
        );
    }
}

export default HomePage;