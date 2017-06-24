import Immutable from 'immutable'

const initialState = Immutable.fromJS({
    isConnectionError: false
})

const errorReducer = (state = initialState, action)=> {
    switch (action.type) {
        case "IS_CONNECTION_ERROR":
            return state.set("isConnectionError", action.payload)
        default:
            return state
    }
}

export default errorReducer