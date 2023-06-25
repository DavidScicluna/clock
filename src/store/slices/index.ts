import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';

import alarms from './Alarms';
import app from './App';
import timers from './Timers';

const rootReducer = combineReducers({ alarms, app, timers });

export default withReduxStateSync(rootReducer);
