///////////////entry page///////////////////////
import React from 'react';
import { render } from 'react-dom';
import { browserHistory as history, match } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router } from 'react-router';
import routes from './routes';
import { AUTH_USER , ARABIC } from './actions';
const store = configureStore();

const token = localStorage.getItem('token');
const lang = localStorage.getItem("language")

if (token) {
    store.dispatch({ type: AUTH_USER });
}
if(lang=="ar"){
    store.dispatch({ type: ARABIC })
}

render(
    <Provider store={store}>
        <Router routes={routes} history={history} />
    </Provider>,
    document.getElementById('root')
);

