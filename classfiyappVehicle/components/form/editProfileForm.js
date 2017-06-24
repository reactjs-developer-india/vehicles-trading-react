//package import
import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form';
//components import

//import config
import {apiCaller} from '../../utils/authServices'
import {API_V1} from '../../config'

//action import
const renderField   = ({input, label, type, meta: {touched, error, warning}}) => {
    return (
        <div className="input-wrapper">
            <label htmlFor="">{label}</label>
            <input {...input} type={type}
                              className={`textInput ${touched && error ? 'error':null}`}/>
        </div>
    )
}
let EditProfileForm = (props)=> {
    const {handleSubmit, submitting} = props;
    return (
        <form className="Form" id="loginForm" onSubmit={handleSubmit(props.updateProfile)}>
            <div>
                <Field type="email" name="email" component={renderField} label="Email"
                       className="textInput"/>
            </div>
            <div>
                <Field type="text" name="first_name" component={renderField} label="First Name"
                       className="textInput"/>
            </div>
            <div>
                <Field type="text" name="last_name" component={renderField} className="textInput"
                       label="Last Name"/>
            </div>
            <div>
                <Field type="number" label="Telephone" component={renderField} className="textInput"
                       name="phone"/>
            </div>
            <div>
                <Field type="text" label="Display Name" component={renderField}
                       className="textInput"
                       name="display_name"/>
            </div>
            <button type="submit" className="vt-btn">Submit</button>
        </form>
    )
}
const validate      = values => {
    const errors = {}
    if (!values.email) {
        errors.email = "required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}
EditProfileForm     = reduxForm({
    form: 'editprofileForm',  // a unique identifier for this form,
    validate
})(EditProfileForm)
EditProfileForm     = connect(
    state => ({
        initialValues: state.account.get('userDetail') // pull initial values from account reducer
    })
)(EditProfileForm)

export default EditProfileForm