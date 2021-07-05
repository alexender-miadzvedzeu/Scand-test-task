import { combineReducers, createStore, applyMiddleware } from 'redux';
import taskReducer from './taskReducer.js';
import thunk from 'redux-thunk';

let reducers = combineReducers({
    taskReducer
})

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
