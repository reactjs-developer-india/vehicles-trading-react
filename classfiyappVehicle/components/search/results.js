import {connect} from 'react-redux'
import SearchStripe from './searchStripe'
import PostLoader from '../loaders/postLoader'

const Result   = (props)=> {
    return (
        <div className="results">
            {props.result.get('isFetching') ?
                <div>
                    <PostLoader/>
                    <PostLoader/>
                    <PostLoader/>
                </div> :
                props.result.get('posts').map((post, index)=> {
                    return <SearchStripe data={post} key={index}/>
                })

            }
        </div>
    )
}
const mapStateToProps = (state)=> {
    return {
        result: state.result
    };
}
export default connect(mapStateToProps)(Result)
