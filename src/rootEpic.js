import { combineEpics } from 'redux-observable';

import api from './api';
import { epics as menuEpics } from './menu';

const rootEpic = (...args) =>
  combineEpics(...Object.values(menuEpics))(...args, { api });

export default rootEpic;
