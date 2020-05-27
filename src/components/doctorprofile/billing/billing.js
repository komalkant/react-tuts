import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker';
import * as actions from '../../../actions/index'
import moment from 'moment';


class Billing extends Component {
    state = {
        date: "",
        active: 0,
        name: ""
    }

    componentWillMount() {
        this.props.billinginfo({ date: "", name: "" })
    }
    list = () => {
        return this.props.bill.map((item, index) => {
            var pay = item.payment_date.split(" ")[0].split("-").reverse().join("-")
            return (
                <div>
                    <div className="col-md-12 col-sm-12 col-xs-12  appointcontmain billing">
                        <div className="col-md-4 col-sm-4 col-xs-12 patientsecmain billingtxt">
                            <div className="col-md-2 col-sm-2 col-xs-4 patientimg">
                                <img src={item.photo} className="img-responsive" />
                            </div>
                            <div className="col-md-10 col-sm-10 col-xs-8 patienttxt">
                                <h4>Patient Name</h4>
                                <p data-toggle="modal" data-target="#myModal12">Mr. {item.ufirst_name} {item.ulast_name}</p>

                                <h4 className="detail">Details</h4>
                                <p data-toggle="modal" data-target="#myModal12">{item.name}</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12 patientsecmain1 appointdate">
                            <h4>Appointment Date</h4>
                            <p>{moment(item.date_time).format("MMM Do YYYY")}</p>
                            <h4 className="detail">Payment Status</h4>
                            {item.transaction_response_code == 5001 ? <h5><i className="fa fa-check"></i> Paid ({moment(pay).format("MMM Do YYYY")})</h5> : <h5 style={{ color: "reds" }}><i className="fa fa-exclamation-circle"></i> Paid ({moment(pay).format("MMM Do YYYY")})</h5>}

                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12 patientsecmain1 appointdate">
                            <h4>Charges</h4>
                            <p><span className="fa fa-usd"></span>&nbsp;&nbsp;{item.transaction_amount}</p>
                        </div>
                    </div>
                </div>
            );
        });
    }

    // pagination = () => {
    // return this.props.bill.map((item, index) => {

    // })
    // }
    li = (i) => {
        // var date = moment(this.state.date).format('YYYY-MM-DD');
        this.props.billinginfo({ date: "", name: this.refs.name.value }, i);
        this.setState({ active: i })
    }

    searchbyname = (e) => {
        // console.log("date", date)
        this.props.billinginfo({ date: "", name: e.target.value });
    }
    handleChange = (date) => {
        // console.log("date", date)
        this.setState({
            date
        });
    }

    filterbilling = () => {

        const date = document.getElementById("datepicker").value
        var aDate = moment(date, 'DD-MM-YYYY', true);
        var isValid = aDate.isValid();
        if (isValid) {
            this.props.billinginfo({ date: moment(this.state.date).format('YYYY-MM-DD'), name: this.refs.name.value })
        } else {
            this.props.billinginfo({ date: "", name: this.refs.name.value })
        }

    }

    render() {
        const { total, perpage } = this.props;
        let rows = [];
        if (total != 0) {
            const pageno = Math.ceil(total / perpage);
            for (var i = 0; i < pageno; i++) {
                rows.push(<li className={`page-item`} onClick={this.li.bind(this, i + 1)}><a className="page-link" href="javascript:void(0)">{i + 1}</a></li>)
            }
        }
        return (
            <div className="col-md-9 col-sm-8 col-xs-12 aponireqst">
                <h3> Billings </h3>
                <div className="col-md-12 col-sm-12 col-xs-12 apoimtfiltrrqsr">
                    <h3>Filter Option</h3>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="col-md-4 col-sm-4 col-xs-12 appointreqstfrm">
                            <input ref="name" onChange={this.searchbyname} type="text" placeholder="patient name" className="form-control frmapponiform" />
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12 appointreqstfrm">
                            <DatePicker
                                id="datepicker"
                                className="form-control date-picker frmapponiform"
                                ref="datepicker"
                                selected={this.state.date}
                                onChange={this.handleChange}
                                dateFormat="DD-MM-YYYY"
                            />
                            <div className="input-group-btn">
                                <button onClick={() => { document.getElementById('datepicker').click() }} className="btn btn-default"><i className="fa fa-calendar"></i></button>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12 appointreqstfrm1 ">
                            <button onClick={this.filterbilling} className="btn btn-filter">Filter Results</button>
                        </div>
                    </div>
                </div>
                {this.list()}
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {rows}
                    </ul>
                </nav>
            </div>
        );
    }
}
export default connect(store => ({
    bill: store.billinginfo.bill,
    total: store.billinginfo.total,
    perpage: store.billinginfo.perpage
}),
    actions

)(Billing);