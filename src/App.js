import React from 'react';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import { components as menuComponents } from './menu';
import { components as lobbyComponents } from './lobby';
import Game from './game';

// Create browser history
const history = createHistory();

// Build middleware for intercepting and dispatching navigation actions
const ReduxRouter = routerMiddleware(history);

// Build middleware for observable actions
const epicMiddleware = createEpicMiddleware(rootEpic);

// Configure redux store and apply middleware
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(epicMiddleware, ReduxPromise, ReduxRouter, ReduxThunk)
  )
);

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
              component={lobbyComponents.Lobby}
            />
            <Route path="/:accessCode/game" component={Game.components.Game} />
            <Route path="/" component={menuComponents.Menu} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
);

export default App;
