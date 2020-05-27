import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actions from '../../actions/index'
// import { findDOMNode } from 'react-dom';

class Changepass extends Component {
    state = {
        userloader: false,
        serverpasserr: "",
        vopass: "",
        vnpass: "",
        vcpass: "",
        content: "",
        showpass1:false,
        showpass2:false,
        showpass3:false
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const { changepassword } = this.props;
        const { oldpass, newpass, confirmpass } = this.refs;
        var opass = oldpass.value.trim().length;
        var opassexp = /(?=.*[@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]+?).*[^_\W]+?.*/.test(oldpass.value.trim());
        var npass = newpass.value.trim().length;
        var npassexp = /(?=.*[@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]+?).*[^_\W]+?.*/.test(newpass.value.trim());
        var cpass = confirmpass.value.trim().length;
        var cpassexp = /(?=.*[@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]+?).*[^_\W]+?.*/.test(confirmpass.value.trim());

        if (opass < 8) {
            this.setState({ vopass: "password must be of minimum 8 character" })
        } else if (opass >= 16) {
            this.setState({ vopass: "password not more than 16 character" })
        } else if (!opassexp) {
            this.setState({ vopass: "password must be alphanumeric with special character" })
        } else {
            this.setState({ vopass: "" })
        }

        if (npass < 8) {
            this.setState({ vnpass: "password must be of minimum 8 character" })
        } else if (npass >= 16) {
            this.setState({ vnpass: "password not more than 16 character" })
        } else if (!npassexp) {
            this.setState({ vnpass: "password must be alphanumeric with special character" })
        } else {
            this.setState({ vnpass: "" })
        }

        if (cpass < 8) {
            this.setState({ vcpass: "password must be of minimum 8 character" })
        } else if (cpass >= 16) {
            this.setState({ vcpass: "password not more than 16 character" })
        } else if (!cpassexp) {
            this.setState({ vcpass: "password must be alphanumeric with special character" })
        } else {
            this.setState({ vcpass: "" })
        }

         if (opass < 8 || opass >= 16 || !opassexp) { } else if (npass < 8 || npass >= 16 || !npassexp) { } else if (cpass < 8 || cpass >= 16 || !cpassexp) { } else {
            this.setState({ userloader: true })
            var body = { "newPassword": newpass.value, "confirmPassword": confirmpass.value, "oldPassword": oldpass.value }
            var token = localStorage.getItem("token")
            changepassword(body, token).then((data) => {
                if (data.code == 200) {
                    newpass.value = "";
                    confirmpass.value = "";
                    oldpass.value = "";
                    this.setState({ serverpasserr: "", userloader: false, content: data.message })
                    var x = document.getElementById("snackbar")
                    x.className = "show";
                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                } else {
                    this.setState({ serverpasserr: data.message, userloader: false, content: data.message })
                    var x = document.getElementById("snackbar")
                    x.className = "show";
                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                }
            });
        }

    }

    render() {
        const { user } = this.props;
        return (
            <div className="user-panel col-md-8 col-sm-8 htlfndr-booking-page ui-tabs-panel ui-widget-content ui-corner-bottom" id="htlfndr-user-tab-2" aria-labelledby="ui-id-2" role="tabpanel" aria-hidden="true">
                <form onSubmit={this.handleSubmit} className="change-setting" >
                    <div className="row">
                        <div className="userinner-avatar text-center">
                            <img src="/static/img/change-password.png" alt="user avatar" />
                            {this.state.serverpasserr != "" ? <div className="sr_err">
                                Oops' {this.state.serverpasserr}!
                                            </div> : null}
                            <button type="submit" className="update">Update</button>
                        </div>
                        <div className="col-md-4 user-form-setting-cols">
                            <input id="settings-old-pass" ref="oldpass" className="user-input" type={this.state.showpass1?"text":"password"} name="settings-old-pass" placeholder="Old Password" />

                            {this.state.vopass != "" ? <div className="alert error alert-danger" style={{ position: "relative", top: "26px" }} >
                                <strong>{this.state.vopass}</strong>
                            </div> : null}

                            <div  style={{ position: "absolute", top: "33%", userSelect: "none", right: "15px", marginTop: "-2.5px" }}>{this.state.showpass1?<i className="fa fa-eye-slash" onClick={()=>{this.setState({showpass1:false})}} aria-hidden="true"></i>:<i className="fa fa-eye" onClick={()=>{this.setState({showpass1:true})}} aria-hidden="true"></i>}</div>
                        </div>
                        <div className="col-md-4 user-form-setting-cols">
                            <input id="settings-new-pass" ref="newpass" className="user-input" type={this.state.showpass2?"text":"password"} name="settings-new-pass" placeholder="New Password" ms-reveal="" />

                            {this.state.vnpass != "" ? <div className="alert error alert-danger" style={{ position: "relative", top: "26px" }} >
                                <strong>{this.state.vnpass}</strong>
                            </div> : null}

                            <div  style={{ position: "absolute", top: "33%", userSelect: "none", right: "15px", marginTop: "-2.5px" }}>{this.state.showpass2?<i className="fa fa-eye-slash" onClick={()=>{this.setState({showpass2:false})}} aria-hidden="true"></i>:<i className="fa fa-eye" onClick={()=>{this.setState({showpass2:true})}} aria-hidden="true"></i>}</div>

                        </div>
                        <div className="col-md-4 user-form-setting-cols">
                            <input id="settings-new-confirm-again" ref="confirmpass" className="user-input" type={this.state.showpass3?"text":"password"} name="settings-confirm-pass-again" placeholder="Confirm Password" />

                            {this.state.vcpass != "" ? <div className="alert error alert-danger" style={{ position: "relative", top: "26px" }} >
                                <strong>{this.state.vcpass}</strong>
                            </div> : null}
                            <div  style={{ position: "absolute", top: "33%", userSelect: "none", right: "15px", marginTop: "-2.5px" }}>{this.state.showpass3?<i className="fa fa-eye-slash" onClick={()=>{this.setState({showpass3:false})}} aria-hidden="true"></i>:<i className="fa fa-eye" onClick={()=>{this.setState({showpass3:true})}} aria-hidden="true"></i>}</div>
                        </div>
                    </div>
                </form>
                {/* <!-- loader--> */}
                <div className="modal" role="dialog" style={{ display: this.state.userloader ? "block" : "none" }}>
                    <div className="modal-dialog loader-modal" >

                        {/* <!-- Modal content--> */}
                        <div className="modal-content">

                            <div className="modal-body text-center">
                                <figure><img src="/static/img/loader.gif" className="pay-icon" /></figure>
                            </div>

                        </div>

                    </div>
                </div>

                {/* <!-- loader end--> */}
                <div id="snackbar">{this.state.content}</div>
            </div>
        )
    }
}
export default connect(store => ({

}),
    actions

)(Changepass);