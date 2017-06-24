import Link from 'next/link'
import {connect} from 'react-redux'
import Clock from './Clock'
import {changeName} from '../actions/homeActions'
import React from 'react'
const Page = (props, context)=> {
    return (
        <div>
            <h1>{props.title}</h1>
            <Clock lastUpdate={props.home.lastUpdate} light={props.home.light}/>
            <nav>
                <Link href={props.linkTo}><a>Navigate</a></Link>
            </nav>
            <button onClick={()=>context.store.dispatch(changeName())}>{props.test.name}</button>
        </div>
    )
}

const mapStateToProps = (state)=> {
    return {
        home: state.home,
        test: state.test
    };
}

Page.contextTypes = {
    store: React.PropTypes.object
}
}
}
}
export default connect(mapStateToProps)(Page);