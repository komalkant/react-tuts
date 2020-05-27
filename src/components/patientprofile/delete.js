import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import * as actions from '../../actions/index'
// import { findDOMNode } from 'react-dom';

class DeleteAccount extends Component {

    deleteaccount = () => {
        this.props.deleteaccount().then((res) => {
            if (res.code == 200) {
                document.getElementById("cancel").click();
            }
        })
    }

    render() {
        return (
            <div className="user-panel col-md-8 col-sm-8 htlfndr-booking-page ui-tabs-panel ui-widget-content ui-corner-bottom" id="htlfndr-user-tab-2" aria-labelledby="ui-id-2" role="tabpanel" aria-hidden="true">
                <h2>Delete Account</h2>
                <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#myModal2" >Delete Account</button>
                <div className="modal fade in" id="myModal2" role="dialog" style={{ display: "none" }}>
                    <div className="modal-dialog otp_confirm">

                        {/* <!-- Modal content--> */}
                        <div className="modal-content model-box ">

                            <div className="modal-body otpmodel text-center">
                                <p className="forget-para">Are you sure to delete your account</p>
                                <div className="form-inline">
                                    <div className="form-group">
                                        <button type="button" style={{ marginRight: "80px" }} onClick={this.deleteaccount} className="btn btn-danger">Confirm</button>
                                    </div>
                                    <div className="form-group">
                                        <button type="button" id="cancel" className="btn" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default connect(store => ({

}),
    actions

)(DeleteAccount);