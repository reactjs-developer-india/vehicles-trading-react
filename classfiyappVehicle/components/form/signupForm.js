import {Modal} from 'react-bootstrap'
import {showSignupModal, showLoginModal, showForgotPasswordModal} from '../../actions/auth/index'
import React from 'react'
import {Field, reduxForm} from 'redux-form';
import axios from 'axios'
import {API_URL} from '../../config'
import Alert from 'react-s-alert'
import {connect} from 'react-redux'

/**
 * input component
 */

const renderField = ({input, label, type, meta: {touched, error, warning}}) => {
    return (
        <input {...input} placeholder={label} type={type} className={`textInput ${touched && error ? 'error':null}`}/>
    )
}

class SignupForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {serverError: false}
    }

    async _handleSumit(values) {
        this.setState({
            serverError: false
        })
        values.userType = "user";
        try {
            let response = await axios.post(`${API_URL}/api/v1/users`, values)
            if (response.data.status == 1) {
                this.props.showSignupModal(false)
                    Alert.success('You have been successfully registered. Please verify your email address', {
                    position: 'top-right',
                    timeout: 'none'
                })
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
        }
    }

    render() {
        const {handleSubmit, submitting} = this.props;

        return (
            <Modal show={this.props.show} onHide={()=>this.props.showSignupModal(false)} bsSize="small">
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up here</Modal.Title>
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
                    <form className="Form" id="loginForm" onSubmit={handleSubmit(this._handleSumit.bind(this))}>
                        <div>
                            <Field type="email" name="email" component={renderField} label="Email (require)"
                                   className="textInput"/>
                        </div>
                        <div>
                            <Field type="text" name="first_name" component="input" placeholder="Your First Name"
                                   className="textInput"/>
                        </div>
                        <div>
                            <Field type="text" name="last_name" component="input" className="textInput"
                                   placeholder="Your First Name"/>
                        </div>
                        <div>
                            <Field type="password" label="Password" component={renderField} className="textInput"
                                   name="password"/>
                        </div>
                        <div>
                            <Field type="password" label="confirm password" component={renderField}
                                   className="textInput"
                                   name="cpassword"/>
                        </div>
                        <button type="submit" disabled={submitting} className="vt-btn">Submit</button>
                    </form>
                    <div className="clearfix">
                        <div className="pull-left forgot-password" onClick={()=>{
                            this.props.showSignupModal(false)
                            this.props.showForgotPasswordModal(true)
                        }}>
                            Forgot Password?
                        </div>
                        <div className="pull-right sign-up-link" onClick={()=>{
                            this.props.showSignupModal(false)
                            this.props.showLoginModal(true)
                        }}>
                            sign in here
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}


/***
 * validation rules for signup page
 * @author kishan
 * @param values
 */
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
    if (!values.cpassword) {
        errors.cpassword = 'required'
    } else if (values.cpassword != values.password) {
        errors.cpassword = "doesn't match"
    }
    return errors
}

SignupForm = reduxForm({
    form: 'signup',
    validate
})(SignupForm);

export default connect(null, {showSignupModal, showForgotPasswordModal, showLoginModal})(SignupForm);