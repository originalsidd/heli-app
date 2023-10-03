import { createStore, combineReducers, applyMiddleware } from 'redux';
import { teamReducer } from './redcuer';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({ teamReducer });
export const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};
