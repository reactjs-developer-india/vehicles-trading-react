export const startClock = () => dispatch => {
    return setInterval(() => dispatch({type: 'TICK', light: true, ts: Date.now()}), 800)
}