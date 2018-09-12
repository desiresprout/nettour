import React from 'react';
import { BrowserRouter, Route, withRouter, basename } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <BrowserRouter basename={"/"}>
                <Route path="/" component={App}/>
            </BrowserRouter>
        </Provider>
    );
};

export default Root;