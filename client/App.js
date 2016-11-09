import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Menu from './modules/menu';

injectTapEventPlugin();

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={Menu.components.Menu}>
            <IndexRoute component={Menu.components.Start} />
            <Route path="create" component={Menu.components.Create} />
            <Route path="join" component={Menu.components.Join} />
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}
