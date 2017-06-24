import React from 'react'
import cookie from 'react-cookie'
import Router from 'next/router'
import {connect} from 'react-redux'
import {setAuth} from '../actions/auth/index'
const checkLoggedIn = ()=> {
    if (cookie.load('session')) {
        return true
    } else {
        return false
    }
}
export default function withAuth(AuthComponent) {

    return class Authenticated extends React.Component {
        // static getInitialProps(props) {
        //     const isServer = !!props.req
        //     const store    = initStore(reducers, isServer)
        //     if (props.res) {
        //         if (!checkLoggedIn()) {
        //             props.res.redirect('/ad')
        //         }
        //     } else {
        //         if (!checkLoggedIn()) {
        //             Router.push('/ad')
        //         }
        //     }
        //     return {initialState: store.getState(), isServer}
        // }

        constructor(props) {
            super(props)
        }

        render() {
            return (
                <AuthComponent {...this.props}/>
            )
        }
    }
}

