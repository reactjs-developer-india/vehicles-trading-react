import Slider from 'react-slick'
const settings = {
    slidesToShow: 7,
    arrows: false,
    centerMode: true,
    centerPadding: 0,
    infinite: true,
    className: 'center',
    responsive: [
        {
            breakpoint: 1024, settings: {slidesToShow: 5}
        },
        {
            breakpoint: 480,
            settings: {slidesToShow: 3}
        }
    ],
    afterChange: function (currentSlide) {
        console.log(currentSlide)
    }
};
import {VEHICLE_ASSET_URL} from '../../config'
const VehicleStripeSlider = (props)=> {
   
}

export default VehicleStripeSlider