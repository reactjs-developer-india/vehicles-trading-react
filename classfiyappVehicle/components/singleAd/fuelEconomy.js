import NumberInput from '../form/partials/numberInput'

const FuelEconomy = ()=> {
    return (
        <div className="section fuel-economy">
            {/* title : STARTS*/}
            <div className="title mine-shaft-dark proximaSemiBold">
                Fuel Economy
            </div>
            {/*title:ENDS*/}
            <div className="content row">
                <div className="col-md-4">
                    <img src="/static/images/icons/gas.png" alt="fuel economy" className="pull-left"/>
                    <div className="stats pull-left proximaSemiBold">
                        <ul>
                            <li>
                                <span>City :</span><span>10.8L / 100km</span>
                            </li>
                            <li>
                                <span>Highway :</span><span>7.5L / 100km</span>
                            </li>
                            <li>
                                <span>Combined :</span><span>7.5L / 100km</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="input-group">
                        <ul>
                            <li>
                                <div className="text-center proximaSemiBold">Yearly Km</div>
                                <NumberInput name="yearly-km"/>
                            </li>
                            <li className="proximaSemiBold">
                                km
                            </li>
                            <li>
                                <div className="text-center proximaSemiBold">Fuel Cost</div>
                                <NumberInput name="fuel-cost"/>
                            </li>
                            <li className="proximaSemiBold">
                                ¢/l
                            </li>
                        </ul>
                    </div>
                    <div style={{color:"#8c8d8d"}}>Average price per litre for regular gas</div>
                </div>
                <div className="col-md-4 text-center">
                    <div style={{color:"#8c8d8d"}}>Est. Yearly Fuel Cost</div>
                    <div className="yearly-cost">
                        $2011
                    </div>
                    <div style={{color:"#8c8d8d"}}>Based on combined fuel economy
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FuelEconomy