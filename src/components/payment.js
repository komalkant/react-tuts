import React, { Component } from 'react'
import Header from './header'
import Footer from './footer'
import { Helmet } from "react-helmet";
import { connect } from 'react-redux'
import queryString from 'query-string';
import moment from 'moment';
import * as actions from '../actions/index'
import DatePicker from 'react-datepicker';

const field = [
    { label: "Card Number", ref: "cn" },
    { label: "Card Holder Name", ref: "chn" }
]

class Payment extends Component {
    state = {
        status: 0,
        time: "",
        adderror: "",
        cn: "",
        icn: "",
        chn: "",
        il: "",
        datepick: "",
        dateformat: "",
        insurance: false,
        popup: false,
        insurelist: []
    }
    componentDidMount() {
        this.props.getInsurance();
        let { location: { pathname } } = this.props;
        let parse = queryString.parse(location.search)
        if (parse.doctor) {
            this.props.getdoctorinsuranceforpatient({ id: parse.doctor }).then((res) => {
                this.setState({ insurelist: res.data });
                this.props.getpatientinsurance().then((res) => {
                    if (res.code == 200) {
                        let { chn, il, cn, mdate } = this.refs;
                        let { insure } = this;
                        chn.value = res.message.card_holder_name;
                        insure.value = Number(res.message.insurance_company_name);
                        il.value = res.message.insurance_level;
                        cn.value = res.message.card_number;
                        // console.log(moment(res.message.expiry_date))
                        // mdate.value = res.message.expiry_date
                        // this.setState({ datepick: moment(res.message.expiry_date) })
                        // this.setState({ insurance: true })
                    }
                });
            })
        }

    }

    makepay = () => {
        let { location: { pathname } } = this.props;
        let parse = queryString.parse(location.search)
        if (parse.doctor && parse.appoint) {
            this.props.payment({ doctor_id: parse.doctor, appointment_id: parse.appoint })
        }

    }
    requireval = (a, b) => {
        if (b) {
            if (a.value.trim().length <= 0) {
                this.setState({ [b]: "required" })
            } else {
                this.setState({ [b]: "" })
            }
        }
        return a.value.trim().length <= 0
    }

    savebilling = () => {
        const address = this.refs.billing.value;
        if (address.trim().length <= 0) {
            this.setState({ adderror: "address is required" });
        } else {
            this.setState({ adderror: "" }, () => {
                this.props.savebillingaddress({ address: address })
            });
        }
    }

    numbval = (a, b) => {
        if (b) {
            if (isNaN(a.value.trim())) {
                this.setState({ [b]: "Invalid Number" })
            } else if (a.value.trim().length == 0) {
                this.setState({ [b]: "required" })
            } else {
                this.setState({ [b]: "" })
            }
        }
        return isNaN(a.value.trim())
    }

    paybyinsurance = () => {
        const { chn, il, cn } = this.refs;
        const { requireval, dateval, numbval, insure } = this;
        requireval(insure, "icn");
        requireval(chn, "chn");
        numbval(cn, "cn");
        dateval()
        requireval(il, "il");

        if (requireval(insure)) { } else if (requireval(chn)) { }
        else if (numbval(cn)) { } else if (requireval(cn)) { }
        else if (requireval(il)) { }
        else if (dateval()) { } else {
            // console.log("date", moment(this.state.datepick).format('DD/MM/YYYY'))
            let { location: { pathname } } = this.props;
            let parse = queryString.parse(location.search);
            if (parse.appoint) {
                var body = {
                    insurance_company_name: insure.value,
                    card_number: cn.value,
                    card_holder_name: chn.value,
                    expiry_date: moment(this.state.datepick).format('DD/MM/YYYY'),
                    insurance_level: il.value,
                    appointment_id: parse.appoint
                }
                this.props.Saveinsurance(body).then((res) => {
                    // insure.value = "";
                    // chn.value = "";
                    // cn.value = "";
                    // il.value = "";
                    if (res.code != 200) {
                        this.setState({ message: res.message });
                        var x = document.getElementById("snackbar")
                        x.className = "show";
                        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                    } else {
                        this.setState({ popup: true, date: moment(res.data.date_time).format('MMMM Do YYYY'), time: moment(res.data.date_time).format('HH:mm a') })
                    }

                    // code karna h
                })
            }

        }

    }

    dateval = () => {
        const date = document.getElementById("datepicker").value
        var aDate = moment(date, 'MM/DD/YYYY', true);
        var isValid = aDate.isValid();
        if (!isValid) {
            this.setState({ dateformat: "please enter a valid date" })
        } else {
            this.setState({ dateformat: "" })
        }
        return !isValid
    }

    handleChange = (datepick) => {
        this.setState({
            datepick
        });
    }

    cleardata = () => {
        const { chn, il, cn } = this.refs;
        const { insure } = this;
        insure.value = "";
        chn.value = "";
        il.value = "";
        cn.value = "";
        this.setState({ datepick: "" })
    }
    insurancecarddetail = () => {
        // const { insurance } = this.props;
        return (
            <div className="tab-pane" id="2">
                <h3 className="doc-name" style={{ fontSize: "24px" }}>Enter Description Below:</h3>
                <div className=" col-sm-12 col-md-12 no-padding">

                    <form className="form-signin" style={{ padding: "0px" }}>
                        <div className="form-group col-xs-12 col-sm-3 col-md-3 col-lg-3 ">
                            <select className="form-control" ref={(input) => this.insure = input} >
                                <option value="">Select Insurance </option>
                                {(!this.state.insurelist) ? null : this.state.insurelist.map((insr) => {
                                    return <option key={insr.insurance_id} value={insr.insurance_id}>{insr.name}</option>
                                })}
                            </select>
                            {this.state.icn != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                <strong>{this.state.icn}</strong>
                            </div> : null}
                        </div>



                        {field.map((input, index) => {
                            return (
                                <div className="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                    <input ref={input.ref} className="form-control" type="text" placeholder={`${input.label}`} />
                                    {this.state[input.ref] != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                        <strong>{this.state[input.ref]}</strong>
                                    </div> : null}

                                </div>
                            )
                        })}


                        <div className="form-group col-xs-12 col-sm-3 col-md-3 col-lg-3 ">
                            <DatePicker
                                id="datepicker"
                                className="form-control"
                                placeholderText="Expiry Date"
                                minDate={moment()}
                                selected={this.state.datepick}
                                onChange={this.handleChange}
                            />
                            {this.state.dateformat != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                <strong>{this.state.dateformat}</strong>
                            </div> : null}
                        </div>
                        <div className="form-group col-xs-12 col-sm-3 col-md-3 col-lg-3 ">
                            <input type="text" className="form-control" ref="il" placeholder="Insurance Level" required="" />
                            {this.state.il != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                <strong>{this.state.il}</strong>
                            </div> : null}
                        </div>

                    </form>

                </div>

                <div className="buttons">
                    <button type="button" onClick={this.paybyinsurance} className="book_appointment doc-button" data-toggle="modal" data-target="#myModal">Book Appointment</button>
                    <button type="button" onClick={this.cleardata} className="send_message doc-button">Clear</button>
                </div>
            </div>
        )
    }
    savedetail = () => {
        return (
            <div className="tab-pane" id="2">
            </div>
        )
    }
    popup = () => {
        return (<div className="modal" style={{ display: this.state.popup ? "block" : "none" }}>
            <div className="modal-dialog booking-confirm">
                {/* <!-- Modal content--> */}
                <div className="modal-content model-box">
                    <div className="modal-body text-center">
                        <figure><img src="/static/img/pay.png" className="pay-icon" /></figure>
                        <p className="book-para">
                            <b>
                                <span className="booking-message">Your Booking has been confirmed on</span>
                            </b>
                            <br />
                            <span className="color">{this.state.date}</span> at <span className="color">{this.state.time}.</span></p>

                        {/* <p>You will receive a confirmation message on the<br /> mobile number that you have entered.</p> */}
                        <div className="footer-pay">
                            <a href="javascript:void(0)" onClick={() => { this.setState({ popup: false }) }}>Okay</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }

    render() {

        return (
            <div>
                <Header />
                <div className="content-box">
                    {/* <!-- Work Section --> */}
                    <section className="section section-description">
                        <div className="process">
                            <div className="container">
                                <div className="row">
                                    <div className="section-title">
                                        <h2 className="title">Make <span className="color">Payment</span></h2>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 Appointment">
                                        <div id="tabby">
                                            <ul className="nav nav-tabs text-center">
                                                <li className="tab nonactive active" id="online">
                                                    <a href="#1" data-toggle="tab" aria-expanded="true"> <span className="listicon">
                                                        <figure className="active-image"><img src="/static/img/online-hover.png" id="image-1" />
                                                        </figure><figure className="noactive"><img src="/static/img/online.png" id="image-2" /></figure>
                                                    </span>Pay Online</a>

                                                </li>
                                                <li className="tab nonactive text-right"><a href="#2" data-toggle="tab" aria-expanded="false"><span className="listicon">
                                                    <figure className="other-image"><img src="/static/img/insurance-card.png" id="image-2" />
                                                    </figure>
                                                    <figure className="activeimg"><img src="/static/img/insurance-card-hover.png" id="image-2" /></figure>
                                                </span>Insurance Card</a>

                                                </li>
                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="1">
                                                    {this.props.address ? <h3 className="doc-name" style={{ fontSize: "24px" }}>Enter Description Below:</h3> : null}
                                                    {this.props.address ?
                                                        <div className=" col-sm-12 col-md-12 no-padding">
                                                            <form className="form-signin" style={{ padding: "0px" }}>
                                                                <div className="form-group col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                                                                    <input type="textarea" ref="billing" className="form-control" placeholder="Billing Address" required="" autofocus="" />
                                                                    {this.state.adderror != "" ? <div className="alert alert-danger">
                                                                        <strong>Oops!&nbsp;</strong>{this.state.adderror}
                                                                    </div> : null}
                                                                </div>
                                                                <div className="form-group col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                                                                    <button type="button" className="btn btn-info" onClick={this.savebilling}>Save</button>
                                                                </div>

                                                            </form>

                                                        </div>
                                                        :
                                                        <div className="buttons">
                                                            <button type="button" className="btn btn-warning" onClick={this.makepay}>Make Payment</button>
                                                        </div>}
                                                </div>

                                                {/* <!--/row--> */}
                                                {!this.state.insurance ? this.insurancecarddetail() : this.savedetail()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section></div>
                {this.popup()}
                <div id="snackbar">{this.state.message}</div>
                <Footer />
            </div >
        )
    }
}
export default connect(
    store => ({
        address: store.billingaddress.add,
        insurance: store.recieveinsurance.insurance
    }),
    actions
)(Payment);