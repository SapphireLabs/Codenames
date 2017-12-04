import { combineEpics } from 'redux-observable';

import api from './api';
import { epics as menuEpics } from './menu';
import { epics as lobbyEpics } from './lobby';

const rootEpic = (...args) =>
  combineEpics(...Object.values(menuEpics), ...Object.values(lobbyEpics))(
    ...args,
    { api }
  );

export default rootEpic;
