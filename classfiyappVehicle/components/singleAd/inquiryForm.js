import Checkbox from '../form/partials/checkbox'
var Select = require('react-select');
import TextInput from '../form/partials/textInput'
import EmailInput from '../form/partials/emailInput'
import TextArea from '../form/partials/textArea'
const InquiryForm = ()=> {
    return (
        <div className="inquiry-form">
            <div className="header">
                Inquiry about this vehicle
            </div>
            <div className="form-wrapper">
                <div className="upper-part">
                    {/*upper-part : STARTS*/}
                    <div className="text-center">
                        <img src="/static/images/icons/dial.png" alt=""/>
                        <span className="mine-shaft-dark">1-866-980-5228</span>
                    </div>
                    {/*form : STARTS*/}
                    <form>
                        <div className="form-input">
                            <TextInput name="name" placeholder="Name"/>
                        </div>
                        <div className="form-input">
                            <EmailInput name="email" placeholder="Email"/>
                        </div>
                        <div className="form-input">
                            <TextInput name="number" placeholder="Phone"></TextInput>
                        </div>
                        <div className="form-input">
                            <TextArea name="message" placeholder="Hi, I found your listing on autoTRADER.ca and
would like to know "/>
                        </div>
                        <div className="form-input">
                            <Checkbox name="new" label="Send me a copy of this message"/>
                        </div>
                        <div className="form-input">
                            <button className="vt-btn vt-big-font-btn">Check Availability</button>
                        </div>
                    </form>
                    {/*form : ENDS*/}
                    {/*uppper part : ENDS*/}
                </div>
                <div className="lower-part text-center">
                    {/*lower part : STARTS*/}
                    <img src="/static/images/make-logo.png" alt=""/>
                    <button className="vt-btn vt-big-font-btn">
                        Visit Our Website
                    </button>
                    {/*lower part : ENDS*/}
                </div>
            </div>
        </div>
    )
}

export default InquiryForm;