import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
class LandingPage extends Component {
    render() {
        return (
            <div className="overalay">
                <div className="container">
                    <div className="row">
                        <div className="innerwrap home-bg">
                            <img src="/static/img/logohome.jpg" className="img-responsive center-block" alt="Landing Page Logo" />
                            <div id="col" className="container">
                                <div className="row text-center">
                                    <div className="col-xs-12 col-sm-6">
                                        <Link to="/home">
                                            <div id="div1">
                                                <div id="div2"></div>
                                                <h1 className="text-center hospitalhead">Book <br />Hospital</h1>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <div id="div3">
                                            <div id="div4"></div>
                                            <h1 className="text-center hospitalhead">Book <br />Home Visit <br /><span style={{ fontSize: "12px" }}>( Coming Soon )</span></h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="col" className="container">
                                <div className="row text-center">
                                    <div className="col-sm-12">
                                        <p className="copyright">© 2017 Rozenamah. All Rights Reserved</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;