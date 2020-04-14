import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from "redux-thunk-recursion-detect";
import { createLogger } from 'redux-logger';
import { mainReducer } from "./_store/reducers/MainReducer";

const loggerMiddleware = createLogger();

export const store = createStore(
    mainReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);