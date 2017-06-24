//package import
import React from 'react';
import {Provider} from 'react-redux'
import {Nav, NavItem} from 'react-bootstrap'
import Alert from 'react-s-alert'
import cookie from 'react-cookie'
import axios from 'axios'
import Router from 'next/router'
//components import
import Layout from '../../components/layout/index'
import EditProfileForm from '../../components/form/editProfileForm'
import FormLoader from '../../components/loaders/basicSearchForm'
//redux import
import  {initStore} from '../../store'
import reducers from '../../reducers/index'

//import config
import {apiCaller} from '../../utils/authServices'
import {API_V1} from '../../config'

//action import
import {loadProfileData} from '../../actions/user/index'

class SearchPage extends React.Component {
    static getInitialProps({req, res}) {

        const isServer = !!req
        if (!cookie.load('session')) {
            if (isServer) {
                res.redirect('/')
            } else {
                Router.push('/')
            }

        }
        const store = initStore(reducers, isServer)
        return {initialState: store.getState(), isServer}
    }

    constructor(props) {
        super(props)
        this.state = {loading: true}
        this.store = initStore(reducers, props.initialState, props.isServer)

    }

    async componentDidMount() {
        let res      = await axios.get(`${API_V1}/users/me?access_token=${cookie.load('session')}`)
        let {email, first_name, last_name, _id} = res.data.data.details
        let userData = {
            email,
            first_name,
            last_name,
            id: _id
        }
        this.store.dispatch(loadProfileData(userData))
        this.setState({
            loading: false
        })

    }

    async _updateProfile(data) {
        let res = await axios.put(`${API_V1}/users?access_token=${cookie.load('session')}`, data)
        let {status} = res.data
        if (status == 1) {
            this.store.dispatch(loadProfileData(data))
            Alert.success('Profile has been updated successfully', {
                position: 'top-right'
            })
        } else {
            Alert.error('Something went wrong', {
                position: 'top-right'
            })
        }
    }

    render() {
        return (
            <Provider store={this.store}>
                <Layout>
                    {/*edit-profile : STARTS*/}
                    <div id="edit-profile">
                        <div className="row">
                            <div className="col-md-3">
                                <Nav bsStyle="pills" activeKey={1} stacked>
                                    <NavItem eventKey={1}>Account Profile</NavItem>
                                    <NavItem eventKey={2} title="Item">Saved Vehicles</NavItem>
                                    <NavItem eventKey={3} title="Item">Saved Searches</NavItem>
                                </Nav>
                            </div>
                            <div className="col-md-6">
                                {
                                    this.state.loading ?
                                        <FormLoader/>
                                        :
                                        <EditProfileForm updateProfile={this._updateProfile.bind(this)}/>
                                }

                            </div>
                        </div>
                    </div>
                    {/*edit-profile : ENDS*/}
                </Layout>
            </Provider>
        )
    }
}

export default SearchPage