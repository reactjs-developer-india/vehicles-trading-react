export const loadProfileData = (data)=>dispatch=> {
    return dispatch({
        type: 'LOAD_USER_DATA',
        payload: data
    })
}