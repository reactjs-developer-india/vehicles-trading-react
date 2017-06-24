var Select = require('react-select');

//package import
import React from 'react'
import {connect} from 'react-redux'
import Router from 'next/router'

//components import
import TextInput from './partials/textInput'
import BasicSearchFormLoader from '../../components/loaders/basicSearchForm'


//action import
import {isDisconnected} from '../../actions/errorActions'
import {fetchedSearchResult, isFetchingPosts} from '../../actions/search/index'
import {convertToOptions, advanceState, fetchFormData, updateQueryStringParameter} from '../../utils/advanceSearch'

//import config
import {API_V1} from '../../config'
import {apiCaller} from '../../utils/authServices'
var options = [
    {value: '25', label: '+25 km'},
    {value: '50', label: '+50 km'},
    {value: '100', label: '+100 km'},
    {value: '150', label: '+150 km'},
    {value: '200', label: '+200 km'},
];

class AdvanceSearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state                     = {
            loading: true,
            form: {},
            maker: undefined,
            bodyType: undefined,
            transmission: undefined,
            color: undefined,
            model: undefined,
            fuel: undefined,
            location: undefined,
            proximity: undefined,
            minPrice: '',
            maxPrice: '',
            minKm: '',
            maxKm: '',
            minYear: '',
            maxYear: "",
            new: false,
            used: false,
            cpo: false,
            damaged: false,
            private: false,
            dealer: false,
            hasPhotos: false,
            hasCarProof: false,
            makers: [],
            models: [],
            bodyTypes: [],
            transmissons: [],
            colors: [],
            fuels: [],
            postCount: 0,
        }
        this._makerOptionChange        = this._makerOptionChange.bind(this)
        this._bodyTypesOptionChange    = this._bodyTypesOptionChange.bind(this)
        this._transmissionOptionChange = this._transmissionOptionChange.bind(this)
        this._fuelOptionsChange        = this._fuelOptionsChange.bind(this)
        this._modelOptionsChange       = this._modelOptionsChange.bind(this)
        this._colorOptionChange        = this._colorOptionChange.bind(this)
        this._onPriceChange            = this._onPriceChange.bind(this)
        this._onKilometerChange        = this._onKilometerChange.bind(this)
        this._submitForm               = this._submitForm.bind(this)
        this._getLocation              = this._getLocation.bind(this)
        this._onLocationChange         = this._onLocationChange.bind(this)
        this._onDistanceChange         = this._onDistanceChange.bind(this)
        this.body                      = {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentMaker != this.props.currentMaker) {
            this.setState({
                maker: nextProps.currentMaker
            })
        }
        if (nextProps.currentModel != this.props.currentModel) {
            this.setState({
                model: nextProps.currentModel
            })
        }

    }

    async componentDidMount() {
        let {searchQuery} = this.props
        this.body      = {
            'search_option': {
                'category': 'Car and SUV',
                'make': searchQuery ? searchQuery.make : "",
                'model': searchQuery ? searchQuery.model : "",
                'postcode': searchQuery ? searchQuery.postcode : '',
                'proximity': searchQuery ? searchQuery.proximity : '',
                'body_type': searchQuery ? searchQuery.body_type : '',
                'min_price': searchQuery ? searchQuery.min_price : '',
                'max_price': searchQuery ? searchQuery.max_price : '',
                'min_kilometer': searchQuery ? (searchQuery.min_kilometer ? searchQuery.min_kilometer : '') : '',
                'max_kilometer': searchQuery ? (searchQuery.max_kilometer ? searchQuery.max_kilometer : '') : '',
                'min_year': searchQuery ? (searchQuery.min_year ? searchQuery.min_year : '') : '',
                'max_year': searchQuery ? (searchQuery.max_year ? searchQuery.max_year : '') : '',
                'exterior_colour': searchQuery ? (searchQuery.exterior_colour ? searchQuery.exterior_colour : '') : '',
                'transmission': searchQuery ? (searchQuery.transmission ? searchQuery.transmission : '') : '',
                'fuel_type': searchQuery ? (searchQuery.fuel_type ? searchQuery.fuel_type : '') : '',
                "show_new": searchQuery ? (searchQuery.show_new ? JSON.parse(searchQuery.show_new) : false) : false,
                "show_used": searchQuery ? (searchQuery.show_used ? JSON.parse(searchQuery.show_used) : false) : false,
                "show_cpo": searchQuery ? (searchQuery.show_cpo ? JSON.parse(searchQuery.show_cpo) : false) : false,
                "show_damaged": searchQuery ? (searchQuery.show_damaged ? JSON.parse(searchQuery.show_damaged) : false) : false,
                "show_private": searchQuery ? (searchQuery.show_private ? JSON.parse(searchQuery.show_private) : false) : false,
                "show_dealer": searchQuery ? (searchQuery.show_dealer ? JSON.parse(searchQuery.show_dealer) : false) : false,
                "has_custom_pohoto": searchQuery ? (searchQuery.has_custom_pohoto ? JSON.parse(searchQuery.has_custom_pohoto) : false) : false,
                "car_proof_only": searchQuery ? (searchQuery.car_proof_only ? JSON.parse(searchQuery.car_proof_only) : false) : false,

            }
        }
        let searchForm = await fetchFormData(this.body)
        let {maker, model, body_type, transmission, exterior_colour, fuel_type} = searchForm.data
        this.setState({
            makers: convertToOptions(maker.field_data),
            models: convertToOptions(model.field_data),
            bodyTypes: convertToOptions(body_type.field_data),
            transmissions: convertToOptions(transmission.field_data),
            colors: convertToOptions(exterior_colour.field_data),
            fuels: convertToOptions(fuel_type.field_data),
            loading: false,
            maker: searchQuery ? searchQuery.make : this.props.currentMaker,
            model: searchQuery ? searchQuery.model : this.props.currentModel,
            bodyType: searchQuery ? searchQuery.body_type : undefined,
            transmission: searchQuery ? (searchQuery.transmission ? searchQuery.transmission : undefined) : undefined,
            color: searchQuery ? (searchQuery.exterior_colour ? searchQuery.exterior_colour : undefined) : undefined,
            fuel: searchQuery ? (searchQuery.fuel_type ? searchQuery.fuel_type : undefined) : undefined,
            location: searchQuery ? (searchQuery.postcode.length > 0 ? {
                value: searchQuery.postcode,
                label: searchQuery.place
            } : undefined) : undefined,
            proximity: searchQuery ? searchQuery.proximity : undefined,
            minPrice: searchQuery ? searchQuery.min_price : '',
            maxPrice: searchQuery ? searchQuery.max_price : '',
            minKm: searchQuery ? (searchQuery.min_kilometer ? searchQuery.min_kilometer : '') : '',
            maxKm: searchQuery ? (searchQuery.max_kilometer ? searchQuery.max_kilometer : '') : '',
            minYear: searchQuery ? (searchQuery.min_year ? searchQuery.min_year : '') : '',
            maxYear: searchQuery ? (searchQuery.fuel_type ? searchQuery.fuel_type : undefined) : undefined,
            new: false,
            used: false,
            cpo: false,
            damaged: false,
            private: false,
            dealer: false,
            hasPhotos: false,
            hasCarProof: false,
        })

    }


    async _makerOptionChange(maker) {
        if (maker) {
            this.setState({
                maker: maker
            })
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'make', maker.value)
                window.history.pushState({}, null, newUrl);
            }
            this.body.search_option.make = maker.value

        } else {
            this.setState({
                maker: undefined
            })
            this.body.search_option.make = ''
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'make', '')
                window.history.pushState({}, null, newUrl);
            }
        }
        let searchForm = await fetchFormData(this.body)

        this.setState(advanceState(searchForm.data, maker ? 'makers' : ''))

    }

    async _modelOptionsChange(model) {
        if (model) {
            this.setState({
                model: model
            })
            this.body.search_option.model = model.value
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'model', model.value)
                window.history.pushState({}, null, newUrl);
            }

        } else {
            this.setState({
                model: undefined
            })
            this.body.search_option.model = ''
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'model', '')
                window.history.pushState({}, null, newUrl);
            }
        }

        let searchForm = await fetchFormData(this.body)

        this.setState(advanceState(searchForm.data, model ? 'models' : ''))
    }


    async _bodyTypesOptionChange(type) {
        if (type) {
            this.setState({
                bodyType: type
            })
            this.body.search_option.body_type = type.value
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'body_type', type.value)
                window.history.pushState({}, null, newUrl);
            }

        } else {
            this.setState({
                bodyType: undefined
            })
            this.body.search_option.body_type = ''
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'body_type', '')
                window.history.pushState({}, null, newUrl);
            }
        }

        let searchForm = await fetchFormData(this.body)

        this.setState(advanceState(searchForm.data, type ? 'bodyTypes' : ''))
    }


    async _transmissionOptionChange(type) {
        if (type) {
            this.setState({
                transmission: type
            })
            this.body.search_option.transmission = type.value
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'transmission', type.value)
                window.history.pushState({}, null, newUrl);
            }
        } else {
            this.setState({
                transmission: undefined
            })
            this.body.search_option.transmission = ''
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'transmission', '')
                window.history.pushState({}, null, newUrl);
            }
        }

        let searchForm = await fetchFormData(this.body)
        this.setState(advanceState(searchForm.data, type ? 'transmissions' : ''))
    }

    async _fuelOptionsChange(fuel) {
        if (fuel) {
            this.setState({
                fuel: fuel
            })
            this.body.search_option.fuel_type = fuel.value
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'fuel_type', fuel.value)
                window.history.pushState({}, null, newUrl);
            }
        } else {
            this.setState({
                fuel: undefined
            })
            this.body.search_option.fuel_type = ''
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'fuel_type', '')
                window.history.pushState({}, null, newUrl);
            }

        }

        let searchForm = await fetchFormData(this.body)
        this.setState(advanceState(searchForm.data, fuel ? 'fuels' : ''))
    }

    async _colorOptionChange(color) {
        if (color) {
            this.setState({
                color: color
            })

            this.body.search_option.exterior_colour = color.value
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'exterior_colour', color.value)
                window.history.pushState({}, null, newUrl);
            }
        } else {
            this.setState({
                color: undefined
            })

            this.body.search_option.exterior_colour = ''
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'exterior_colour', '')
                window.history.pushState({}, null, newUrl);
            }
        }

        let searchForm = await fetchFormData(this.body)
        this.setState(advanceState(searchForm.data, color ? 'colors' : ''))
    }

    async _onPriceChange(event, type) {
        let price = event.target.value
        if (type == 'min') {
            this.setState({
                minPrice: price
            })
            this.body.search_option.min_price = price
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'min_price', price)
                window.history.pushState({}, null, newUrl);
            }

        } else {
            this.setState({
                maxPrice: price
            })

            this.body.search_option.max_price = price
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'max_price', price)
                window.history.pushState({}, null, newUrl);
            }
        }
    }

    async _onKilometerChange(event, type) {
        let km = event.target.value
        if (type == 'min') {
            this.setState({
                minKm: km
            })
            this.body.search_option.min_kilometer = km
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'min_kilometer', km)
                window.history.pushState({}, null, newUrl);
            }
        } else {
            this.setState({
                maxKm: km
            })
            this.body.search_option.max_kilometer = km
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'max_kilometer', km)
                window.history.pushState({}, null, newUrl);
            }
        }
    }

    async _submitForm(e) {
        e.preventDefault();
        let query    = 'cars'
        let location = 'toronto'
        this.props.isFetchingPosts(true)
        let posts = await apiCaller(`${API_V1}/post/getposts`, 'post', this.body)
        this.props.fetchedSearchResult(posts.data.post)
        this.props.isFetchingPosts(false)
        if (this.props.isHomePage) {
            let {
                    postcode, proximity, make, model, min_price, max_price, body_type, min_kilometer,
                    max_kilometer,
                    min_year,
                    max_year,
                    exterior_colour,
                    transmission,
                    fuel_type,
                    show_new,
                    show_used,
                    show_cpo,
                    show_damaged,
                    show_private,
                    show_dealer,
                    has_custom_pohoto,
                    car_proof_only
                } = this.body.search_option
            let place = this.state.location ? this.state.location.label : ''
            Router.push(`/search?postcode=${postcode}&proximity=${proximity}&make=${make}&model=${model}&min_price=${min_price}&max_price=${max_price}&body_type=${body_type}&min_kilometer=${min_kilometer}&max_kilometer=${max_kilometer}&min_year=${min_year}&max_year=${max_year}&exterior_colour=${exterior_colour}&transmission=${transmission}&fuel_type=${fuel_type}&show_new=${show_new}&show_used=${show_used}&show_cpo=${show_cpo}&show_damaged=${show_damaged}&show_private=${show_private}&show_dealer=${show_dealer}&has_custom_pohoto=${has_custom_pohoto}&car_proof_only=${car_proof_only}&place=${place}`, `/search?postcode=${postcode}&proximity=${proximity}&make=${make}&model=${model}&min_price=${min_price}&max_price=${max_price}&body_type=${body_type}&min_kilometer=${min_kilometer}&max_kilometer=${max_kilometer}&min_year=${min_year}&max_year=${max_year}&exterior_colour=${exterior_colour}&transmission=${transmission}&fuel_type=${fuel_type}&show_new=${show_new}&show_used=${show_used}&show_cpo=${show_cpo}&show_damaged=${show_damaged}&show_private=${show_private}&show_dealer=${show_dealer}&has_custom_pohoto=${has_custom_pohoto}&car_proof_only=${car_proof_only}&place=${place}`)

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

    async _onLocationChange(location) {
        if (location) {
            this.setState({
                location
            })
            this.body.search_option.postcode = location.value
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'postcode', location.value)
                window.history.pushState({}, null, newUrl);
                let newloc = updateQueryStringParameter(window.location.href, 'place', location.label)
                window.history.pushState({}, null, newloc);
            }
        } else {
            this.setState({
                location: undefined
            })
            this.body.search_option.postcode = ''
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'postcode', '')
                window.history.pushState({}, null, newUrl);
                let newloc = updateQueryStringParameter(window.location.href, 'place', '')
                window.history.pushState({}, null, newloc);
            }
        }

        let searchForm = await fetchFormData(this.body)

        this.setState(advanceState(searchForm.data, location ? 'location' : ''))
    }

    async _onDistanceChange(distance) {
        if (distance) {
            this.setState({
                proximity: distance
            })

            this.body.search_option.proximity = distance.value
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'proximity', distance.value)
                window.history.pushState({}, null, newUrl);
            }

        } else {
            this.setState({
                proximity: undefined
            })

            this.body.search_option.proximity = ''
            if (!this.props.isHomePage) {
                let newUrl = updateQueryStringParameter(window.location.href, 'proximity', '')
                window.history.pushState({}, null, newUrl);
            }
        }

        let searchForm = await fetchFormData(this.body)
        this.setState(advanceState(searchForm.data, distance ? 'proximity' : ''))
    }

    _renderAdvanceForm() {
        return (
            <form id="advanceSearchForm">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bottom-margin">
                            <Select
                                name="make"
                                placeholder="Make ( Any )"
                                clearable={true}
                                options={this.state.makers}
                                value={this.state.maker}
                                onChange={this._makerOptionChange}
                            />
                        </div>
                        <div className="bottom-margin">
                            <Select
                                name="model"
                                placeholder="Model ( Any )"
                                clearable={true}
                                options={this.state.models}
                                value={this.state.model}
                                onChange={this._modelOptionsChange}
                            />
                        </div>
                        <div className="inputGroup bottom-margin clearfix">
                            <input
                                type="text"
                                className="textInput"
                                placeholder="Minimum Price"
                                value={this.state.minPrice}
                                onChange={(e)=>{this._onPriceChange(e,'min')}}
                            />
                            <span className="to">to</span>
                            <input
                                type="text"
                                className="textInput"
                                placeholder="Maximum Price"
                                value={this.state.maxPrice}
                                onChange={(e)=>{this._onPriceChange(e,'max')}}
                            />
                        </div>
                        <div className="inputGroup bottom-margin clearfix">
                            <input
                                type="text"
                                className="textInput"
                                placeholder="Minimum Kilometers"
                                value={this.state.minKm}
                                onChange={(e)=>{this._onKilometerChange(e,'min')}}
                            />
                            <span className="to">to</span>
                            <input
                                type="text"
                                className="textInput"
                                placeholder="Maximum Kilometers"
                                value={this.state.maxKm}
                                onChange={(e)=>{this._onKilometerChange(e,'max')}}
                            />
                        </div>
                        <div className="bottom-margin">
                            <Select
                                name="model"
                                placeholder="Body Types ( Any )"
                                clearable={true}
                                options={this.state.bodyTypes}
                                value={this.state.bodyType}
                                onChange={this._bodyTypesOptionChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="inputGroup bottom-margin clearfix">
                            <TextInput name="min-year" placeholder="Minimum Year"/>
                            <span className="to">to</span>
                            <TextInput name="min-year" placeholder="Maximum Year"/>
                        </div>
                        <div className="bottom-margin">
                            <Select
                                name="model"
                                placeholder="Transmission ( Any )"
                                clearable={true}
                                options={this.state.transmissions}
                                value={this.state.transmission}
                                onChange={this._transmissionOptionChange}
                            />
                        </div>
                        <div className="bottom-margin">
                            <Select
                                name="model"
                                placeholder="Fuel Type ( Any )"
                                clearable={true}
                                options={this.state.fuels}
                                value={this.state.fuel}
                                onChange={this._fuelOptionsChange}
                            />
                        </div>
                        <div className="bottom-margin">
                            <Select
                                name="model"
                                placeholder="Exterior Color ( Any )"
                                clearable={true}
                                options={this.state.colors}
                                value={this.state.color}
                                onChange={this._colorOptionChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="checkbox-group">
                    <div className="row">
                        <div className="col-md-3 bottom-margin">
                            <label className="control control--checkbox">New
                                <input
                                    type="checkbox"
                                    checked={this.state.new}
                                    onChange={()=>{
                                        this.body.search_option.show_new = !this.state.new
                                            this.setState({
                                            new : !this.state.new
                                            })
                                }}/>
                                <div className="control__indicator"></div>
                            </label>
                        </div>
                        <div className="col-md-3 bottom-margin">
                            <label className="control control--checkbox">Used
                                <input
                                    type="checkbox"
                                    checked={this.state.used}
                                    onChange={()=>{
                                        this.body.search_option.show_used = !this.state.used
                                            this.setState({
                                            used : !this.state.used
                                            })
                                }}/>
                                <div className="control__indicator"></div>
                            </label>
                        </div>
                        <div className="col-md-3 bottom-margin">
                            <label className="control control--checkbox">Certified Pre-owned
                                <input
                                    type="checkbox"
                                    checked={this.state.cpo}
                                    onChange={()=>{
                                        this.body.search_option.show_cpo = !this.state.cpo
                                            this.setState({
                                            cpo : !this.state.cpo
                                            })
                                }}
                                />
                                <div className="control__indicator"></div>
                            </label>
                        </div>
                        <div className="col-md-3 bottom-margin">
                            <label className="control control--checkbox">Damaged
                                <input
                                    type="checkbox"
                                    checked={this.state.damaged}
                                    onChange={()=>{
                                        this.body.search_option.show_damaged = !this.state.damaged
                                            this.setState({
                                            damaged : !this.state.damaged
                                            })}}
                                />
                                <div className="control__indicator"></div>
                            </label>
                        </div>
                        <div className="col-md-3 bottom-margin">
                            <label className="control control--checkbox">Dealer
                                <input
                                    type="checkbox"
                                    checked={this.state.dealer}
                                    onChange={()=>{
                                        this.body.search_option.show_dealer = !this.state.dealer
                                            this.setState({
                                            dealer : !this.state.dealer
                                            })}}
                                />
                                <div className="control__indicator"></div>
                            </label>
                        </div>
                        <div className="col-md-3 bottom-margin">
                            <label className="control control--checkbox">Private
                                <input type="checkbox"
                                       checked={this.state.private}
                                       onChange={()=>{
                                        this.body.search_option.show_private = !this.state.private
                                            this.setState({
                                            private : !this.state.private
                                            })}}
                                />
                                <div className="control__indicator"></div>
                            </label>
                        </div>
                        <div className="col-md-3 bottom-margin">
                            <label className="control control--checkbox">With Photos
                                <input type="checkbox"
                                       checked={this.state.hasPhotos}
                                       onChange={()=>{
                                        this.body.search_option.has_custom_pohoto = !this.state.hasPhotos
                                            this.setState({
                                            hasPhotos : !this.state.hasPhotos
                                            })}}
                                />
                                <div className="control__indicator"></div>
                            </label>
                        </div>
                        <div className="col-md-3 bottom-margin">
                            <label className="control control--checkbox">With free CarProof
                                <input type="checkbox"
                                       checked={this.state.hasCarProof}
                                       onChange={()=>{
                                        this.body.search_option.car_proof_only = !this.state.hasCarProof
                                            this.setState({
                                            hasCarProof : !this.state.hasCarProof
                                            })}}
                                />
                                <div className="control__indicator"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="btnGroup">
                    <button type="submit" className="vt-btn vt-secondary-btn">Save
                        This Search
                    </button>
                    <button type="submit" className="vt-btn" onClick={this._submitForm}>Go</button>
                </div>
            </form>
        )
    }

    _renderSearchHeader() {
        return (
            <div className="header clearfix">
                <div className="pull-left proximaSemiBold form-title">
                    New & Used Cars for sale
                </div>
                <div className="pull-right">
                    <ul>
                        <li className="proximaBold text">
                        </li>
                        <li className="text">
                            results within
                        </li>
                        <li>
                            <Select
                                options={options}
                                clearable={false}
                                placeholder="Distance"
                                clearable={true}
                                value={this.state.proximity}
                                onChange={this._onDistanceChange}
                            />
                        </li>
                        <li className="text">
                            of
                        </li>
                        <li>
                            <Select.Async
                                loadOptions={this._getLocation}
                                placeholder="Location"
                                clearable={true}
                                className="place"
                                value={this.state.location}
                                onChange={this._onLocationChange}
                                autoload={false}
                                cache={false}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        let searchForm;
        return (
            <div id="advance-search">
                {/* header : starts*/}
                {
                    this.state.loading ?
                        <div className="header">
                            <BasicSearchFormLoader/>
                        </div>
                        :
                        <div>{this._renderSearchHeader()}

                            {this._renderAdvanceForm()}</div>
                }

            </div>
        )
    }
}

export default connect(null, {isDisconnected, fetchedSearchResult, isFetchingPosts})(AdvanceSearchForm)