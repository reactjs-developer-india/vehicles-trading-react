const CheckBox = (props)=> {
    return (
        <label className="control control--checkbox">{props.label}
            <input type="checkbox" name={props.name}/>
            <div className="control__indicator"></div>
        </label>
    )
}


export default CheckBox