const TextInput = (props)=> {
    return (
        <input type="text" name={props.name} className="textInput" placeholder={props.placeholder}/>
    )
}


export default TextInput