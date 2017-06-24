import React from 'react';

//component importing
import Layout from '../components/layout/index'
import Hero from '../components/singleAd/hero'
import FlashDetails from '../components/singleAd/flashDetails'
import FeatureTable from '../components/singleAd/featureTable'
import Review from '../components/singleAd/review'
import PriceAnalysis from '../components/singleAd/priceAnalysis'
import FeaturesOptions from '../components/singleAd/featuresOptions';
import FuelEconomy from '../components/singleAd/fuelEconomy'
import ListingHistory from '../components/singleAd/listingHistory'

//redux importing
import {Provider} from 'react-redux'
import  {initStore} from '../store'
import reducers from '../reducers/index'


//config import
import {API_V1} from '../config'
import {apiCaller} from '../utils/authServices'

class SingleAd extends React.Component {
    static async getInitialProps({req, query}) {

        let post       = await apiCaller(`${API_V1}/post/detail/${query.id}`, 'get')
        const isServer = !!req
        const store    = initStore(reducers, isServer)
        return {initialState: store.getState(), isServer, post: post.data}
    }

    constructor(props) {
        super(props)
        this.store = initStore(reducers, props.initialState, props.isServer)
    }

    render() {
        return (
            <Provider store={this.store}>
                <Layout>
                    {/*single-ad-page : STARTS*/}
                    <div id="single-ad-page">
                        {/*left section : STARTS*/}
                        <section className="col-md-10">
                            {/* hero : STARTS*/}
                            <Hero data={this.props.post}/>
                            <FlashDetails/>
                            <FeatureTable data={this.props.post}/>
                            <Review/>
                            <PriceAnalysis/>
                            <FeaturesOptions/>
                            <FuelEconomy/>
                            <ListingHistory/>
                            {/* hero : ENDS*/}
                        </section>
                        {/*left section: ENDS*/}

                        {/*right section: STARTS*/}
                        <section className="col-md-2">
                            <img src="/static/images/mbb_banner_vertical.jpg" alt=""/>
                        </section>
                        {/*right section: ENDS*/}
                    </div>
                    {/*single-ad-page : ENDS*/}
                </Layout>
            </Provider>
        )
    }
}

export default SingleAd