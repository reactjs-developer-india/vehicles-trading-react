import Immutable from 'immutable'

const initialState = Immutable.fromJS({
    category: {},
    bodyTypes: [],
    models: [],
    makers: [],
    isFetched: false
})

const categoryReducer = (state = initialState, action)=> {
    switch (action.type) {
        case "FETCHED_BODY_TYPES":
            return state.set('bodyTypes', action.payload)
        case "FETCHED_MAKERS":
            return state.set('makers', action.payload)
        case "FETCHED_MODELS":
            return state.set('models', action.payload)
        case "FETCHED_CATEGORY":
            return state.set('category', action.payload)
        case "ALL_DATA_FETCHED":
            return state.set('isFetched', action.payload)
        default:
            return state
    }
}

export default categoryReducer