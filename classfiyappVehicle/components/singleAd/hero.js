import InquiryForm from './inquiryForm'
const Hero = (props)=> {
    return (
        <div className="hero">
            <div className="row">
                <div className="col-md-7">
                    <h1 className="mine-shaft-dark proximaSemiBold">{props.data.title}</h1>
                    <img src={`${props.data.cover_photo}`} alt="" className="hero-img"/>
                    <ul className="image-group">
                        <img
                            src="https://images.pexels.com/photos/352884/pexels-photo-352884.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                            alt=""/>
                        <img
                            src="https://images.pexels.com/photos/352884/pexels-photo-352884.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                            alt=""/>
                    </ul>
                </div>
                <div className="col-md-5">
                    <InquiryForm/>
                </div>
            </div>
        </div>
    )
}

export default Hero