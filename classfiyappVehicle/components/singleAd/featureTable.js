const FeatureTable = (props)=> {
    return (
        <div className="featureTable row">
            {/*left section : STARTS*/}
            <div className="col-md-6">
                <ul>
                    <li>
                        <div className="title">Kilometeres</div>
                        <div className="desc">{props.data.kilometer} km</div>
                    </li>
                    <li>
                        <div className="title">Status</div>
                        <div className="desc">Used</div>
                    </li>
                    <li>
                        <div className="title">Trim</div>
                        <div className="desc">Canada VP | POWER
                            OPTION | ONE
                        </div>
                    </li>
                    <li>
                        <div className="title">Body Type</div>
                        <div className="desc">{props.data.body_type}</div>
                    </li>
                    <li>
                        <div className="title">Engine</div>
                        <div className="desc">106,256 km</div>
                    </li>
                    <li>
                        <div className="title">Cylinder</div>
                        <div className="desc">2.4L</div>
                    </li>
                    <li>
                        <div className="title">Transmission</div>
                        <div className="desc">{props.data.transmission}</div>
                    </li>
                    <li>
                        <div className="title">Drivetrain</div>
                        <div className="desc">FWD</div>
                    </li>
                </ul>
            </div>
            {/*left section : ENDS*/}
            {/*right section : STARTS*/}
            <div className="col-md-6">
                <ul>
                    <li>
                        <div className="title">Stock Number</div>
                        <div className="desc">-</div>
                    </li>
                    <li>
                        <div className="title">Exterior Colour</div>
                        <div className="desc">{props.data.exterior_colour}</div>
                    </li>
                    <li>
                        <div className="title">Interior Colour</div>
                        <div className="desc">-
                        </div>
                    </li>
                    <li>
                        <div className="title">Passengers</div>
                        <div className="desc">-</div>
                    </li>
                    <li>
                        <div className="title">Doors</div>
                        <div className="desc">{props.data.no_of_doors}</div>
                    </li>
                    <li>
                        <div className="title">Fuel Type</div>
                        <div className="desc">{props.data.fuel_type}</div>
                    </li>
                    <li>
                        <div className="title">Transmission</div>
                        <div className="desc">Automatic</div>
                    </li>
                    <li>
                        <div className="title">Drivetrain</div>
                        <div className="desc">FWD</div>
                    </li>
                    <li>
                        <div className="title">Drivetrain</div>
                        <div className="desc">FWD</div>
                    </li>
                </ul>
            </div>
            {/*right section : ENDS*/}
        </div>
    )
}

export default FeatureTable