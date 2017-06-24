import Immutable from 'immutable'

const initialState = Immutable.fromJS({
    userDetail: ''
})


const userReducer = (state = initialState, action)=> {
    switch (action.type) {
        case "LOAD_USER_DATA":
            return state.set('userDetail', action.payload)
        default:
            return state
    }
}
export default userReducer