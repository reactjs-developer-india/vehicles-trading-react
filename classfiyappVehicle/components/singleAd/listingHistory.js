
const ListingHistory = ()=> {
    return (
        <div className="section listing-history">
            {/* title : STARTS*/}
            <div className="title mine-shaft-dark proximaSemiBold">
                Listing History
            </div>
            <div className="content row">
                <div className="col-md-2">
                    <div className="green-btn proximaSemiBold"><span
                        className="glyphicon glyphicon-triangle-bottom"></span>$1000
                    </div>
                </div>
                <div className="col-md-10">
                    <ul>
                        <li className="clearfix proximaSemiBold">
                            <div className="pull-left">Current Price</div>
                            <div className="pull-right">$10,440</div>
                        </li>
                        <li className="clearfix">
                            <div className="pull-left">Discounted January 19, 2017</div>
                            <div className="pull-right">$10,440</div>
                        </li>
                        <li className="clearfix">
                            <div className="pull-left">Originally listed for</div>
                            <div className="pull-right">$10,440</div>
                        </li>
                    </ul>
                </div>
            </div>
            {/*title:ENDS*/}
        </div>
    )
}

export default ListingHistory