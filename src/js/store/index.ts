import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../reducers/index";
import {bridgeMiddleware} from "../middleware";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-saga";

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(bridgeMiddleware, initialiseSagaMiddleware))
);

initialiseSagaMiddleware.run(apiSaga);

export default store;
