import {Modal} from 'react-bootstrap'
import {showForgotPasswordModal, showLoginModal} from '../../actions/auth/index'
import {Field, reduxForm} from 'redux-form';
import axios from 'axios'
import {API_URL} from '../../config'
import React from 'react'
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

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {serverError: false}
    }

    async _handleSumit(values) {

        this.setState({
            serverError: false
        })
        try {
            let response = await axios.post(`${API_URL}/auth/forgotpassword`, values)
            if (response.data.status == 1) {
                this.props.showForgotPasswordModal(false)
                Alert.success('Link has been sent to given mail id to recover password', {
                    position: 'top-right',
                    timeout: 'none'
                })
            } else {
                let {error} = response.data
                this.setState({
                    serverError: error[0].errorMessage
                })
            }

        } catch (error) {
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
            <Modal show={this.props.show} onHide={()=>this.props.showForgotPasswordModal(false)}
                   bsSize="small">
                <Modal.Header closeButton>
                    <Modal.Title>Recover Password</Modal.Title>
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
                        <button className="vt-btn" disabled={submitting}>Recover Password</button>
                    </form>
                    <div className="clearfix">
                        <div className="pull-left forgot-password" onClick={()=>{
                        this.props.showForgotPasswordModal(false)
                        this.props.showLoginModal(true)
                        }}>
                            Sign In
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
    return errors
}

ForgotPassword = reduxForm({
    form: 'ForgotPassword',
    validate
})(ForgotPassword);
export default connect(null, {showForgotPasswordModal, showLoginModal})(ForgotPassword);