// import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk'; 
// import rootReducer from '../reducer/index';

// const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

// export const store = createStore(
//     rootReducer,
//     composeEnhancer(applyMiddleware(thunk)),
// );

// export default store; 

import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import rootReducer from "../reducer/index"
const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// export default store;