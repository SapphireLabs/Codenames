import React from 'react';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import { StyleRoot } from 'radium';

import rootReducer from './rootReducer';
import Menu from './menu';
import Lobby from './lobby';
import Game from './game';

// Create browser history
const history = createHistory();

// Build middleware for intercepting and dispatching navigation actions
const ReduxRouter = routerMiddleware(history);

const middleware = [
  ReduxPromise,
  ReduxThunk,
  ReduxRouter,
];

if (process.env.NODE_ENV === 'development') middleware.push(ReduxLogger);

// Configure redux store and apply middleware
const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StyleRoot>
          <ConnectedRouter history={history}>
            <div className="main">
              <Route exact path="/" component={Menu.components.Menu} />
              <Route exact path="/" component={Menu.components.Start} />
              <Route path="/create" component={Menu.components.Create} />
              <Route path="/join" component={Menu.components.Join} />
              <Route path="/:accessCode/lobby" component={Lobby.components.Lobby} />
              <Route path="/:accessCode/game" component={Game.components.Game} />
            </div>
          </ConnectedRouter>
        </StyleRoot>
      </Provider>
    );
  }
}
