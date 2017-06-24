var options = [
    {value: '25', label: '+25 km'},
    {value: '50', label: '+50 km'},
    {value: '100', label: '+100 km'},
    {value: '150', label: '+150 km'},
    {value: '200', label: '+200 km'},
];

//package import
import React from 'react'
import Select from 'react-select';
import {connect} from 'react-redux'
import Slider from 'react-slick'
import Router from 'next/router'
//components import
import Label from '../label'
import BasicSearchFormLoader from '../../components/loaders/basicSearchForm'

//config import
import {apiCaller} from '../../utils/authServices'
import {API_V1, VEHICLE_ASSET_URL} from '../../config'

//action import
import {isDisconnected} from '../../actions/errorActions'
import {fetchedSearchResult} from '../../actions/search/index'
class BasicSearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state                 = {
            maker: undefined,
            model: undefined,
            location: undefined,
            proximity: undefined,
            isNew: true,
            used: true,
            owned: true,
            min_price: "",
            max_price: "",
            loading: true,
            bodyTypes: [],
            makers: [],
            models: [],
            currentBodyType: 0,
        }
        this._makerOption          = this._makerOption.bind(this)
        this._modelOption          = this._modelOption.bind(this)
        this._makerOptionChange    = this._makerOptionChange.bind(this)
        this._modelOptionChange    = this._modelOptionChange.bind(this)
        this._renderBodyTypeSlider = this._renderBodyTypeSlider.bind(this)
        this._onSlideChange        = this._onSlideChange.bind(this)
        this._submitForm           = this._submitForm.bind(this)
        this._renderSearchForm     = this._renderSearchForm.bind(this)
        this._renderSearchPage     = this._renderSearchPage.bind(this)
        this._onLocationChange     = this._onLocationChange.bind(this)
        this._onDistanceChange     = this._onDistanceChange.bind(this)
    }

    async componentDidMount() {
        let body       = {
            'search_option': {
                'category': 'Car and SUV'
            }
        }
        let searchForm = await apiCaller(`${API_V1}/post/getadvancesearchdata`, 'post', body)
        let {body_type, maker} = searchForm.data
        this.setState({
            bodyTypes: body_type.field_data,
            loading: false,
            makers: maker.field_data
        })
    }

    _makerOption() {
        let {makers} = this.state
        let newArray = makers.map((maker)=> {
            return {'value': maker.value, 'label': maker.displayname}
        })
        if (newArray.length > 0) {
            return newArray
        } else {
            return [];
        }
    }

    _modelOption() {
        let {models} = this.state
        let newArray = models.map((model)=> {
            return {'value': model.value, 'label': model.displayname}
        })
        if (newArray.length > 0) {
            return newArray
        } else {
            return [];
        }

    }

    async _makerOptionChange(maker) {
        this.setState({
            maker: maker,
            model: undefined,
            models: []
        })
        let body       = {
            'search_option': {
                'category': 'Car and SUV',
                'make': maker.value
            }
        }
        let searchForm = await apiCaller(`${API_V1}/post/getadvancesearchdata`, 'post', body)

        this.setState({
            models: searchForm.data.model.field_data
        })
        this.props.updateMaker(maker)
    }

    _modelOptionChange(model) {
        this.setState({
            model
        })
        this.props.updateModel(model)
    }

    _renderBodyTypeSlider() {
        const settings = {
            slidesToShow: 7,
            arrows: false,
            centerMode: true,
            centerPadding: 0,
            infinite: true,
            className: 'center',
            touchMove: true,
            initialSlide: 0,
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
                this._onSlideChange(currentSlide)
            }.bind(this)
        };
        let slider;
        return (
            <div className="vechicleStripeSlider">
                <img src="/static/images/icons/right-arrow.png" className="arrows left"
                     onClick={()=>slider.slickPrev()}/>
                <Slider {...settings} ref={ el => slider = el }>
                    {
                        this.state.bodyTypes.map((body, index)=> {
                            return (
                                <div key={index}>
                                    <img src={`${VEHICLE_ASSET_URL}/cars/types/${body.displayname}.png`}
                                         alt={body.displayname}/>
                                    <div className="body-style proximaSemiBold">{body.displayname}</div>
                                </div>
                            )
                        })
                    }
                </Slider>
                <img src="/static/images/icons/right-arrow.png" className="arrows right"
                     onClick={()=>slider.slickNext()}/>
            </div>
        )
    }

    async _onSlideChange(currentSlide) {
        let {bodyTypes} = this.state
        this.setState({
            maker: undefined,
            model: undefined,
            models: [],
            currentBodyType: currentSlide
        })
        let body   = {
            'search_option': {
                'category': 'Car and SUV',
                'body_type': this.state.bodyTypes[currentSlide]['value']
            }
        }
        let makers = await apiCaller(`${API_V1}/post/getadvancesearchdata`, 'post', body)
        this.setState({
            makers: makers.data.maker.field_data
        })

    }

    async _submitForm(event, form) {
        event.preventDefault()
        const url     = `${API_V1}/post/getposts`
        let postcode  = this.state.location ? this.state.location.value : '';
        let place     = this.state.location ? this.state.location.label : '';
        let category  = 'Car and SUV';
        let make      = this.state.maker ? this.state.maker.value : '';
        let model     = this.state.model ? this.state.model.value : '';
        let proximity = this.state.proximity ? this.state.proximity.value : '';
        let min_price = this.state.min_price ? this.state.min_price : '';
        let max_price = this.state.max_price ? this.state.max_price : ''
        let body_type = this.state.bodyTypes[this.state.currentBodyType].value
        let body      = {
            "search_option": {
                postcode,
                proximity,
                category,
                make,
                model,
                min_price,
                max_price,
                body_type
            }
        }

        let res   = await apiCaller(url, 'post', body)
        let query = 'cars'
        if (!res.internetError) {
            this.props.fetchedSearchResult(res.data.post)
            Router.push(`/search?postcode=${postcode}&proximity=${proximity}&make=${make}&model=${model}&min_price=${min_price}&max_price=${max_price}&body_type=${body_type}&place=${place}`, `/search?postcode=${postcode}&proximity=${proximity}&make=${make}&model=${model}&min_price=${min_price}&max_price=${max_price}&body_type=${body_type}&place=${place}`)
        } else {
            this.props.isDisconnected(true)
        }
    }

    _getLocation(input, callback) {
        setTimeout(async function () {
            let options = [];
            if (input) {
                let locations = await apiCaller(`${API_V1}/city/searchpostal?postcode=${input}`, 'get')
                options       = locations.data.map((option)=> {
                    return {value: option.postcode, label: option.city_name}
                })
            }
            callback(null, {
                options: options,
                complete: true,
            });

        }, 500);
    }

    _onLocationChange(location) {
        if (location) {
            this.setState({
                location
            })
        } else {
            this.setState({
                location: undefined
            })
        }
    }


    _onDistanceChange(distance) {
        if (distance) {
            this.setState({
                proximity: distance
            })
        } else {
            this.setState({
                proximity: undefined
            })

        }
    }

    _renderSearchPage() {
        return (
            <div>
                {this._renderBodyTypeSlider()}
                {this._renderSearchForm()}
            </div>
        )
    }

    _renderSearchForm() {
        let searchForm;
        return (
            <form id="basicSearchForm" onSubmit={(e)=>this._submitForm(e,searchForm)}
                  ref={ el => searchForm = el }>

                <div className="clearfix">
                    <div className="row">
                        <div className="pull-right col-md-6">
                            <h3 className="proximaBold emperor-text">4000,993 <Label
                                text="Cars, Trucks & SUVs"></Label>
                            </h3>
                        </div>
                        {/* CHECKBOXES : STARTS*/}
                        <div className="checkbox-group pull-left col-md-6">
                            <label className="control control--checkbox">New
                                <input type="checkbox" checked={this.state.isNew}
                                       onChange={()=>this.setState({isNew : !this.state.isNew})}/>
                                <div className="control__indicator"></div>
                            </label>
                            <label className="control control--checkbox">Used
                                <input type="checkbox" checked={this.state.used}
                                       onChange={()=>this.setState({used : !this.state.used})}/>
                                <div className="control__indicator"></div>
                            </label>
                            <label className="control control--checkbox">Certified Pre-owned
                                <input type="checkbox" checked={this.state.owned}
                                       onChange={()=>this.setState({owned : !this.state.owned})}/>
                                <div className="control__indicator"></div>
                            </label>
                        </div>
                        {/* CHECKBOXES : ENDS*/}
                    </div>

                    <div className="row">
                        {/* LEFT SECTION : STARTS*/}
                        <div className="col-md-6">
                            {/* DISTANCE SELECT BOX : START*/}
                            <div className="select-group">
                                <Select.Async
                                    value={this.state.location}
                                    loadOptions={this._getLocation}
                                    clearable={true}
                                    className="place"
                                    placeholder="Search Location"
                                    onChange={this._onLocationChange}
                                />
                                <Select
                                    value={this.state.proximity}
                                    options={options}
                                    clearable={false}
                                    className="distance"
                                    placeholder="Distance"
                                    onChange={this._onDistanceChange}
                                />
                            </div>
                            {/* DISTANCE SELECT BOX : ENDS*/}

                            {/*MAKE MODEL SELECT BOX : STARTS*/}
                            <div className="row">
                                <div className="col-md-6">
                                    <Select
                                        name="make"
                                        options={this._makerOption()}
                                        clearable={false}
                                        placeholder="Any Make"
                                        value={this.state.maker}
                                        onChange={this._makerOptionChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Select
                                        name="make"
                                        options={this._modelOption()}
                                        clearable={false}
                                        value={this.state.model}
                                        placeholder="Any Model"
                                        onChange={this._modelOptionChange}
                                    />
                                </div>
                            </div>
                            {/*MAKE MODEL SELECT BOX : ENDS*/}
                        </div>
                        {/* LEFT SECTION : ENDS*/}

                        {/* RIGHT SECTION : STARTS*/}
                        <div className="col-md-6">
                            {/* MAX MIN PRICE BOX : STARTS*/}
                            <div className="row">
                                <div className="col-md-6">
                                    <input type="number" className="textInput numberInput"
                                           placeholder="Minimum Price" value={this.state.min_price}
                                           onChange={(e)=>this.setState({min_price:e.target.value})}/>
                                </div>
                                <div className="col-md-6">
                                    <input type="number" className="textInput numberInput"
                                           placeholder="Maximum Price" value={this.state.max_price}
                                           onChange={(e)=>this.setState({max_price:e.target.value})}/>
                                </div>
                            </div>
                            {/* MAX MIN PRICE BOX : STARTS*/}
                            <button type="submit" className="vt-btn">SEARCH</button>
                        </div>
                        {/* RIGHT SECTION : ENDS*/}
                    </div>
                </div>
                {/* CHECKBOXES : ENDS*/}
            </form>
        )
    }

    render() {
        let searchForm;

        return (
            <div>
                {
                    this.state.loading ?
                        <BasicSearchFormLoader/> :
                        this._renderSearchPage()
                }
            </div>

        )
    }
}

export default connect(null, {
    isDisconnected,
    fetchedSearchResult
})(BasicSearchForm)