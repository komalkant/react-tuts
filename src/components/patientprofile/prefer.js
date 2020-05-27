import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actions from '../../actions/index'

class Prefer extends Component {
    state = {
        content: ""
    }
    componentWillMount() {
        this.props.getInsurance();
        this.props.getLanguage();
    }
    submitdetail = () => {
        console.log("ins", this.insure.value);
        console.log("lang", this.lang.value)
        this.props.patient_insurance({ insurance_id: this.insure.value, lang: this.lang.value }).then((res) => {
            this.setState({ content: res.message });
            var x = document.getElementById("snackbar")
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        })
    }

    render() {
        return (
            <div className="user-panel pro-doc col-md-8 col-sm-8 setting-page ui-tabs-panel ui-widget-content ui-corner-bottom aponireqst" id="htlfndr-user-tab-5" aria-labelledby="ui-id-5" role="tabpanel" aria-hidden="true" >
                <h3>Preferences</h3>
                <hr />
                <div >
                    <div className="row">
                        <div className="col-12">
                            <label style={{ color: "#ca7152" }}>Preferred Insurance</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <select className="clsmargin" ref={(input) => this.insure = input} >
                                <option value="">None</option>
                                {(!this.props.insurance) ? null : this.props.insurance.map((insr, index) => {
                                    return <option key={index} value={insr.id}>{insr.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label style={{ color: "#ca7152" }}>Preferred Language</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {/*languages*/}
                            <select className="clsmargin" ref={(input) => this.lang = input} >
                                <option value="">None</option>
                                {(!this.props.languages) ? null : this.props.languages.map((lang, index) => {
                                    return <option key={index} value={lang.id}>{lang.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button type="button" onClick={this.submitdetail} style={{ marginTop: '31px' }} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
                <div id="snackbar">{this.state.content}</div>
            </div>

        )
    }
}
export default connect(store => ({
    insurance: store.recieveinsurance.insurance,
    languages: store.languages.langs
}),
    actions

)(Prefer);