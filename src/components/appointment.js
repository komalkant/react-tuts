import React, { Component } from 'react'
import Header from './header'
import Footer from './footer'
import { Helmet } from "react-helmet";
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import moment from 'moment';
import BookingCalendar from './calender';
import queryString from 'query-string';
import $ from 'jquery'
let bookings1 = [
];
let bookings2 = [
];

class Appointment extends Component {
    state = {
        tab: "Scheduled",
        status: 0,
        date: "",
        time: ""
    }
    // componentWillUpdate(nextProps){
    //     $(function () {
    //         $(".booked-day").hover(function (a) {
    //               console.log("hover in",a)
    //         }, function () {
    //             //   console.log("hover out",a.target.value)
    //         });
    //   });
    // }
    cancel = (id) => {
        this.props.patientcancelappointment({ id })
    }
    componentWillMount() {
        const { getappointment, location: { pathname }, Paymentinfo, appointmentstatus } = this.props;
        let parse = queryString.parse(location.search)
        if (Object.keys(parse).length > 0) {
            Paymentinfo().then((res) => {
                // console.log("res", res);
                if (res.code == 200) {
                    this.setState({ status: res.data.transaction_response_code, date: moment(res.date_time).format('MMMM Do YYYY'), time: moment(res.date_time).format('HH:mm a') })
                    if (res.data.transaction_response_code == 5001) {
                        appointmentstatus({ id: res.appointement_id })
                    }
                }

            })
        }
        getappointment();
    }

    scheduleappointment = () => {
        const { appointments } = this.props;
        return appointments.map((appointment, index) => {
            if (appointment.is_booked == 1) {
                bookings1.push(moment(appointment.appointments_date, "YYYY-MM-DD"))
                return (
                    <tr>
                        <td>{appointment.appointments_date} ||  {moment(appointment.appointments_time, ["h:mm"]).format("hh:mm A")}</td>
                        <td>Dr. {appointment.doctors_first_name} {appointment.doctors_last_name},{appointment.hospital_name}, {appointment.hospital_address_line_1},
                        Appointment : {appointment.specialities_name}
                            {appointment.is_cancel == 1 ? <button type="button" style={{ padding: "0px", marginLeft: "10px" }} className="btn btn-danger" disabled>cancel</button> : <button type="button" style={{ padding: "0px", marginLeft: "10px" }} onClick={this.cancel.bind(this, appointment.appointment_id)} className="btn btn-danger" >cancel</button>}
                        </td>

                    </tr>
                )
            }

        })
    }

    completeappointment = () => {
        const { appointments } = this.props;
        return appointments.map((appointment, index) => {
            if (appointment.appointment_completed == 1) {
                bookings2.push(moment(appointment.appointments_date, "YYYY-MM-DD"))
                return (
                    <tr>
                        <td>{appointment.appointments_date} ||  {moment(appointment.appointments_time, ["h:mm"]).format("hh:mm A")}</td>
                        <td>Dr. {appointment.doctors_first_name} {appointment.doctors_last_name},{appointment.hospital_name}, {appointment.hospital_address_line_1}. Status : <span className="completed">Completed</span></td>
                    </tr>
                )
            }

        })
    }

    render() {
        return (<div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Appointment</title>
            </Helmet>
            <Header />
            <div className="breadcrumb">
                <div className="container">
                    <nav id="breadcrumb-trail">
                        <ol>
                            <li>
                                <Link to="/">
                                    <i className="fa fa-home" aria-hidden="true"></i> Home
                              </Link>
                            </li>
                            <li className="active">
                                <Link to="/appointment">Appointments</Link>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="content-box">
                {/* <!-- Work Section --> */}
                <section className="section section-description">
                    <div className="process">
                        <div className="container">
                            <div className="row">
                                {/* <h3 className="Appoint_title">Dr. Faizal Mirza</h3> */}
                                <div className="col-md-12 col-sm-12 col-xs-12 Appointment">
                                    <div className="col-sm-6 col-xs-12 text-right">
                                        <button type="button" onClick={() => { this.setState({ tab: "Scheduled" }) }} className={this.state.tab == "Scheduled" ? "doc-button selected" : "doc-button notselected"}>Scheduled Appointments</button>
                                    </div>
                                    <div className="col-sm-6 col-xs-12" >
                                        <button type="button" onClick={() => { this.setState({ tab: "Completed" }) }} className={this.state.tab == "Completed" ? "doc-button selected" : "doc-button notselected"}> Completed Appointments</button>
                                    </div>
                                </div>
                                {this.state.tab == "Scheduled" ? <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-md-5 col-sm-12 col-xs-12 no-padding">
                                        <BookingCalendar bookings={bookings1} />
                                    </div>
                                    {/* <!--sub col-md-4 end--> */}
                                    <div className="col-md-7 col-sm-12 col-xs-12 no-padding">
                                        <table className="table appointment_table">
                                            <thead className="thead-default">
                                                <tr>
                                                    <th width="38%">Date/Time</th>
                                                    <th width="62%">Appointment Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.scheduleappointment()}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <!--sub col-md-8 end--> */}
                                </div> : null}
                                {this.state.tab == "Completed" ? <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-md-5 col-sm-12 col-xs-12 no-padding">
                                        <BookingCalendar bookings={bookings2} />
                                    </div>
                                    {/* <!--sub col-md-4 end--> */}
                                    <div className="col-md-7 col-sm-12 col-xs-12 no-padding">
                                        <table className="table appointment_table">
                                            <thead className="thead-default">
                                                <tr>

                                                    <th width="38%">Date/Time</th>
                                                    <th width="62%">Appointment Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.completeappointment()}
                                            </tbody>
                                        </table>

                                    </div>
                                    {/* <!--sub col-md-8 end--> */}
                                </div> : null}
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- End Work Section --> */}
            </div>
            {/* <!-- Popup--> */}
            <div className="modal" style={{ display: this.state.status == 5001 ? "block" : "none" }}>
                <div className="modal-dialog booking-confirm">
                    {/* <!-- Modal content--> */}
                    <div className="modal-content model-box">
                        <div className="modal-body text-center">
                            <figure><img src="/static/img/pay.png" className="pay-icon" /></figure>
                            <p className="book-para"><b>
                                {this.state.status == 5001 ? <span className="booking-message">Your Booking has been confirmed on</span> : <span className="booking-message">Your Booking is not confirmed</span>}
                            </b> <br /><span className="color">{this.state.date}</span> at <span className="color">{this.state.time}.</span></p>
                            <p>You will receive a confirmation message on the<br /> mobile number that you have entered.</p>
                            <div className="footer-pay">
                                <a href="javascript:void(0)" onClick={() => { this.setState({ status: 0 }) }}>Okay</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Popup--> */}
            <Footer />
        </div >
        );
    }
}
export default connect(store => ({
    appointments: store.getappointment.appointments
}),
    actions

)(Appointment);