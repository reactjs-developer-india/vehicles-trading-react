const clockReducer = (state = {lastUpdate: 0, light: false}, action) => {
    switch (action.type) {
        case 'TICK':
            return {lastUpdate: action.ts, light: !!action.light}
        default:
            return state
    }
}
export default clockReducer;