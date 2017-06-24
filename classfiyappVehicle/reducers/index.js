import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import authReducer from './authReducer'
import errorReducer from './errorReducer'
import categoryReducer from './categoryReducer'
import searchReducer from './searchReducer'
import userReducer from './userReducer'

const reducers = combineReducers({
    auth: authReducer,
    form: formReducer,
    error: errorReducer,
    category: categoryReducer,
    result: searchReducer,
    account: userReducer
})


export default reducers