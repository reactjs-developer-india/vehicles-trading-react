import React from 'react'
const VechicleCard = (props)=>(
    <div className="vehicle-card">
        <div className="preview">
            <img src="/static/images/vehicle/thumbnail.jpg" alt=""/>
        </div>
        <div className="shadow">
            <div className="price clearfix">
                <div className="pull-left">$ 18,888</div>
                <div className="pull-right">1,000km</div>
            </div>
            <div className="detail">
                <div className="title">2016 Dodge Journey | TOUCH</div>
                <div className="attr"><span className="attr-title">Status:</span> Used</div>
                <div className="attr"><span className="attr-title">Warrenty:</span> None</div>
                <div className="attr"><span className="attr-title">Tansmission:</span> Auto</div>
                <div className="attr"><span className="attr-title">Drivetrain:</span> FWD</div>
            </div>
        </div>
    </div>
)

export default VechicleCard