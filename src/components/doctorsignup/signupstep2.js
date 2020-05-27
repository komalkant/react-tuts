import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Select from 'react-select'

class DoctorSignup2 extends Component {

    submitstep2 = () => {
        const { edu,
            //  award,
              ai } = this.refs;

        if (this.state.value.length == 0) { this.setState({ langerr: "required" }) } else { this.setState({ langerr: "" }) }
        if (edu.value.trim().length == 0) { this.setState({ edu: "required" }) } else { this.setState({ edu: "" }) }
        // if (award.value.trim().length == 0) { this.setState({ award: "required" }) } else { this.setState({ award: "" }) }
        if (ai.value.trim().length == 0) { this.setState({ ai: "required" }) } else { this.setState({ ai: "" }) }
        if (this.insure.value == "") { this.setState({ insurerr: "required" }) } else { this.setState({ insurerr: "" }) }
        if (this.special.value == "") { this.setState({ splerr: "required" }) } else { this.setState({ splerr: "" }) }
        if (this.state.value.length == 0) { } else if (edu.value.trim().length == 0) { }
        // else if (award.value.trim().length == 0) { }
        else if (ai.value.trim().length == 0) { } else if (this.insure.value == "") { } else if (this.special.value == "") { } else if (this.state.value.length == 0) { } else {
            let languages = []
            for (let id of this.state.value) {
                languages.push(id.value)
            }
            this.setState({ signuploader: true, servererr: "" })
            this.props.postsignupstep2(
                {
                    languages: `[${languages}]`,
                    speciality: this.special.value,
                    insurances: `[${this.insure.value}]`,
                    education: edu.value,
                    // awards: award.value,
                    area_of_interest: ai.value
                },
                localStorage.getItem("cred")
            ).then((res) => {
                this.setState({ signuploader: false })
                if (res.code == 200) {
                    this.props.doctorsignupstep3();
                } else {
                    this.setState({ servererr: res.message })
                }
            })
        }
    }

    state = {
        value: [],
        langs: [],
        edu: "",
        award: "",
        ai: "",
        langerr: "",
        insurerr: "",
        splerr: "",
        servererr: "",
        signuploader: false
    }
    logChange = (value) => {
        this.setState({ value });
    }
    componentWillMount() {
        this.props.getLanguage();
        this.props.getInsurance();
        this.props.getSpecility();
    }

    render() {
        const { specialities, languages, insurance } = this.props;
        if (languages.length > 0) {
            var langs = []
            for (let lang of languages) {
                langs.push({ value: lang.id, label: lang.name })
            }
            if (this.state.langs.length == 0) {
                this.setState({ langs })
            }
        }
        return (
            <div className="modal-body">
                <div className="row">
                    <div className=" col-sm-12 col-md-12">
                        <h1 className="login_title">Sign Up</h1>
                        <div className="dol-md-3 stepr">
                            <h5 className="stopof">step 2 of 3</h5>
                            <span className="steperdiv steperdiv1"></span>
                            <span className="steperdiv"></span>
                            <span className="steperdiv"></span>

                            <div className="clearfix"></div>
                            <span></span>
                        </div>
                        <div className="form-signin" >

                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <Select
                                    multi
                                    value={this.state.value}
                                    placeholder="Select your Known Languages"
                                    options={this.state.langs}
                                    onChange={this.logChange} />

                                {this.state.langerr != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.langerr}</strong>
                                </div> : null}

                            </div>
                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <select className="form-control" ref={(input) => this.special = input} >
                                    <option value="">Select Specility</option>
                                    {(!specialities) ? null : specialities.map((spl) => {
                                        return <option key={spl.id} value={spl.id}>{spl.name}</option>
                                    })}
                                </select>
                                {this.state.splerr != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.splerr}</strong>
                                </div> : null}
                            </div>
                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" ref="edu" className="form-control" placeholder="Education" />
                                {this.state.edu != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.edu}</strong>
                                </div> : <div />}
                            </div>

                            {/*<div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" ref="award" className="form-control" placeholder="Awards" />
                                {this.state.award != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.award}</strong>
                                </div> : <div />}
                            </div>*/}
                            
                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" ref="ai" className="form-control" placeholder="Area Of Intrest" />
                                {/* <select className="form-control" ref={(input) => this.interest = input} >
                                    <option value="">Area Of Interest</option>
                                    <option value="english">English</option>
                                    <option value="hindi">Hindi</option>
                                </select> */}
                                {this.state.ai != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.ai}</strong>
                                </div> : <div />}
                            </div>

                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <select className="form-control" ref={(input) => this.insure = input} >
                                    <option value="">Select Insurance</option>
                                    {(!insurance) ? null : insurance.map((insr) => {
                                        return <option key={insr.id} value={insr.id}>{insr.name}</option>
                                    })}
                                </select>
                                {this.state.insurerr != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.insurerr}</strong>
                                </div> : <div />}
                                {this.state.servererr != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.servererr}</strong>
                                </div> : <div />}
                            </div>
                            <div style={{ clear: 'both' }}></div>
                            <div className="signup_button text-center">
                                <button onClick={this.submitstep2} className="btn btn-lg btn-primary btn-block login-button" type="submit">
                                    Next </button>
                            </div>
                            {/* <p className="text-center nonmember"> Already a Member?<Link to="/login">Login</ Link></p> */}
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

                </div>
            </div>
        );
    }
}

export default connect(
    store => ({
        languages: store.languages.langs,
        specialities: store.recievespecility.specialities,
        insurance: store.recieveinsurance.insurance
    }),
    actions
)(DoctorSignup2);
