const homeReducer = (state = {name: 'kishan'}, action)=> {
    switch (action.type) {
        case 'CHANGE_NAME':
            return {...state, name: 'yey'}
        default:
            return state
    }
}

export default homeReducer
