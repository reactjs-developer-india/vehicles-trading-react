import Head from 'next/head'
import Navigation from './navbar'
import Footer from './footer'
import LoginForm from '../form/loginForm'
import SignupForm from '../form/signupForm'
import ForgotPasswordForm from '../form/forgotpasswordForm'

import {connect} from 'react-redux'
import Alert from 'react-s-alert';
import React from 'react'
import cookie from 'react-cookie';
import {setAuth} from '../../actions/auth/index'
import {checkLoggedIn} from '../../utils/authServices'
import Router from 'next/router'

class Layout extends React.Component {

    componentWillMount() {
        if (checkLoggedIn()) {
            this.props.setAuth(true)
        } else {
            this.props.setAuth(false)
        }
    }

    render() {
        let {auth} = this.props;
        return (
            <div>
                <Head>
                    <title>Autotrader</title>
                    <meta charSet='utf-8'/>
                    <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
                    <link rel="stylesheet"
                          href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                    <link href="/static/app.min.css" rel="stylesheet"/>
                    <link rel="stylesheet" href="https://unpkg.com/react-select/dist/react-select.css"/>
                </Head>
                <Navigation/>
                <div className="container page-container">
                    {
                        this.props.error.get('isConnectionError') ?
                            <div>
                                <h1 className="text-center">Internet error</h1>
                            </div>
                            :
                            this.props.children
                    }
                    <LoginForm show={auth.get('showLoginModal')}/>
                    <SignupForm show={auth.get('showSignupModal')}/>
                    <ForgotPasswordForm show={auth.get('showForgotPasswordModal')}/>
                    <Alert stack={{limit: 3}}/>
                </div>

                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        auth: state.auth,
        error: state.error
    };
}

export default connect(mapStateToProps, {setAuth})(Layout);