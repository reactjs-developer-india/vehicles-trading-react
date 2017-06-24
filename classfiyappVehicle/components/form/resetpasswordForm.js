import {Modal} from 'react-bootstrap'
import {Field, reduxForm} from 'redux-form';
import axios from 'axios'
import {API_URL} from '../../config'
import React from 'react'
import Alert from 'react-s-alert'
import Router from 'next/router'
/**
 * input component
 */

const renderField = ({input, label, type, meta: {touched, error, warning}}) => {
    return (
        <input {...input} placeholder={label} type={type} className={`textInput ${touched && error ? 'error':null}`}/>
    )
}

class ResetPasswordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {serverError: false, success: false}
    }

    async _handleSumit(values) {
        values.token = this.props.token
        this.setState({
            serverError: false
        })
        try {
            let response = await axios.post(`${API_URL}/auth/resetpassword`, values)
            if (response.data.status == 1) {

                this.setState({
                    success: true
                })
                Alert.success('Your password has been successfully updated. Please sign in again!', {
                    position: 'top-right',
                    timeout: 2000
                })
            } else {
                let {error} = response.data
                this.setState({
                    serverError: error[0].errorMessage,
                    success: false
                })
            }
        }
        catch (error) {
            let {response} = error
            if (!error.status) {
                this.setState({
                    serverError: "internet connection error",
                    success: false
                })
            }
        }
    }

    render() {

        const {handleSubmit, submitting} = this.props;

        return (
            <div>
                {
                    this.state.serverError ?
                        <div className="error-message text-center">
                            {this.state.serverError}
                        </div>
                        :
                        null
                }
                {
                    this.state.success ?
                        <h1 className="text-center">Your password has been Updated successfully</h1> :
                        <form id="loginForm" onSubmit={handleSubmit(this._handleSumit.bind(this))}
                              className="resetpassword-form">
                            <div>
                                <Field type="password" label="Password" component={renderField} className="textInput"
                                       name="password"/>
                            </div>
                            <div>
                                <Field type="password" label="confirm password" component={renderField}
                                       className="textInput"
                                       name="cpassword"/>
                            </div>
                            <button className="vt-btn" disabled={submitting}>Reset Password</button>
                        </form>
                }

            </div>
        )
    }
}

const validate = values => {
    const errors = {}
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

ResetPasswordForm = reduxForm({
    form: 'ResetPassword',
    validate
})(ResetPasswordForm);
export default ResetPasswordForm