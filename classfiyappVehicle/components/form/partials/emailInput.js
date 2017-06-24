const EmailInput = (props)=> {
    return (
        <input type="email" name={props.name} className="textInput" placeholder={props.placeholder}/>
    )
}


export default EmailInput