import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';

import alarms from './Alarms';
import app from './App';

const rootReducer = combineReducers({ alarms, app });

export default withReduxStateSync(rootReducer);
