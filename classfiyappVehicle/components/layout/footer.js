import Link from 'next/link'
import Label from '../label'

const footer = ()=>(
    <footer id="footer">
        <div className="container">
            <section className="col-md-2 ">
                <div className="section-title">
                    <Label text="ABOUT US"/>
                </div>
                <ul>
                    <li><Label text="Trader Corporation"/></li>
                    <li><Label text="Careers"/></li>
                    <li><Label text="Legal"/></li>
                    <li><Label text="Follow us on Twitter"/></li>
                    <li><Label text="Facebook Fan Page"/></li>
                </ul>
            </section>
            <section className="col-md-2">
                <div className="section-title">
                    <Label text="RESOURCES"/>
                </div>
                <ul>
                    <li><Label text="Mobile Apps"/></li>
                    <li><Label text="Vehicle Research"/></li>
                    <li><Label text="Owner Reviews"/></li>
                    <li><Label text="Car Dealer Locator"/></li>
                    <li><Label text="Car Buying & Selling Tips"/></li>
                    <li><Label text="Fraud Protection Tips"/></li>
                    <li><Label text="Ad Centre Locator"/></li>
                    <li><Label text="Used cars in Canada"/></li>
                    <li><Label text="Compare CPO"/></li>
                </ul>
            </section>
            <section className="col-md-2">
                <div className="section-title"><Label text="CUSTOMER SUPPORT"/></div>
                <ul>
                    <li><Label text="FAQ"/></li>
                    <li><Label text="Feedback & Comments"/></li>
                    <li><Label text="Find my Ad"/></li>
                    <li><Label text="Contact us"/></li>
                </ul>
            </section>
            <section className="col-md-2">
                <div className="section-title"><Label text="DEALER SERVICES"/></div>
                <ul>
                    <li><Label text="Dealer.com"/></li>
                    <li><Label text="vAuto"/></li>
                </ul>

            </section>
            <section className="col-md-2">
                <div className="section-title"><Label text="PARTNERS"/></div>
                <ul>
                    <li><Label text="Autos.ca"/></li>
                    <li><Label text="autoHEBDO.ne"/></li>
                </ul>
            </section>
        </div>
        <div className="footer-bottom clearfix container">
            <div className="pull-left">
                <img src="/static/images/footer/apple-store.jpg" alt=""/>
                <img src="/static/images/footer/android-store.jpg" alt=""/>
                <img src="/static/images/footer/black-berry.jpg" alt=""/>
            </div>
            <div className="pull-right">
                <img src="/static/images/footer/facebook.jpg" alt=""/>
                <img src="/static/images/footer/twitter.jpg" alt=""/>
                <img src="/static/images/footer/gplus.jpg" alt=""/>
                <img src="/static/images/footer/youtube.jpg" alt=""/>
            </div>
        </div>

    </footer>
)

export default footer