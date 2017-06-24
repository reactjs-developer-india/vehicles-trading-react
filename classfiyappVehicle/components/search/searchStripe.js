import Link from 'next/link'

const ResultStripe = (props)=> {
    let {title, description, kilometer, price, cover_photo, posts} = props.data
    return (
        <div className="result-stripe">
            <div className="clearfix">
                <div className="ad-detail pull-left">
                    <Link href={`/post?id=${posts._id}`} as={`/post/${posts._id}`} prefetch><a>
                        <img src={cover_photo} alt={title}/></a></Link>
                    <div>
                        <div className="ad-title mine-shaft-light proximaBold">
                            <Link href={`/post?id=${posts._id}`} as={`/post/${posts._id}`}
                                  prefetch><a>{title}</a></Link>
                        </div>
                        <div className="ad-desc">
                            {description}
                        </div>
                    </div>
                </div>
                <div className="make-logo pull-right">
                    <img src="/static/images/make-logo.png" alt=""/>
                    <div className="location text-center">Within 88 km In Waterloo</div>
                </div>
            </div>
            <div className="stats clearfix">
                <div className="pull-left">
                    <ul>
                        <li className="actual-price">${price}</li>
                        <li className="slashed-price proximaSemiBold">${price}</li>
                        <li className="elapsed-distance">{kilometer} km</li>
                        <li className="car-proof proximaSemiBold">
                            <img src="/static/images/icons/car-proof.png" alt=""/>
                            <span>Buy CarProof</span>
                        </li>
                    </ul>
                </div>
                <div className="pull-right">
                    <div className="btnGroup">
                        <button type="submit" className="vt-btn vt-save-btn proximaSemiBold">Save</button>
                        <button type="submit" className="vt-btn vt-secondary-btn proximaSemiBold">Compare</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultStripe