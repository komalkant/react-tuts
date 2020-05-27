import React, { Component } from 'react'
import { Link } from 'react-router'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux'
import * as actions from '../../actions'
// import Datetime from "react-datetime"
class DoctorSignup1 extends Component {
    state = {
        // startDate: "",
        firstname: "",
        lastname: "",
        eml: "",
        number: "",
        gender: "",
        pass1: "",
        confirmpassword: "",
        servererr: "",
        // dateformat: "",
        signuploader: false,
        otpscreenshow: false
    }

    ComponentWillMount() {
        this.props.otperror("")
    }

    resendotp = () => {
        this.props.ResendOtp();
    }

    otpverify = (e) => {
        e.preventDefault();
        var token = localStorage.getItem("cred")
        var otp = this.refs.otp.value;
        this.props.OtpVerify({ otp }, token).then((res) => {
            if (res.code == 200) {
                this.props.doctorsignupstep2()
            }
        })
    }
    removeotp = () => {
        this.props.otphide()
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    }
    submitstep1 = () => {


        // const date = document.getElementById("date").value
        // var aDate = moment(date, 'MM/DD/YYYY', true);
        // var isValid = aDate.isValid();


        const { fname, lname, email, phone, pass, cpass } = this.refs;
        // const date = moment(this.state.startDate).format('DD/MM/YYYY');
        const vfname = fname.value.trim().length;
        const alphfname = /^[A-z]+$/.test(fname.value.trim());

        // if (!isValid) {
        //     this.setState({ dateformat: "please enter a valid date" })
        // } else {
        //     this.setState({ dateformat: "" })
        // }

        if (vfname < 2) {
            this.setState({ firstname: "required minimum 2 characters" })
        } else if (vfname >= 30) {
            this.setState({ firstname: "not more than 30 characters" })
        } else if (!alphfname) {
            this.setState({ firstname: "Only alphabets are accepted" })
        } else {
            this.setState({ firstname: "" })
        }


        const vlname = lname.value.trim().length;
        const alphlname = /^[A-z]+$/.test(lname.value.trim());

        if (vlname < 2) {
            this.setState({ lastname: "required minimum 2 characters" })
        } else if (vlname >= 30) {
            this.setState({ lastname: "not more than 30 characters" })
        } else if (!alphlname) {
            this.setState({ lastname: "Only alphabets are accepted" })
        } else {
            this.setState({ lastname: "" })
        }

        const emailreg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
        const vemail = emailreg.test(email.value)

        if (!vemail) {
            this.setState({ eml: "invalid email" })
        } else {
            this.setState({ eml: "" })
        }

        const mobile = /^((\\+)|(00)|(\\*)|())[0-9]{3,14}((\\#)|())$/.test(phone.value);
        if (!mobile) {
            this.setState({ number: "Invalid number" })
        } else {
            this.setState({ number: "" })
        }

        if (this.gender.value == "") {
            this.setState({ gender: "Please select a gender" })
        } else {
            this.setState({ gender: "" })
        }

        const vpass = pass.value.trim().length;
        const vcpass = pass.value != cpass.value;
        const Passexp = /(?=.*[@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]+?).*[^_\W]+?.*/.test(pass.value.trim());

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


        if (vfname < 2 || vfname >= 30) { } else if (vlname < 2 || vlname >= 30) { } else if (vpass < 8 || vpass >= 16) { } else if (vcpass) {
        } else if (!vemail) { } else if (!mobile) { } else if (!alphlname) { } else if (!alphfname) { } else if (!Passexp) { } else if (this.gender.value == "") { }
        //  else if (!isValid) { }
        else {
            this.setState({ signuploader: true })
            const body = {
                first_name: fname.value,
                last_name: lname.value,
                email: email.value,
                phone: phone.value,
                gender: this.gender.value,
                // date_of_birth: date,
                password: pass.value,
                password_confirmation: cpass.value
            }
            this.props.postsignupstep1(body).then((res) => {
                this.setState({ signuploader: false })
                if (res.code != 200) {
                    this.setState({ servererr: res.message })
                } else {

                }
            })
        }
    }

    render() {
        return (
            <div className="modal-body">
                <div className="row">
                    <div className=" col-sm-12 col-md-12">
                        <h1 className="login_title">Sign Up</h1>
                        <div className="dol-md-3 stepr">
                            <h5 className="stopof">step 1 of 3</h5>
                            <span className="steperdiv steperdiv1"></span>
                            <span className="steperdiv steperdiv1"></span>
                            <span className="steperdiv"></span>

                            <div className="clearfix"></div>
                            <span></span>
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-signin" >

                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" ref="fname" className="form-control" placeholder="First Name" />
                                {this.state.firstname != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.firstname}</strong>
                                </div> : null}

                            </div>
                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" ref="lname" className="form-control" placeholder="Last Name" />
                                {this.state.lastname != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.lastname}</strong>
                                </div> : null}
                            </div>
                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="email" ref="email" className="form-control" placeholder="Email Addresss" />
                                {this.state.eml != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.eml}</strong>
                                </div> : <div />}
                            </div>
                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" ref="phone" className="form-control" placeholder="Phone Number" />
                                {this.state.number != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.number}</strong>
                                </div> : <div />}
                            </div>
                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <select className="form-control" ref={(input) => this.gender = input} >
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {this.state.gender != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.gender}</strong>
                                </div> : <div />}
                            </div>

                            {/*<div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <DatePicker
                                    id="date"
                                    placeholderText="Date Of Birth"
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                />*/}
                            {/*{this.state.dateformat != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.dateformat}</strong>
                                </div> : <div />}
                            </div>*/}
                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="password" ref="pass" className="form-control" placeholder="Password" />
                                {this.state.pass1 != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.pass1}</strong>
                                </div> : <div />}
                            </div>
                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="password" ref="cpass" className="form-control" placeholder="Confirm Password" />
                                {this.state.confirmpassword != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.confirmpassword}</strong>
                                </div> : <div />}
                            </div>

                            <div style={{ clear: 'both' }}></div>
                            <div className="signup_button text-center">
                                {this.state.servererr != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.servererr}</strong>
                                </div> : <div />}
                                <button className="btn btn-lg btn-primary btn-block login-button" onClick={this.submitstep1} type="submit">
                                    Next </button>
                            </div>
                            <p className="text-center nonmember"> Already a Member?<Link to="/login">Login</ Link></p>
                        </div>

                    </div>

                </div>
                {/* <!-- loader--> */}
                <div className="modal fade in" role="dialog" style={{ display: this.state.signuploader ? "block" : "none" }}>
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
            </div>
        );
    }
}
export default connect(
    store => ({
        signuperror: store.Signuperror.signuperror,
        otpmodel: store.loaderReducer.otpmodel,
        otperr: store.otpError.message
    }),
    actions
)(DoctorSignup1);