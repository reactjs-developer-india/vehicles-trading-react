export const isDisconnected = (value)=>dispatch=> {
    return dispatch({type: 'IS_CONNECTION_ERROR', payload: value})
}