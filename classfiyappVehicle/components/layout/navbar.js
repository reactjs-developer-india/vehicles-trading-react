import Link from 'next/link'
import {Navbar, NavItem, Nav, DropdownButton, MenuItem} from 'react-bootstrap'
import Label from '../label'
import {showLoginModal, setAuth} from '../../actions/auth/index'
import React from 'react'
import {connect} from 'react-redux'
import Alert from 'react-s-alert'
import cookie from 'react-cookie';
import Router from 'next/router'

const Navigation = (props)=> {

    return (
        <div>
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link href="/"><a><img src="/static/images/logo.png" alt=""/></a></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <Link href='/post?id=123' as='/post/123'><a><Label text="Sell My Car"/></a></Link>
                        <Link href=""><a><Label text="Research & Reviews"/></a></Link>
                        <Link href=""><a><Label text="News & Features"/></a></Link>
                        <Link href=""><a><Label text="Finance"/></a></Link>
                        <Link><a><Label text="Compared Vehicles"/></a></Link>
                    </Nav>

                    {
                        props.auth.get('isLoggedIn') ?
                            <DropdownButton title="My Garage" id="dashboard-menu">
                                <Link href="/user/account"><a>Account Profile</a></Link>
                                <MenuItem divider/>
                                <MenuItem eventKey="4" onClick={()=>{
                                 cookie.remove('session', { path: '/' });
                                 props.setAuth(false)

                                 Alert.success('You have been successfully logged out', {
                                 position: 'top-right'})
                                 Router.push('/')
                                 }}>Logout</MenuItem>
                            </DropdownButton>
                            :
                            <Nav pullRight>
                                <NavItem eventKey="6" className="login" onClick={()=>props.showLoginModal(true)}>
                                    Sign In
                                </NavItem>
                            </Nav>
                    }


                </Navbar.Collapse>
            </Navbar>
            <div id="category-stripe">
                <Navbar>
                    <Nav>
                        <NavItem><Label text="Cars, Trucks & SUVs"/></NavItem>
                        <NavItem><Label text="Commercial / Heavy Trucks"/></NavItem>
                        <NavItem><Label text="Trailers"/></NavItem>
                        <NavItem><Label text="RVs"/></NavItem>
                        <NavItem><Label text="Boats"/></NavItem>
                        <NavItem><Label text="Watercraft"/></NavItem>
                        <NavItem><Label text="Motorcycles & ATVs"/></NavItem>
                        <NavItem><Label text="Snowmobiles"/></NavItem>
                        <NavItem><Label text="Heavy Equipment"/></NavItem>
                    </Nav>
                </Navbar>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=> {
    return {
        auth: state.auth
    };
}
export default connect(mapStateToProps, {showLoginModal, setAuth})(Navigation);