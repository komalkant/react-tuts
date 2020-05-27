import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import { browserHistory, Link } from 'react-router';

class ResetPass extends Component {
    state = {
        pass1: "",
        pass2: "",
        popup: false,
        // popupex: false
    }
    componentWillMount() {
        var body = {
            token: this.props.params.id
        }
        this.props.checktoken(body).then((res) => {
            if (res.code != 200) {
                browserHistory.push("/404")
                // this.setState({ popupex: true })
            }
        })

    }
    submit = () => {
        const { nw, confirm } = this.refs;
        const npass = nw.value.trim().length
        const Passexp = /(?=.*[@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]+?).*[^_\W]+?.*/.test(nw.value.trim());
        const vcpass = nw.value != confirm.value;

        if (npass < 8) {
            this.setState({ pass1: "password must be of minimum 8 character" })
        } else if (npass >= 16) {
            this.setState({ pass1: "password not more than 16 character" })
        } else if (!Passexp) {
            this.setState({ pass1: "password must be alphanumeric with special character" })
        } else {
            this.setState({ pass1: "" })
        }

        if (vcpass) {
            this.setState({ pass2: "password not match" })
        } else {
            this.setState({ pass2: "" })
        }
        if (npass < 8 || npass >= 16) { } else if (vcpass) { } else if (!Passexp) { } else {
            var body = {
                token: this.props.params.id,
                pass: nw.value.trim(),
                conpass: confirm.value.trim()

            }
            this.props.resetpassword(body).then((res) => {
                if (res.code == 200) {
                    this.setState({ popup: true })
                } else {
                    this.setState({ message: res.message })
                    var x = document.getElementById("snackbar")
                    x.className = "show";
                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 4000);
                }
            });
        }

    }

    render() {
        return (
            <div className="loginpage">
                <div id="login-overlay" className="modal-dialog modal-md">
                    <div className="modal-header">
                        <figure className="text-center"><Link to="/"><img src="/static/img/logohome.jpg" style={{ width: "351px" }} alt="Rozenamah Logo" /></Link></figure>
                    </div>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className=" col-sm-12 col-md-12">
                                    <h1 className="login_title">Reset Password</h1>
                                    <input type="password" id="settings-old-pass" ref="nw" className="user-input" style={{ marginBottom: "26px" }} name="settings-old-pass" placeholder="New Password" />
                                    {this.state.pass1 != "" ? <div className="alert error alert-danger newclpos" >
                                        <strong>{this.state.pass1}</strong>
                                    </div> : null}
                                    <div className="clearfix"></div>
                                    <br />
                                    <input type="password" id="settings-old-pass" ref="confirm" className="user-input" name="settings-old-pass" style={{ marginBottom: "26px" }} placeholder="Confirm Password" />
                                    {this.state.pass2 != "" ? <div className="alert error alert-danger newclpos" >
                                        <strong>{this.state.pass2}</strong>
                                    </div> : null}
                                    <div className="clearfix"></div>
                                    <br />
                                    <input type="text" onClick={this.submit} className="form-control" value="SUBMIT" style={{ marginTop: "18px", background: "#5bc1d0", color: "#fff", textAlign: "center" }} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" style={{ display: this.state.popup ? "block" : "none" }}>
                    <div className="modal-dialog otp_confirm">

                        {/* <!-- Modal content--> */}
                        <div className="modal-content model-box ">

                            <div className="modal-body otpmodel text-center">
                                <figure><img src="/static/img/sinup-icon.png" className="pay-icon" /></figure>
                                <p className="forget-para">Your password is reset sucessfully</p>
                                <div className="footer-pay">
                                    <Link to="/login" >Login Now</Link> || <Link to="/signup">Register</Link>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
              
                <div id="snackbar">{this.state.message}</div>
            </div>
        );
    }

}

export default connect(store => ({

}),
    actions

)(ResetPass);