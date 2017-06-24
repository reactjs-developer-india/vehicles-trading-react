import React from 'react'
import {Provider} from 'react-redux'
import  {initStore} from '../store'
import Page from '../components/Page'
import {startClock} from '../actions/clockActions'
import Head from 'next/head'

import reducers from '../reducers/index'

export default class Counter extends React.Component {
    static getInitialProps({req}) {
        const isServer = !!req
        const store    = initStore(reducers, isServer)
        store.dispatch({type: 'TICK', light: !isServer, ts: Date.now()})
        return {initialState: store.getState(), isServer}
    }

    constructor(props) {
        super(props)
        this.store = initStore(reducers, props.initialState, props.isServer)
    }

    componentDidMount() {
        this.timer = this.store.dispatch(startClock())
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <Provider store={this.store}>
                <div className="container">
                    <Head>
                        <link href="static/app.min.css" rel="stylesheet"/>
                    </Head>
                    <Page title='Index' linkTo='/other'/>
                </div>
            </Provider>
        )
    }
}
