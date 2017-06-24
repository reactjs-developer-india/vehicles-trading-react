import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers/index'
let store = null

export const initStore = (reducers, isServer) => {
    if (isServer && typeof window === 'undefined') {
        return createStore(reducers, applyMiddleware(thunkMiddleware))
    } else {
        if (!store) {
            store = createStore(reducers, applyMiddleware(thunkMiddleware))
        }
        return store
    }
}