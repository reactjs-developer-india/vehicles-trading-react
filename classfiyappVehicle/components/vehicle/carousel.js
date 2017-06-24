import Slider from 'react-slick'
const settings = {
    infinite: false,
    slidesToShow: 3,
    arrows: false,
    infinite: true,
    responsive: [
        {
            breakpoint: 1024, settings: {slidesToShow: 2}
        },
        {
            breakpoint: 480,
            settings: {slidesToShow: 1}
        }
    ]
};
import VehicleCard from './vehicleCard'
const VehicleSlider = (props)=> {
    let slider;
    return (
        <div>
            <img src="/static/images/icons/right-arrow.png" className="arrows left" onClick={()=>slider.slickPrev()}/>
            <Slider {...settings} ref={ el => slider = el }>
                <div>
                    <VehicleCard/>
                </div>
                <div>
                    <VehicleCard/>
                </div>
                <div>
                    <VehicleCard/>
                </div>
                <div>
                    <VehicleCard/>
                </div>
            </Slider>
            <img src="/static/images/icons/right-arrow.png" className="arrows right" onClick={()=>slider.slickNext()}/>
        </div>
    )
}

export default VehicleSlider