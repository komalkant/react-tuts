////////////////signup page///////////////////////
import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Helmet } from "react-helmet";
import { connect } from 'react-redux'
import * as actions from '../../../actions/index'

class SignUp extends Component {
    state = {
        firstname: "",
        pass1: "",
        lastname: "",
        confirmpassword: "",
        eml: "",
        number: "",
        checkbox: ""
    }

    ComponentWillMount() {
        this.props.otperror("")
    }

    resendotp = () => {
        this.props.ResendOtp();
    }

    otpverify = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("cred")
        var otp = this.refs.otp.value;
        this.props.OtpVerify({ otp }, token).then((res) => {
            if (res.code == 200) {
                // const tokenval = localStorage.getItem("cred");
                localStorage.setItem("token", token);
                // browserHistory.push(`/login`);
                localStorage.removeItem("cred");
                if (localStorage.getItem('location') == null) {
                    browserHistory.push(`/`);
                } else {
                    browserHistory.push(`/${localStorage.getItem('location')}`);
                }

            }
        })
    }
    removeotp = () => {
        this.props.otphide()
    }

    saveinput = () => {
        const { fname, lname, email, numb } = this.refs;
        localStorage.setItem("fname", fname.value);
        localStorage.setItem("lname", lname.value);
        localStorage.setItem("email1", email.value);
        localStorage.setItem("numb", numb.value);
    }
    componentDidMount() {
        var fname1 = localStorage.getItem("fname");
        var lname1 = localStorage.getItem("lname");
        var email1 = localStorage.getItem("email1");
        var numb1 = localStorage.getItem("numb");
        const { fname, lname, email, numb } = this.refs;
        if (fname1) {
            fname.value = fname1;
            localStorage.removeItem("fname")
        }
        if (lname1) {
            lname.value = lname1;
            localStorage.removeItem("lname")
        }
        if (email1) {
            email.value = email1;
            localStorage.removeItem("email1")
        }
        if (numb1) {
            numb.value = numb1;
            localStorage.removeItem("numb")
        }
    }

    submit = () => {
        const { fname, lname, pass, cpass, email, numb, check } = this.refs;

        const emailreg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
        const mobile = /^((\\+)|(00)|(\\*)|())[0-9]{3,14}((\\#)|())$/.test(numb.value);
        const vfname = fname.value.trim().length;
        const alphfname = /^[A-z]+$/.test(fname.value.trim());
        const vlname = lname.value.trim().length;
        const alphlname = /^[A-z]+$/.test(lname.value.trim())
        const vpass = pass.value.trim().length;
        const vcpass = pass.value != cpass.value;
        const vemail = emailreg.test(email.value)
        const Passexp = /(?=.*[@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]+?).*[^_\W]+?.*/.test(pass.value.trim());

        if (vfname < 2) {
            this.setState({ firstname: "required minimum 2 characters" })
        } else if (vfname >= 30) {
            this.setState({ firstname: "not more than 30 characters" })
        } else if (!alphfname) {
            this.setState({ firstname: "Only alphabets are accepted" })
        } else {
            this.setState({ firstname: "" })
        }

        if (vlname < 2) {
            this.setState({ lastname: "required minimum 2 characters" })
        } else if (vlname >= 30) {
            this.setState({ lastname: "not more than 30 characters" })
        } else if (!alphlname) {
            this.setState({ lastname: "Only alphabets are accepted" })
        } else {
            this.setState({ lastname: "" })
        }

        if (vpass < 8) {
            this.setState({ pass1: "password must be of minimum 8 character" })
        } else if (vpass >= 16) {
            this.setState({ pass1: "password not more than 16 character" })
        } else if (!Passexp) {
            this.setState({ pass1: "password must be alphanumeric with special character" })
        } else {
            this.setState({ pass1: "" })
        }

        if (vcpass) {
            this.setState({ confirmpassword: "password not match" })
        } else {
            this.setState({ confirmpassword: "" })
        }

        if (!vemail) {
            this.setState({ eml: "invalid email" })
        } else {
            this.setState({ eml: "" })
        }

        if (!mobile) {
            this.setState({ number: "Invalid number" })
        } else {
            this.setState({ number: "" })
        }

        if (!check.checked) {
            this.setState({ checkbox: "please check the checkbox" })
        } else {
            this.setState({ checkbox: "" })
        }



        if (vfname < 2 || vfname >= 30) { } else if (vlname < 2 || vlname >= 30) { } else if (vpass < 8 || vpass >= 16) { } else if (vcpass) {
        } else if (!vemail) { } else if (!mobile) { } else if (!check.checked) { } else if (!alphlname) { } else if (!alphfname) { } else if (!Passexp) { }
        else {
            this.props.signupsubmitloader()
            this.setState({ firstname: "", pass1: "", confirmpassword: "", eml: "", number: "", checkbox: "" })
            this.props.patientSignup(
                {
                    "first_name": fname.value.trim(),
                    "last_name": lname.value.trim(),
                    "email": email.value,
                    "password": pass.value,
                    "password_confirmation": cpass.value,
                    "phone": numb.value,
                });
        }

    }
    renderAlert = () => {
        if (this.props.signuperror != "") {
            return (
                <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className="alert alert-danger">
                        <strong>Oops!&nbsp;</strong>{this.props.signuperror}
                    </div>
                </div>
            );
        }
    }
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

                        <div className="modal-body">
                            <div className="row">
                                <div className=" col-sm-12 col-md-12">
                                    <h1 className="login_title">Sign Up</h1>
                                    <div className="form-signin col-md-12" >

                                        <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                            <input type="text" ref="fname" className="form-control" placeholder="First Name" />
                                            {this.state.firstname != "" ? <div className="alert error alert-danger newclpos" >
                                                <strong>{this.state.firstname}</strong>
                                            </div> : null}

                                        </div>
                                        <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                            <input type="text" ref="lname" className="form-control" placeholder="Last Name" />
                                            {this.state.lastname != "" ? <div className="alert error alert-danger newclpos" >
                                                <strong>{this.state.lastname}</strong>
                                            </div> : null}
                                        </div>
                                        <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                            <input type="password" ref="pass" className="form-control" placeholder="Password" />
                                            {this.state.pass1 != "" ? <div className="alert error alert-danger newclpos" >
                                                <strong>{this.state.pass1}</strong>
                                            </div> : <div />}
                                        </div>

                                        <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                            <input type="password" ref="cpass" className="form-control" placeholder="Confirm Password" />
                                            {this.state.confirmpassword != "" ? <div className="alert error alert-danger newclpos" >
                                                <strong>{this.state.confirmpassword}</strong>
                                            </div> : <div />}
                                        </div>
                                        <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                            <input type="text" ref="email" className="form-control" placeholder="Email Address" />
                                            {this.state.eml != "" ? <div className="alert error alert-danger newclpos" >
                                                <strong>{this.state.eml}</strong>
                                            </div> : <div />}
                                        </div>

                                        <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                            <input type="text" ref="numb" className="form-control" placeholder="Phone Number" />
                                            {this.state.number != "" ? <div className="alert error alert-danger newclpos" >
                                                <strong>{this.state.number}</strong>
                                            </div> : <div />}
                                        </div>
                                        <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                            <input type="checkbox" ref="check" id="test1" value="Terms-conditions" />
                                            <label htmlFor="test1" className="checkbox pull-left signcheck"><Link to="/terms" onClick={this.saveinput} >Accept Terms & Conditions</Link></label>
                                            {this.state.checkbox != "" ? <div className="alert error alert-danger" style={{ position: "relative", float: "left" }}>
                                                <strong>{this.state.checkbox}</strong>
                                            </div> : <div />}
                                        </div>
                                        {this.renderAlert()}
                                        <div style={{ clear: 'both' }}></div>
                                        <div className="signup_button"><button className="btn btn-lg btn-primary btn-block login-button" onClick={this.submit} type="submit">
                                            Sign Up </button></div>
                                        <p className="text-center nonmember"> Already a Member ?<Link to="/login"> Login</ Link></p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- loader--> */}
                <div className="modal fade in" role="dialog" style={{ display: this.props.signuploader ? "block" : "none" }}>
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
                {/* <!--otp Popup--> */}
                <div className="modal fade in" role="dialog" style={{ display: this.props.otpmodel ? "block" : "none" }}>
                    <div className="modal-dialog otp_confirm">

                        {/* <!-- Modal content--> */}
                        <div className="modal-content model-box">

                            <div className="modal-body otpmodel text-center">
                                <i className="fa fa-times" onClick={this.removeotp} style={{ position: "absolute", right: "12px", top: "12px" }}></i>
                                <figure><img src="/static/img/signupcomplete.png" className="pay-icon" /></figure>
                                <form className="form-signin otp" onSubmit={this.otpverify}>
                                    <div className="form-group col-xs-12 col-sm-7 col-md-7 col-lg-7 "><input type="text" className="form-control" ref="otp" placeholder="Enter OTP" required="" autofocus="" />
                                        {this.props.otperr != "" ? <div className="alert alert-danger">
                                            <strong>Oops!&nbsp;</strong>{this.props.otperr}
                                        </div> : null}

                                    </div>
                                    <div className="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5  "><button className=" verify-button " type="submit">
                                        Verify </button></div>
                                </form>
                                <div className="footer-pay">
                                    <a onClick={this.resendotp} href="javascript:void(0)">Resend OTP</a>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {/* <!-- End otp Popup--> */}

            </div >
        );
    }
}

SignUp = connect(
    store => ({
        signuperror: store.Signuperror.signuperror,
        signuploader: store.loaderReducer.signuploader,
        otpmodel: store.loaderReducer.otpmodel,
        otperr: store.otpError.message
    }),
    actions
)(SignUp);

export default SignUp;