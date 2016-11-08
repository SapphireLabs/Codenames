import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import StartMenu from './startMenu';

injectTapEventPlugin();

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/">
            <IndexRoute component={StartMenu} />
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}
