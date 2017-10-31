import React from 'react';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import rootReducer from './rootReducer';
import Menu from './menu';
import Lobby from './lobby';
import Game from './game';

// Create browser history
const history = createHistory();

// Build middleware for intercepting and dispatching navigation actions
const ReduxRouter = routerMiddleware(history);

const middleware = [ReduxPromise, ReduxThunk, ReduxRouter];

if (process.env.NODE_ENV === 'development') middleware.push(ReduxLogger);

// Configure redux store and apply middleware
const store = createStore(rootReducer, applyMiddleware(...middleware));

const theme = () =>
  createMuiTheme({
    typography: {
      fontFamily: 'raleway, Roboto, sans-serif'
    }
  });

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="main">
          <Switch>
            <Route
              path="/:accessCode/lobby"
              component={Lobby.components.Lobby}
            />
            <Route path="/:accessCode/game" component={Game.components.Game} />
            <Route path="/" component={Menu.components.Menu} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
);

export default App;
