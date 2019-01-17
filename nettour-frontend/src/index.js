import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
//import registerServiceWorker from './registerServiceWorker';
import './index.css';
import store from 'store';
import social from 'lib/social'





ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
