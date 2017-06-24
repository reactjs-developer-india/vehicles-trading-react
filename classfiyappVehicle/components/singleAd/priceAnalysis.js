import Slider from 'react-rangeslider'
const PriceAnalysis = ()=> {
    return (
        <div className="section price-analysis">
            {/* title : STARTS*/}
            <div className="title mine-shaft-dark proximaSemiBold">
                autoTRADER Price Analysis
            </div>
            {/*title:ENDS*/}

            <div className="row content">
                <div className="col-md-6">
                    <div className="slider-wrapper">
                        <Slider
                            min={0}
                            max={100}
                            value={50}
                            mainToolTipLabel="Average Market Price"
                            mainToolTipPrice="$12000"
                            secondToolTip="This Vehicle"
                            secondToolTipPrice="$100"
                            secondValue={20}
                        />

                    </div>
                    <ul className="proximaSemiBold">
                        <li>Great Price</li>
                        <li>Good Price</li>
                        <li>Above Average</li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <div className="sub-title proximaSemiBold">
                        Great Price
                    </div>
                    <div className="sub-content">
                        For this vehicle based on mileage, region and options.
                        This graph compares the vehicle to the average market price for a 2012 Dodge Journey in your
                        area based on recent listings on autoTRADER.ca. It is intended only as a guide. Factors such as
                        vehicle condition can affect prices.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PriceAnalysis