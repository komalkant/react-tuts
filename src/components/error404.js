import React, { Component } from 'react'
import { Link } from 'react-router';

class Error404 extends Component {
    render() {
        return (
            <div className="loginpage">
                <div id="login-overlay" className="modal-dialog modal-md">
                    <div className="modal-header">
                        <Link to="/">
                            <figure className="text-center"><img src="/static/img/logohome.jpg" style={{ width: "351px" }} alt="Rozenamah Logo" /></figure>
                        </Link>
                    </div>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className=" col-sm-12 col-md-12">
                                    <div className=" col-sm-6 col-md-6">
                                        <div className="forgetbg"><img src="/static/img/forget_password.png" alt="Forgot Password Image" /></div>
                                    </div>
                                    <div className=" col-sm-6 col-md-6">
                                        <h2 className="patient_title text-center" style={{ margin: "207px auto", fontSize: '56px' }} >Page  <span className="color-blue">Note Found</span></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom_footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <p className="text-center copyright">© 2017 Rozenamah. All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Error404;