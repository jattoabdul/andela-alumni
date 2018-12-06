import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import configureStore from './stores/configureStore';
import {
    Router,
    Route,
    Switch
    } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import './index.scss';
import { Login } from './components/Auth';
import { Talents } from './components/Talents';
import { Partners } from './components/Partners';
import { General } from './components/General';
import { Connections } from './components/Connections';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 

const store = configureStore();
axios.defaults.baseURL = 'https://andela-alumni-alfread-bot.herokuapp.com/api/v1';

const app = document.getElementById('root');
const history = createBrowserHistory();

render(
    <Provider store={store}>
        <Router history={history}>
        <Switch>
            <Route
                exact
                path="/"
                component={Login}
            />
            <Route
                path="/talents"
                component={Talents}
            />
            <Route
                path="/partners"
                component={Partners}
            />
            <Route
                path="/general"
                component={General}
            />
            <Route
                path="/connections"
                component={Connections}
            />
        </Switch>
        </Router>
    </Provider>, app);
registerServiceWorker();
