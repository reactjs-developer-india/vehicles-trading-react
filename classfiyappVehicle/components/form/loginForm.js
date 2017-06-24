import {Modal} from 'react-bootstrap'
import {showLoginModal, showSignupModal, showForgotPasswordModal, setAuth} from '../../actions/auth/index'
import {Field, reduxForm} from 'redux-form';
import axios from 'axios'
import {API_URL} from '../../config'
import React from 'react'
import Alert from 'react-s-alert'
import {connect} from 'react-redux'
import cookie from 'react-cookie';

/**
 * input component
 */

const renderField = ({input, label, type, meta: {touched, error, warning}}) => {
    return (
        <input {...input} placeholder={label} type={type} className={`textInput ${touched && error ? 'error':null}`}/>
    )
}

class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {serverError: false}
    }

     _handleSumit=function(values) {
        this.setState({
            serverError: false
        })
        try {
            let response = await axios.post(`${API_URL}/auth/user/signin`, values)


            // checking response status
            if (response.data.status == 1) {
                cookie.save('session', response.data.data.token, {path: '/'});
                this.props.showLoginModal(false)
                Alert.success('You have been successfully logged in', {
                    position: 'top-right'
                })
                this.props.setAuth(true)
            } else {
                let {error} = response.data
                this.setState({
                    serverError: error[0].errorMessage
                })
            }
        }
        catch (error) {
            let {response} = error
            if (!error.status) {
                this.setState({
                    serverError: "internet connection error"
                })
            }
            if (response && response.status == 401) {
                let errorMessage = response.data.error[0].errorMessage
                this.setState({
                    serverError: errorMessage
                })
            }
        }
    }

    render() {
        const {handleSubmit, submitting} = this.props;
        return (
            <Modal show={this.props.show} onHide={()=>this.props.showLoginModal(false)}
                   bsSize="small">
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {
                        this.state.serverError ?
                            <div className="error-message">
                                {this.state.serverError}
                            </div>
                            :
                            null
                    }
                    <form id="loginForm" onSubmit={handleSubmit(this._handleSumit.bind(this))}>
                        <div>
                            <Field type="email" name="email" component={renderField} label="Email (required)"
                                   className="textInput"/>
                        </div>
                        <div>
                            <Field type="password" label="Password (required)" component={renderField}
                                   className="textInput"
                                   name="password"/>
                        </div>
                        <button className="vt-btn" disabled={submitting}>Login</button>
                    </form>
                    <div className="clearfix">
                        <div className="pull-left forgot-password" onClick={()=>{
                        this.props.showLoginModal(false)
                        this.props.showForgotPasswordModal(true)
                        }}>
                            Forgot Password?
                        </div>
                        <div className="pull-right sign-up-link" onClick={()=>{
                        this.props.showLoginModal(false)
                        this.props.showSignupModal(true)
                    }}>
                            Sign Up here.
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = "required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = "required"
    }
    return errors
}

LoginForm = reduxForm({
    form: 'login',
    validate
})(LoginForm);

export default connect(null, {showLoginModal, showForgotPasswordModal, showSignupModal, setAuth})(LoginForm);