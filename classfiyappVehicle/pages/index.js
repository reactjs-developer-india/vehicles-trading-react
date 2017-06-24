// vendor importing
import React from 'react'
import {Tab, Nav, NavItem} from 'react-bootstrap'
import Select from 'react-select';


//client importing
import Layout from '../components/layout/index'
import VehicleSlider from '../components/vehicle/carousel'
import BasicSearchForm from '../components/form/basicSearchForm'
import AdvanceSearchForm from '../components/form/advanceSearchForm'

//redux
import {Provider} from 'react-redux'
import  {initStore} from '../store'
import reducers from '../reducers/index'

//actions
import {showLoginModal} from '../actions/auth/index'


class Home extends React.Component {
    static getInitialProps({req}) {
        const isServer = !!req
        const store    = initStore(reducers, isServer)
        return {initialState: store.getState(), isServer}
    }

    constructor(props) {
        super(props)
        this.state                = {currentMaker: undefined, currentModel: undefined}
        this.store                = initStore(reducers, props.initialState, props.isServer)
        this._renderAdvanceSearch = this._renderAdvanceSearch.bind(this)
        this._updateCurrentMaker  = this._updateCurrentMaker.bind(this)
        this._updateCurrentModel  = this._updateCurrentModel.bind(this)
    }

    _updateCurrentMaker(maker) {
        this.setState({
            currentMaker: maker
        })
    }

    _updateCurrentModel(model) {
        this.setState({
            currentModel: model
        })
    }

    _renderBasicSearch() {
        return (
            <div>
                {/* HERO : STARTS*/}
                <div className="search-hero">
                    {/*this._renderBodyTypeSlider()*/}
                    <BasicSearchForm updateMaker={this._updateCurrentMaker} updateModel={this._updateCurrentModel}/>
                </div>
                {/* HERO : ENDS*/}

                {/* slider wrapper*/}
                <div className="slider-wrapper">
                    <div className="clearfix section-header">
                        <div className="proximaSemiBold pull-left font18">Sponsered Vehicle</div>
                        <div className="pull-right view-all">View All <img
                            src="/static/images/icons/right-arrow.png" alt=""/></div>
                    </div>

                    <div className="sliderContainer">
                        <VehicleSlider/>
                    </div>
                </div>
                {/* slider wrapper*/}

                {/* slider wrapper*/}
                <div className="slider-wrapper">
                    <div className="clearfix section-header">
                        <div className="proximaSemiBold pull-left font18">NEARBY VEHICLE</div>
                        <div className="pull-right view-all">View All <img
                            src="/static/images/icons/right-arrow.png" alt=""/></div>
                    </div>

                    <div className="sliderContainer">
                        <VehicleSlider/>
                    </div>
                </div>
                {/* slider wrapper*/}

                {/* slider wrapper*/}
                <div className="slider-wrapper">
                    <div className="clearfix section-header">
                        <div className="proximaSemiBold pull-left font18">REVIEWS & RESEARCH</div>
                        <div className="pull-right view-all">View All <img
                            src="/static/images/icons/right-arrow.png" alt=""/></div>
                    </div>

                    <div className="sliderContainer">
                        <VehicleSlider/>
                    </div>


                </div>
                {/* slider wrapper*/}
            </div>
        )
    }

    _renderAdvanceSearch() {
        return (
            <AdvanceSearchForm isHomePage={true}
                               currentMaker={this.state.currentMaker}
                               currentModel={this.state.currentModel}/>
        )
    }

    render() {
        return (
            <Provider store={this.store}>
                <Layout>
                    <div id="home-page">
                        {/* slider section*/}
                        <section className="col-md-10 slider-section">
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <div className="clearfix row">
                                    <Nav bsClass="search-tab">
                                        <NavItem eventKey="first">
                                            Make & Model Search
                                        </NavItem>
                                        <NavItem eventKey="second">
                                            Advance Search
                                        </NavItem>
                                    </Nav>
                                    <div>
                                        <Tab.Content animation>
                                            <Tab.Pane eventKey="first">
                                                {this._renderBasicSearch()}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                {this._renderAdvanceSearch()}
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </div>
                                </div>
                            </Tab.Container>
                        </section>
                        {/* slider section*/}

                        <section className="col-md-2">
                            <img src="/static/images/mbb_banner_vertical.jpg" alt=""
                                 onClick={()=>{this.store.dispatch(showLoginModal())}}/>
                    </div>
                </Layout>
            </Provider>

        )
    }
}

export default Home