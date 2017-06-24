import Immutable from 'immutable'

const initialState = Immutable.fromJS({
    posts: [],
    isFetching: false
})

const searchReducer = (state = initialState, action)=> {
    switch (action.type) {
        case "SEARCH_RESULT":
            return state.set('posts', action.payload)
        case "IS_FETCHING_POSTS":
            return state.set('isFetching', action.payload)
        default:
            return state
    }
}

export default searchReducer