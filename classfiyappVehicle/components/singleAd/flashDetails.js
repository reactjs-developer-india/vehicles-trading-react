const FlashDetails = ()=> {
    return (
        <div className="flash-details">
            {/* flash details : STARTS*/}
            <div className="flash-box">
                {/* flash-box : STARTs*/}
                <div className="row">
                    <div className="col-md-3 box text-center">
                        <img src="/static/images/icons/price-tag.png" alt=""/>
                        <div className="price mine-shaft-dark proximaSemiBold">$10,498</div>
                        <span>List Price</span>
                        <img src="/static/images/icons/vertical-logo.png" className="vertical-stripe" alt="auto trade"/>
                    </div>
                    <div className="col-md-3 box right-border">
                        <div className="title mine-shaft-dark proximaSemiBold">
                            Great Price
                        </div>
                        <div className="desc light-text">
                            For this vehicle based on mileage, options and assumes good condition or better
                        </div>
                    </div>
                    <div className="col-md-3 box right-border">
                        <div className="title mine-shaft-dark proximaSemiBold">
                            Key Features
                        </div>
                        <ul>
                            <li><span>Dual Climate Controls</span></li>
                            <li><span>Stability Control</span></li>
                            <li><span>Traction Control</span></li>
                            <li><span>Power Windows</span></li>
                        </ul>
                    </div>
                    <div className="col-md-3 box">
                        <div className="title mine-shaft-dark proximaSemiBold">
                            Conditional Analysis
                        </div>
                        <ul>
                            <li><span>Average km</span></li>
                            <li><span>Emission Tested</span></li>
                            <li><span>One Owner</span></li>
                            <li><span>Free CarProof</span></li>
                        </ul>
                    </div>
                </div>
                {/* flash-box : ENDS*/}

            </div>
            <div className="btn-groups row">
                <div className="col-md-4 text-center">
                    <button className="vt-btn vt-secondary-btn proximaSemiBold">Save</button>
                </div>
                <div className="col-md-4 text-center">
                    <button className="vt-btn vt-secondary-btn proximaSemiBold">Compare</button>
                </div>
                <div className="col-md-4 text-center">
                    <button className="vt-btn vt-secondary-btn proximaSemiBold">Save</button>
                </div>
            </div>
            {/* flash details : STARTS*/}
        </div>
    )
}

export default FlashDetails