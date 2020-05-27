import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker';
import * as actions from '../../actions/index'
import moment from 'moment';


class Appointment extends Component {
    state = {
        startDate: "",
        name: "",
        popup: false,
        user: {}
    }

    componentWillMount() {
        this.props.doctorappointmentrequest()
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    filterbyname = (e) => {
        this.setState({ name: e.target.value })
        // this.props.doctorappointmentrequest(e.target.value)

    }
    filter = () => {
        const date = document.getElementById("datepicker").value
        var aDate = moment(date, 'DD-MM-YYYY', true);
        var isValid = aDate.isValid();
        if (isValid) {
            this.props.doctorappointmentrequest(this.state.name, moment(this.state.startDate).format("YYYY-MM-DD"));
        } else {
            this.props.doctorappointmentrequest(this.state.name);
        }

    }
    accept = (item) => {
        // console.log("accept", item.appointment_id)
        this.props.appointmentstatuschange({ id: item.appointment_id, appointment_completed: 1 })
    }
    list = () => {
        return this.props.appoints.map((item, index) => {
            // console.log("item",item)
            // console.log("moment",moment(item.user.date).format('HH:mm A'))
            if (item.is_booked == 0) {
                return (
                    <div className="col-md-12 col-sm-12 col-xs-12  appointcontmain" >
                        <div className="col-md-4 col-sm-4 col-xs-12 patientsecmain">
                            <div className="col-md-2 col-sm-2 col-xs-4 patientimg">
                                <img src={item.photo} className="img-responsive" />
                            </div>
                            <div className="col-md-10 col-sm-10 col-xs-8 patienttxt">
                                <h4>Patient Name</h4>
                                <p onClick={() => { this.setState({ user: item, popup: true }) }}>Mr. {item.ufirst_name} {item.ulast_name}</p>
                            </div>
                        </div>

                        <div className="col-md-4 col-sm-4 col-xs-12 patientsecmain1">
                            <h4>Appointment For</h4>
                            <p>{item.name}</p>
                        </div>

                        <div className="col-md-4 col-sm-4 col-xs-12 patientsecmain1">
                            <h4>Date/ Time</h4>
                            <p>{moment(item.date_time).format('DD/MM/YYYY')} |  {moment(item.date_time).format('hh:mm A')}</p>

                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12" >
                            <button className="btn btn-success" style={{ float: "right" }} onClick={this.accept.bind(this, item)}>accept</button>
                            {/* <button className="btn btn-danger">reject</button> */}
                        </div>
                    </div>
                )
            }
        })
    }
    render() {

        return (
            <div className="col-md-9 col-sm-8 col-xs-12 aponireqst">
                <h3>Appointment Requests</h3>
                <div className="col-md-12 col-sm-12 col-xs-12 apoimtfiltrrqsr">
                    <h3>Filter Option</h3>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="col-md-4 col-sm-4 col-xs-12 appointreqstfrm">
                            <input type="text" onChange={this.filterbyname} placeholder="patient name" className="form-control frmapponiform" />
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12 appointreqstfrm">

                            <DatePicker
                                id="datepicker"
                                className="form-control date-picker frmapponiform"
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                dateFormat="DD-MM-YYYY"
                            />
                            {/* <input name="name" value="" placeholder="date of booking" type="calender" className="form-control date-picker frmapponiform" data-date-format="yyyy-mm-dd" /> */}
                            <div className="input-group-btn">
                                <button onClick={() => { document.getElementById('datepicker').click() }} className="btn btn-default" ><i className="fa fa-calendar"></i></button>
                            </div>
                        </div>


                        <div className="col-md-4 col-sm-4 col-xs-12 appointreqstfrm1 ">
                            <button onClick={this.filter} className="btn btn-filter">Filter Results</button>
                        </div>
                    </div>
                </div>
                {this.list()}
                {/* <!-- Modal popup --> */}
                <div className="modal" style={{ display: this.state.popup ? "block" : "none" }}>
                    <div className="modal-dialog modal-dialog1">

                        {/* <!-- Modal content--> */}
                        <div className="modal-content">

                            <div className="modal-body popupbody">
                                <button onClick={() => { this.setState({ popup: false }) }} type="button" className="close" data-dismiss="modal" style={{ fontsize: "32px", color: "#000" }}>&times;</button>

                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="col-md-4 col-sm-4 col-xs-4 popupimg">
                                        <img src={this.state.user.photo} className="img-responsive" />
                                    </div>

                                    <div className="col-md-8 col-sm-8 col-xs-8 popuptxt">
                                        <h4>Patient Name</h4>
                                        <p>Mr {this.state.user.ufirst_name} {this.state.user.ulast_name}</p>
                                        {/* <h4>Place</h4>
                                        <p>Jammu & Kashmir, India</p> */}
                                    </div>
                                </div>

                                <div className="col-md-6 col-sm-6 col-xs-12 mediclhis">
                                    <h4>Medical History</h4>
                                    <img src="/static/img/popimg1.png" className="img-responsive imgnomrgn" />
                                    <img src="/static/img/popimg2.png" className="img-responsive" />
                                    <img src="/static/img/popimg3.png" className="img-responsive" />
                                    <img src="/static/img/popimg4.png" className="img-responsive" />



                                </div>

                                <div className="col-md-12 col-sm-12 col-xs-12 popupmed">
                                    <h4>Medical History</h4>
                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                        <h4>Medicine Name</h4>
                                        <p>{this.state.user.medical_documents ? this.state.user.medical_documents.name_of_medicine : null}</p>
                                    </div>
                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                        <h4>Dose/ Strength</h4>
                                        <p>{this.state.user.medical_documents ? this.state.user.medical_documents.dose_strength : null}</p>

                                    </div>
                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                        <h4>How Often</h4>
                                        <p>{this.state.user.medical_documents ? this.state.user.medical_documents.how_often : null}</p>
                                    </div>
                                </div>



                                <div className="col-md-12 col-sm-12 col-xs-12 popupmed">
                                    <h4>Comments</h4>
                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                        <h4>Started On</h4>
                                        <p>{this.state.user.medical_documents ? this.state.user.medical_documents.started_on : null}</p>

                                    </div>
                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                        <h4>Stopped On</h4>
                                        <p>{this.state.user.medical_documents ? this.state.user.medical_documents.stopped_on : null}</p>
                                    </div>
                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                        <h4>Prescribed by</h4>
                                        <p>{this.state.user.medical_documents ? this.state.user.medical_documents.prescribed_by_doctor : null}</p>
                                    </div>
                                </div>



                                <div className="col-md-12 col-sm-12 col-xs-12 popupmed poptextftr">

                                    {/* <div className="col-md-8 col-sm-8 col-xs-12">
                                        <h4>Test Reports Storage/ Individual Medical Test Reports</h4>
                                        <p>1 to 2 yrs of reports</p>
                                    </div>

                                    <div className="col-md-4 col-sm-4 col-xs-12">
                                        <h4>Test Completion Date</h4>
                                        <p>30th Aug, 2017</p>
                                    </div> */}

                                </div>


                                <div className="col-md-12 col-sm-12 col-xs-12 popupmed">
                                    <h4>Images</h4>
                                    <div className="col-md-8 col-sm-8 col-xs-12">
                                        {this.state.user.medical_image ? this.state.user.medical_image.map((record) => {
                                            <img src="/static/img/popttximg.png" className="img-responsive" />
                                        }) : null}
                                    </div>
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
    appoints: store.doctorappointment.appoint
}),
    actions

)(Appointment);