export const fetchedSearchResult = (cites)=>dispatch => {
    return dispatch({
        type: 'CITY_LIST',
        payload: cites
    })
}

export const isFetchingPosts = (value)=>dispatch=> {
    return dispatch({
        type: 'IS_FETCHING_POSTS',
        payload: value
    })
}