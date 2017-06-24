//package import
import React from 'react';
import {Provider} from 'react-redux'
import Select from 'react-select'

//components import
import Layout from '../components/layout/index'
import AdvanceSearchForm from '../components/form/advanceSearchForm'
import Result from '../components/search/results'
//redux import
import  {initStore} from '../store'
import reducers from '../reducers/index'


class SearchPage extends React.Component {
    static getInitialProps({req}) {
        const isServer = !!req
        const store    = initStore(reducers, isServer)
        return {initialState: store.getState(), isServer}
    }

    constructor(props) {
        super(props)
        this.store = initStore(reducers, props.initialState, props.isServer)

    }

    componentDidMount() {
        this.props.url.query.postcode = "ABC 12"
    }

    render() {
        return (
            <Provider store={this.store}>
                <Layout>
                    {/*single-ad-page : STARTS*/}
                    <div id="search-page">
                        {/*left section : STARTS*/}
                        <section className="col-md-10">
                            <AdvanceSearchForm isHomePage={false} searchQuery={this.props.url.query}/>
                            {/* advance-search-result : STARTS*/}
                            <div className="advance-search-result">
                                {/*search-pagination : STARTS*/}
                                <div className="search-pagination clearfix mine-shaft">
                                    <div className="pull-left">
                                        <ul>
                                            <li className="clearfix">
                                                <label>Display:</label>
                                                <Select
                                                    name="display"
                                                    clearable={false}
                                                    placeholder="select"
                                                    className="visible-page-numbers"
                                                />
                                            </li>
                                            <li></li>
                                        </ul>
                                    </div>
                                </div>
                                {/*search-pagination : ENDS*/}

                                <Result/>
                            </div>
                            {/* advance-search-result : ENDS*/}
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

export default SearchPage