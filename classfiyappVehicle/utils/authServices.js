import cookie from 'react-cookie'
import axios from 'axios'

export const checkLoggedIn = ()=> {
    if (cookie.load('session')) {
        return true
    } else {
        return false
    }
}

export const apiCaller = async function (url, method, body) {
    if (method == 'get') {
        try {
            let response = await axios.get(url)
            return {data: response.data.data, internetError: false}
        } catch (error) {
            let {response} = error
            if (!error.status) {
                return {
                    internetError: true
                }
            }
        }
    }
    if (method == 'post') {
        try {
            let response = await axios.post(url, body)
            return {data: response.data.data, internetError: false}
        } catch (error) {
            let {response} = error
            if (!error.status) {
                return {
                    internetError: true
                }
            }
        }
    }

}