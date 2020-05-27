import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions/index'
import { Link } from 'react-router'

class Insurance extends Component {
    state = {

    }
    componentWillMount() {
        this.props.getInsurance();
        this.props.getdoctorinsurance();
        this.props.resetcheck()
    }
    addcheck = (plan_id, event) => {
        if (event.target.checked) {
            this.props.insuranceaddcheck(plan_id);
        } else {
            this.props.removecheckbyindex(plan_id)
        }


    }

    deletecheck = (plan_id, event) => {
        if (event.target.checked) {
            this.props.deleteinsuranceaddcheck(plan_id);
        } else {
            this.props.deleteremovecheckbyindex(plan_id)
        }
    }
    saveinsurance = () => {
        let planids = []
        const { saveval } = this.props;
        saveval.map(plan => planids.push(plan.plan_id))

        if (planids.length > 0) {
            var body = { insurance_id: planids }
            this.props.savedoctorinsurance(body).then((res) => {
                if (res.code == 200) {
                    this.props.resetcheck();
                    this.props.getdoctorinsurance();
                    var checks = document.querySelectorAll('#checkbx input[type="checkbox"]');
                    for (var i = 0; i < checks.length; i++) {
                        var check = checks[i];
                        check.checked = false;
                    }

                }
                this.setState({ content: res.message })
                var x = document.getElementById("snackbar")
                x.className = "show";
                setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
            })
        }

    }
    deleteinsurance = () => {
        let deleteplanids = []
        const { deleteval } = this.props;
        deleteval.map(plan => deleteplanids.push(plan.plan_id))

        if (deleteplanids.length > 0) {
            var body = { insurance_id: deleteplanids }
            this.props.deletedoctorinsurance(body).then((res) => {
                this.props.resetcheck();
                this.props.getdoctorinsurance();
                var checks = document.querySelectorAll('#checkbx input[type="checkbox"]');
                for (var i = 0; i < checks.length; i++) {
                    var check = checks[i];
                    check.checked = false;
                }
            })


        }
    }

    addnew = () => {
        if (this.refs.new.value.trim().length > 0) {
            var body = {
                name: this.refs.new.value.trim()
            }
            this.props.add_insurance(body).then((res) => {
                console.log("res", res)
            })
        }

    }

    getallinsurance = () => {
        return this.props.allinsurance.map((ins, index) => {

            return (
                <div className="panel panel-default" key={index}>
                    <div className="panel-heading" role="tab" id="headingOne">
                        <h4 className="panel-title panelcheck">
                            <a role="button" data-toggle="collapse" data-parent="#accordion" href={`#collapseOne${index}`} aria-expanded="true" aria-controls="collapseOne">
                                <i className="more-less glyphicon glyphicon-plus"></i>
                                {/* <i className="fa fa-check-square-o checkbx" aria-hidden="true"></i> */}
                                {ins.name}
                            </a>
                        </h4>
                    </div>
                    <div id={`collapseOne${index}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                        <div className="panel-body">
                            <ul className="plangold">
                                {ins.insurance_plan ? ins.insurance_plan.map((insure) => {
                                    return (
                                        <li>
                                            <input id="checkbx" onClick={this.addcheck.bind(this, insure.plan_id)} type="checkbox" />
                                            {insure.plan}
                                        </li>
                                    )
                                }) : null}

                            </ul>
                        </div>
                    </div>
                </div>
            )
        })

    }


    getselectinsurance = () => {
        return this.props.doctorinsurace.map((insure, index) => {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                        <h4 className="panel-title panelcheck">
                            <a role="button" data-toggle="collapse" data-parent="#accordion" href={`#collapseOned${index}`} aria-expanded="true" aria-controls="collapseOne">
                                <i className="more-less glyphicon glyphicon-plus"></i>
                                {/* <i className="fa fa-check-square-o checkbx" aria-hidden="true"></i> */}
                                {insure.name}
                            </a>
                        </h4>
                    </div>
                    <div id={`collapseOned${index}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                        <div className="panel-body">
                            <ul className="plangold">
                                {insure.insurance_plan ? insure.insurance_plan.map((ins) => {
                                    return (
                                        <li>
                                            <input id="checkbx" onClick={this.deletecheck.bind(this, ins.plan_id)} type="checkbox" />
                                            {ins.plan}
                                        </li>
                                    )
                                }) : null}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        })


    }
    render() {
        return (
            <div className="col-md-9 col-sm-8 col-xs-12 aponireqst insurance">
                <h3>Insurance Companies</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.</p>

                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    {this.getallinsurance()}

                </div>
                <button type="button" className="btn btn-success Previoustim" onClick={this.saveinsurance}>Save</button>
                {/* <!-- panel-group --> */}

                <h4 className="headfr">Insurance Companies Summary</h4>
                <div className="panel-group" id="accordion1" role="tablist" aria-multiselectable="true">
                    {this.getselectinsurance()}
                </div>
                <button type="button" className="btn btn-danger Previoustim" onClick={this.deleteinsurance}>Delete</button>

                <h4 className="headfr">Are we missing any of your plans</h4>
                <p>If we are missing any of your carriers or plans, please let us know</p>
                <div className="form-group instplan">
                    <label className="col-sm-2">
                        Carrier Name
                </label>
                    <div className="col-sm-6">
                        <input type="text" ref="new" className="form-control" placeholder="Company A" />
                    </div>
                </div>

                <div className="clearfix"></div>
                <br />

                <div className="clearfix"></div>
                <br />
                <div className="col-sm-8 sbmticudiv">
                    <input type="submit" onClick={this.addnew} value="SUBMIT" className="form-control sbmticu" />
                </div>
                <div id="snackbar">{this.state.content}</div>
            </div>
        );
    }
}

export default connect(store => ({
    allinsurance: store.recieveinsurance.insurance,
    saveval: store.addinsurancecheck,
    deleteval: store.deleteinsurancecheck,
    doctorinsurace: store.doctorinsurace
}),
    actions

)(Insurance);