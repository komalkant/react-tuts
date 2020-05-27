/////////////forget password page/////////////////
import React, { Component } from 'react'
import { Link } from 'react-router'
import Recaptcha from 'react-recaptcha';
import { Helmet } from "react-helmet";
import * as actions from '../../../actions/index'
import { connect } from 'react-redux'
import { captchatoken } from '../../../../credential.json';
let recaptchaInstance;
class ForgetPassword extends Component {
    state = {
        captchatext: "",
        captcha: false,
        emailtext: ""
    }
    componentWillMount() {
        this.props.resetpassmodel();
        this.props.forgetpassworderror("")
    }
    componentDidMount() {
        // this.GenerateCaptcha();
    }
    submit = () => {
        this.props.forgetpassworderror("")
        let { email,
            //  txtCaptcha, txtCompare 
            } = this.refs;
        const emailreg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm.test(email.value);
        const mobile = /^((\\+)|(00)|(\\*)|())[0-9]{3,14}((\\#)|())$/.test(email.value);
        // var str1 = this.removeSpaces(this.refs.txtCaptcha.value);
        // var str2 = this.removeSpaces(this.refs.txtCompare.value);

        // if (str1 == str2) {
        //     this.setState({ captchatext: "" })
        // } else {
        //     this.setState({ captchatext: "please check the captcha" })
        // }

        if (email.value.trim().length == 0) {
            this.setState({ emailtext: "required" })
        }
        else if (!(mobile || emailreg)) {
            this.setState({ emailtext: "not valid email or mobile number" })
        } else {
            this.setState({ emailtext: "" })
        }

        if (!this.state.captcha) {

            this.setState({ captchatext: "please check the captcha" })

        } else {
            this.setState({ captchatext: "" })
        }

        if (!(mobile || emailreg)) { } else if (!this.state.captcha) { } else {
            this.props.resetpasssubmit()
            this.props.forgetpassword({ email: email.value.trim() });
            email.value = "";
            recaptchaInstance.reset();
            this.setState({ captcha: false, captchatext: "" })
        }

    }

    verifyCallback = response => {
        this.setState({ captcha: true, captchatext: "" })
    }
    callback = () => {
        this.setState({ captcha: false })
    }



    // GenerateCaptcha = () => {
    //     var chr1 = Math.ceil(Math.random() * 10) + '';
    //     var chr2 = Math.ceil(Math.random() * 10) + '';
    //     var chr3 = Math.ceil(Math.random() * 10) + '';
    //     var chr4 = Math.ceil(Math.random() * 10) + '';
    //     var chr5 = Math.ceil(Math.random() * 10) + '';
    //     var chr6 = Math.ceil(Math.random() * 10) + '';
    //     var chr7 = Math.ceil(Math.random() * 10) + '';
    //     var captchaCode = chr1 + ' ' + chr2 + ' ' + chr3 + ' ' + chr4 + ' ' + chr5 + ' ' + chr6 + ' ' + chr7;
    //     this.refs.txtCaptcha.value = captchaCode;
    // }

    // removeSpaces = (string) => {
    //     return string.split(' ').join('');
    // }

    render() {
        return (
            <div className="loginpage">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Forget Password</title>
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
                                <div className=" col-sm-5 col-md-5">
                                    <h1 className="login_title">Forgot Password</h1>
                                    <div className="form-signin">
                                        <input type="text" ref="email" className="form-control" placeholder="Email/ Phone Number" />
                                        {this.state.emailtext != "" ? <div className="alert error alert-danger col-xs-12" style={{ position: "relative" }} >
                                            <strong>{this.state.emailtext}</strong>
                                        </div> : null}
                                        <label>Select The Captcha Below</label>
                                        <Recaptcha
                                            ref={e => recaptchaInstance = e}
                                            sitekey={captchatoken}
                                            render="explicit"
                                            verifyCallback={this.verifyCallback}
                                            onloadCallback={this.callback}
                                            type="text"
                                        />
                                        {/*<input type="text" ref="txtCaptcha" onCopy={(e) => { e.preventDefault(); return false; }} className="captchpwd" readOnly="readOnly" />*/}
                                        {/*<i className="fa fa-refresh" style={{ marginLeft: "10px" }} aria-hidden="true" onClick={this.GenerateCaptcha}></i>*/}
                                        {/*<input type="button" value="Refresh" onClick={this.GenerateCaptcha} />*/}
                                        {/*<input type="text" ref="txtCompare" className="form-control" placeholder="Enter Captcha" />*/}
                                        {/*<input id="btnValid" type="button" value="Check" onClick={this.ValidCaptcha} />*/}

                                        {this.state.captchatext != "" ? <div className="alert error alert-danger" style={{ position: "absolute", marginTop: "5px" }} >
                                            <strong>{this.state.captchatext}</strong>
                                        </div> : null}

                                        {this.props.errmessage != "" ? <div className="alert error alert-danger" style={{ position: "absolute", marginTop: 0 }} >
                                            <strong>{this.props.errmessage}</strong>
                                        </div> : null}

                                        <button onClick={this.submit} className="btn btn-lg btn-primary btn-block login-button" style={{ marginTop: "40px" }} type="submit">
                                            Continue </button>
                                    </div>

                                </div>
                                <div className=" col-sm-7 col-md-7">
                                    <div className="forgetbg"><img src="/static/img/forget_password.png" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <!-- loader--> */}
                <div className="modal fade in" role="dialog" style={{ display: !this.props.resetpass ? "block" : "none" }}>
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







                <div className="modal fade in" role="dialog" style={{ display: this.props.resetpasssucess ? "block" : "none" }}>
                    <div className="modal-dialog forgetpass_confirm">

                        {/* <!-- Modal content--> */}
                        <div className="modal-content model-box">

                            <div className="modal-body text-center">
                                <figure><img src="/static/img/done.png" className="pay-icon" /></figure>
                                <p className="forget-para">A Link to Reset You Password Have Been Shared in Your Email Id</p>
                                <div className="footer-pay">
                                    Go back to <Link onClick={() => { this.props.resetpassmodel() }} to="/Login">Login</Link>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>


        );
    }
}

export default connect(store => ({
    resetpass: store.loaderReducer.resetpass,
    resetpasssucess: store.loaderReducer.resetpasssucess,
    errmessage: store.forgetPassError.message
}),
    actions
)(ForgetPassword);