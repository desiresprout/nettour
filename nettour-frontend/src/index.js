import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
//import registerServiceWorker from './registerServiceWorker';
import './index.css';
import configureStore from 'redux/configureStore';
import social from 'lib/social'
const store = configureStore();

window.social = social;



ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
