import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { firstReducer, secondReducer } from './reducers';
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
	firstState: firstReducer,
	secondState: secondReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
