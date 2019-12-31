import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// 1 - reducers, 2- initial state, 3- applyMiddleware - redux thunk
const store = createStore(reducers, { }, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store} >  
        <App />
    </Provider>,
    document.querySelector('#root')
);

console.log('STRIPE KEY IS ', process.env.REACT_APP_STRIPE_KEY);
console.log('ENVIRONMENT IS ', process.env.NODE_ENV);
//Redux store produce new state or update state, provider inform that to app and all its childern component