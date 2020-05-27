import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from './header'
import Footer from './footer'
import { Link } from 'react-router';
import * as actions from '../actions/index'
import { browserHistory } from 'react-router';
class Terms extends Component {

    componentWillMount() {
        this.props.terms();
    }
    back = () => {
        browserHistory.push("/signup")
    }
    render() {
        return (
            <div>
                <Header />
                <div className="breadcrumb">
                    <div className="container">
                        <nav id="breadcrumb-trail">
                            <ol>
                                <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
                                <li className="active"><Link to="/terms">Terms And Conditions</Link></li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="content-box">
                    <div className="container">
                        <div className="row user-tabs ui-tabs ui-widget ui-corner-all ui-tabs-vertical ui-helper-clearfix">
                            <div className="col-md-12 col-sm-12 col-xs-12 aponireqst">
                                <button type="button" className="btn btn-primary" onClick={this.back}>Back</button>
                                <h3>Terms And Conditions</h3>
                                {this.props.plan.map((term, index) => {
                                    return (
                                        <div key={index}>
                                            <h4><b>{term.name}</b></h4>
                                            <p>{term.text}</p>
                                            <br />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(store => ({
    plan: store.terms.plan
}),
    actions
)(Terms);