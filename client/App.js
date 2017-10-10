import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { StyleRoot } from 'radium';

import rootReducer from './rootReducer';
import Menu from './modules/menu';
import Lobby from './modules/lobby';
import Game from './modules/game';


const ReduxLogger = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  ReduxPromise,
  ReduxThunk,
  ReduxLogger
)(createStore);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <StyleRoot>
            <Router history={browserHistory}>
              <Route path="/" component={Menu.components.Menu}>
                <IndexRoute component={Menu.components.Start} />
                <Route path="create" component={Menu.components.Create} />
                <Route path="join" component={Menu.components.Join} />
              </Route>
              <Route path="/:accessCode/lobby" component={Lobby.components.Lobby} />
              <Route path="/:accessCode/game" component={Game.components.Game} />
            </Router>
        </StyleRoot>
      </Provider>
    );
  }
}
