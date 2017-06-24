import React from 'react';

import Layout from '../../components/layout/index'


import {Provider} from 'react-redux'
import  {initStore} from '../../store'
import reducers from '../../reducers/index'
import Router from 'next/router'

//auth services
import {checkLoggedIn} from '../../utils/authServices'

export default class Verify extends React.Component {
    static getInitialProps({req, query, res}) {
        const isServer = !!req
        const store    = initStore(reducers, isServer)

        if (res) {
            if (checkLoggedIn()) {
                res.redirect('/')
            }
        } else {
            if (checkLoggedIn()) {
                Router.push('/')
            }
        }
        return {initialState: store.getState(), isServer, verified: query.verified}
    }

    constructor(props) {
        super(props)
        this.store = initStore(reducers, props.initialState, props.isServer)
    }

    render() {
        return (
            <Provider store={this.store}>
                <Layout>
                    {/*verification : STARTS*/}
                    <div id="verification-page">
                        {
                            this.props.verified == 'true' ?
                                <h1 className="text-center">You have been verified successfully!</h1>
                                :
                                <h1 className="text-center">You haven't been verified. Please check the link again.</h1>
                        }
                    </div>
                    {/*verification : ENDS*/}
                </Layout>
            </Provider>
        )
    }
}