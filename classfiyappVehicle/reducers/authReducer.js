import Immutable from 'immutable'

const initialState = Immutable.fromJS({
    showLoginModal: false,
    showSignupModal: false,
    showForgotPasswordModal: false,
    isLoggedIn: false
})

const authReducer = (state = initialState, action)=> {
    switch (action.type) {
        case "SHOW_LOGIN_MODAL":
            return state.set("showLoginModal", action.payload)
        case "SHOW_SIGNUP_MODAL":
            return state.set("showSignupModal", action.payload)
        case "SHOW_FORGOT_PWD_MODAL":
            return state.set("showForgotPasswordModal", action.payload)
        case "SET_AUTH":
            return state.set("isLoggedIn", action.payload)
        default:
            return state
    }
}

export default authReducer