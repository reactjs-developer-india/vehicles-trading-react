export const fetchedBodyType = (bodyTypes)=>dispatch => {
    return dispatch({
        type: 'FETCHED_BODY_TYPES',
        payload: bodyTypes
    })
}

export const fetchedMakers = (makers)=>dispatch=> {
    return dispatch({
        type: 'FETCHED_MAKERS',
        payload: makers
    })
}


export const fetchedModels = (models)=>dispatch=> {
    return dispatch({
        type: 'FETCHED_MODELS',
        payload: models
    })
}

export const fetchCategoryDetails = (category)=>dispatch=> {
    return dispatch({
        type: 'FETCHED_CATEGORY',
        payload: category
    })
}

export const allDataFetched = (value)=>dispatch=> {
    return dispatch({
        type: 'ALL_DATA_FETCHED',
        payload: value
    })
}