import React from 'react';

import {Provider} from 'react-redux'

//components
import Layout from '../components/layout/index'
import ResetPasswordForm from '../components/form/resetpasswordForm'

//redux
import  {initStore} from '../store'
import reducers from '../reducers/index'

import Router from 'next/router'
import {checkLoggedIn} from '../utils/authServices'

class ResetPassword extends React.Component {
    static getInitialProps({req, query, res}) {
        if (!query.token) {
            res.redirect('/')
        }
        if (res) {
            if (checkLoggedIn()) {
                res.redirect('/')
            }
        } else {
            if (checkLoggedIn()) {
                Router.push('/')
            }
        }
        const isServer = !!req
        const store    = initStore(reducers, isServer)
        return {initialState: store.getState(), isServer, token: query.token}
    }

    constructor(props) {
        super(props)
        this.store = initStore(reducers, props.initialState, props.isServer)
    }

    render() {
        return (
            <Provider store={this.store}>
                <Layout>
                    {/*single-ad-page : STARTS*/}
                    <div id="reset-password">
                        <ResetPasswordForm token={this.props.token}/>
                    </div>
                    {/*single-ad-page : ENDS*/}
                </Layout>
            </Provider>
        )
    }
}

export default ResetPassword