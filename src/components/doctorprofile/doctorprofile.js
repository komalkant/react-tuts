import React, { Component } from 'react'
import Header from '../header'
import Footer from '../footer'
import { Helmet } from "react-helmet";
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DoctorProfileSidebar from './profilesidebar'
import Appointment from './appointment'
import Myprofile from './myprofile'
import Message from './messages/message'
import moment from 'moment';
import Billing from './billing/billing'
import Sappointment from './sappointment'
import Changepass from './changepassword'
import Availaible from './availability/availability'
import Insurance from './insurance/insurance'
import Social from './social'
import Feedback from './feedback'
import Location from './location/location'
import DeleteAccount from './delete'

class DoctorProfile extends Component {
    state = {

    }

    render() {
        return (<div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Doctor Profile</title>
            </Helmet>
            <Header />
            <div className="breadcrumb">
                <div className="container">
                    <nav id="breadcrumb-trail">
                        <ol>
                            <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
                            <li className="active"><Link to="/doctorprofile">Settings</Link></li>

                        </ol>
                    </nav>
                </div>
            </div>

            <div className="content-box">
                <div className="container">
                    <div className="row user-tabs ui-tabs ui-widget ui-corner-all ui-tabs-vertical ui-helper-clearfix">
                        <DoctorProfileSidebar />
                        {this.props.tab == "billing" ? <Billing /> : null}
                        {this.props.tab == "message" ? <Message /> : null}
                        {this.props.tab == "appointment" ? <Appointment /> : null}
                        {this.props.tab == "profile" ? <Myprofile /> : null}
                        {this.props.tab == "appoint" ? <Sappointment /> : null}
                        {this.props.tab == "pass" ? <Changepass /> : null}
                        {this.props.tab == "avail" ? <Availaible /> : null}
                        {this.props.tab == "set" ? <Insurance /> : null}
                        {this.props.tab == "link" ? <Social /> : null}
                        {this.props.tab == "feed" ? <Feedback /> : null}
                        {this.props.tab == "loc" ? <Location /> : null}
                        {this.props.tab == "del" ? <DeleteAccount /> : null}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
        );
    }
}
export default connect(store => ({
    tab: store.profiletab.text
}),
    actions

)(DoctorProfile);