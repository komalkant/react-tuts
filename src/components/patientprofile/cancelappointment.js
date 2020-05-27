import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import * as actions from '../../actions/index'
// import { findDOMNode } from 'react-dom';

class CancelAppoint extends Component {


    render() {
        return (
            <div className="user-panel col-md-8 col-sm-8 htlfndr-booking-page ui-tabs-panel ui-widget-content ui-corner-bottom" id="htlfndr-user-tab-2" aria-labelledby="ui-id-2" role="tabpanel" aria-hidden="true">
                <h2>Cancel Appointment</h2>

               
            </div>
        )
    }
}
export default connect(store => ({

}),
    actions

)(CancelAppoint);