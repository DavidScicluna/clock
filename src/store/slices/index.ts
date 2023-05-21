import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';

import app from './App';

const rootReducer = combineReducers({ app });

export default withReduxStateSync(rootReducer);
