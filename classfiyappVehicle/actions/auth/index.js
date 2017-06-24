export const showLoginModal = (value) => dispatch => {
    return dispatch({type: 'SHOW_LOGIN_MODAL', payload: value})
}

export const showSignupModal = (value)=>dispatch=> {
    return dispatch({type: 'SHOW_SIGNUP_MODAL', payload: value})
}


export const showForgotPasswordModal = (value)=>dispatch=> {
    return dispatch({type: "SHOW_FORGOT_PWD_MODAL", payload: value})
}


export const setAuth = (value)=>dispatch=> {
    return dispatch({type: "SET_AUTH", payload: value})
}