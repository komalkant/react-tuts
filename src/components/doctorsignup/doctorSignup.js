import React, { Component } from 'react'
import { Helmet } from "react-helmet";
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DoctorSignup1 from './signupstep1'
import DoctorSignup2 from './signupstep2'
import DoctorSignup3 from './signupstep3'
class DoctorSignup extends Component {
   
    render() {
        return (
            <div className="loginpage">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>registration</title>
                </Helmet>
                <div id="login-overlay" className="modal-dialog modal-md">
                    <div className="modal-header">
                        <Link to='/' >
                            <figure className="text-center"><img src="/static/img/logohome.jpg" style={{ width: '351px' }} /></figure>
                        </Link>
                    </div>
                    <div className="modal-content">
                        {this.props.step1?<DoctorSignup1 /> : null}
                        {this.props.step2?<DoctorSignup2 /> : null}
                        {this.props.step3?<DoctorSignup3 /> : null}
                    </div>
                </div>

            </div>
        );
    }
}
export default connect(
    store=>({
       step1:store.doctorsingnupstep.step1,
       step2:store.doctorsingnupstep.step2,
       step3:store.doctorsingnupstep.step3
    }),
    actions
)(DoctorSignup);