///////////////////login page/////////////////////
import React, { Component } from 'react'
import { Link } from 'react-router'
import { Helmet } from "react-helmet";
import { connect } from 'react-redux'
import * as actions from '../../../actions/index'
class Login extends Component {
    state = {
        emailid: "",
        password: ""
    }

    componentWillMount() {
        this.props.Signinerror("")
    }

    renderAlert() {
        if (this.props.signinerr != "") {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!&nbsp;</strong>{this.props.signinerr}
                </div>
            );
        }
    }


    submit = () => {
        const { email, pass, checkbox } = this.refs;
        // console.log("check box", checkbox.checked)
        const emailreg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm.test(email.value);
        const mobile = /^((\\+)|(00)|(\\*)|())[0-9]{3,14}((\\#)|())$/.test(email.value);
        if (!(mobile || emailreg)) {
            this.setState({ emailid: "not valid email or mobile number" })
        } else {
            this.setState({ emailid: "" })
        }

        if (pass.value.trim().length <= 0) {
            this.setState({ password: "password required" })
        } else {
            this.setState({ password: "" })
        }

        if (!(mobile || emailreg)) {
        } else if (pass.value.trim().length <= 0) {
        } else {
            if (checkbox.checked) {
                localStorage.setItem("email", email.value.trim())
            }
            this.props.loginsubmitloader();
            this.props.patientSignin({ email: email.value.trim().toLowerCase(), password: pass.value.trim() })
        }

    }

    componentDidMount() {
        // console.log("login ref", this.refs.email);
        if (localStorage.getItem("email")) {
            this.refs.email.value = localStorage.getItem("email")
        }

    }


    render() {
        return (
            <div className="loginpage">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>login</title>
                </Helmet>
                <div id="login-overlay" className="modal-dialog modal-md">
                    <div className="modal-header">
                        <Link to='/' >
                            <figure className="text-center"><img src="/static/img/logohome.jpg" style={{ width: "351px" }} /></figure>
                        </Link>
                    </div>
                    <div className="modal-content">
                        <div className="modal-body login-body">
                            <div className="row">
                                <div className=" col-sm-5 col-md-5">
                                    <h1 className="login_title">Login</h1>
                                    <div className="form-signin">
                                        <input type="text" ref="email" className="form-control" placeholder="Email/ Phone Number" required autoFocus />
                                        {this.state.emailid != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                            <strong>{this.state.emailid}</strong>
                                        </div> : null}

                                        <input type="password" ref="pass" className="form-control" placeholder="Password" required />
                                        {this.state.password != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                            <strong>{this.state.password}</strong>
                                        </div> : null}
                                        <input type="checkbox" ref="checkbox" id="test1" value="remember-me" />
                                        <label htmlFor="test1" className="checkbox pull-left" >Remember me</label>
                                        <Link to="/forgotpassword" className="pull-right forgot-password"> Forgot Password ? </ Link><span className="clearfix"></span>
                                        {this.renderAlert()}
                                        <button className="btn btn-lg btn-primary btn-block login-button" onClick={this.submit} type="submit">
                                            Login </button>
                                        <p className="text-center nonmember"> Not a Member ? <Link to="/signup"> Sign Up</ Link></p>
                                    </div>
                                </div>
                                <div className=" col-sm-7 col-md-7 no-padding">
                                    <div className="leftbg"><img src="/static/img/Login-leftbackground.jpg" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- loader--> */}
                <div className="modal fade in" role="dialog" style={{ display: this.props.loginloader ? "block" : "none" }}>
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

            </div>


        );
    }
}
export default connect(
    store => ({
        signinerr: store.Signinerr.signinerr,
        loginloader: store.loaderReducer.loginloader
    }),
    actions
)(Login);



//export default Login;