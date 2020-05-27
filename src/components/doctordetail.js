import React, { Component } from 'react'
import Header from './header'
import Footer from './footer'
import moment from 'moment';
import queryString from 'query-string';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import { Link } from 'react-router';
class DoctorDetail extends Component {
  componentWillMount() {
    let { location: { pathname } } = this.props;
    let parse = queryString.parse(location.search)
    this.props.getdoctorbyid(parse.doctor);

  }
  state = {
    adderror: "",
    doctorfeed: "",
    nursefeed: "",
    hospitalfeed: ""
  }
  loginurl = () => {
    // let { location: pathname } = this.props;
    console.log("window", window.location.href.split('://')[1].split('/')[1])
    localStorage.setItem("location", window.location.href.split('://')[1].split('/')[1]);
  }
  Bookappoinment(doctor_id, parse) {
    var date_time = parse.date + " " + parse.time
    var dateTime = moment(parse.date + ' ' + parse.time, 'YYYY-MM-DD HH:mm');
    this.props.bookappointment({ doctor_id, date_time: dateTime.format('YYYY-MM-DD HH:mm:ss') }).then(res => {
      if (res.code != 200) {
        this.setState({ content: res.message })
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
      } else {
        document.getElementById("cancel").click()
      }
    })
  }

  saveaddress = () => {
    console.log("refs", this.refs.address.value)
    if (this.refs.address.value.trim().length <= 0) {
      this.setState({ adderror: "address is required" });
    } else {
      this.setState({ adderror: "" }, () => {
        this.props.savebillingaddress({ address: this.refs.address.value })
        // this.refs.address.value = "";
      });
    }
  }
  snakebarpopup = () => {

  }

  feedbacksubmit = () => {
    let { location: { pathname } } = this.props;
    let parse = queryString.parse(location.search)

    var body = {
      doctor_id: parse.doctor,
      doctor: this.state.doctorfeed,
      nurse: this.state.nursefeed,
      hospital: this.state.hospitalfeed,
      comment: this.refs.feedback.value
    }
    this.props.savefeedback(body)
  }

  render() {
    let { doctor } = this.props;
    let { location: { pathname } } = this.props;
    let parse = queryString.parse(location.search)
    var time = moment(parse.time, ["h:mm"]).format("hh:mm A");
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Doctor Detail</title>
        </Helmet>
        <Header />
        <div className="breadcrumb">
          <div className="container">
            <nav id="breadcrumb-trail">
              <ol>
                <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
                <li><Link to="/doctorlist?specility=&locations=&insurance=">Doctors List</Link></li>

                <li className="active"> {doctor ? <Link to={`book?date=${parse.date}&doctor=${parse.doctor}&time=${parse.time}`}>Dr {doctor.first_name} {doctor.last_name}</Link> : null}</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="content-box">
          {/* <!-- Work Section --> */}
          <section className="section section-description">
            <div className="process">
              <div className="container">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="col-md-3 col-sm-12 col-xs-12 no-padding">
                    <div className="zoom-wrap">
                      {doctor ? <img alt="" className="img-responsive borderimg" src={doctor.photo} /> : null}
                      <div className="social-icons">
                        {doctor ?
                          <ul className="clean-list social-doc">
                            <li>
                              <a href={doctor.facebook}><i className="fa fa-facebook" aria-hidden="true"></i></a>
                            </li>
                            <li>
                              <a href={doctor.twitter}><i className="fa fa-twitter" aria-hidden="true"></i></a>
                            </li>
                            <li>
                              <a href={doctor.insta}><i className="fa fa-instagram" aria-hidden="true"></i></a>
                            </li>
                            <li>
                              <a href={doctor.whatsapp}><i className="fa fa-whatsapp"></i> </a>
                            </li>
                          </ul>
                          : null}
                      </div>
                    </div>
                  </div>
                  {/* <!--sub col-md-4 end--> */}
                  <div className="col-md-9 col-sm-12 col-xs-12 ">
                    <div className="col-md-6 col-sm-12 col-xs-12 no-padding">


                      {doctor ? <div className="doc-name">

                        <h3 className="doc-name">Dr {doctor.first_name} {doctor.last_name}</h3>
                        <ul className="docdetail">
                          <li><i className="fa fa-user-md" aria-hidden="true"></i></li>
                          <li>|</li>
                          <li>{doctor.education}&nbsp;{doctor.speciality}</li>
                        </ul>


                        <ul className="docdetail">
                          <li><i className="fa fa-map-marker" aria-hidden="true"></i></li>
                          <li>|</li>
                          {doctor ? <li>{doctor.address_line_1}</li> : null}
                        </ul>
                      </div> : null}


                    </div>
                    {doctor ?
                      <div className="col-md-6 col-sm-12 col-xs-12 no-padding">
                        <h3 className="dochour-price"><span>Charges</span><br />${doctor.consultation_fee}/Hour</h3>
                      </div>
                      : null}
                    {doctor ?
                      <div className="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <div className="desc-box">
                          <h3 className="doc-name">Description</h3>
                          <p>{doctor.description}</p>
                        </div>
                      </div>
                      : null}
                  </div>
                  {/* <!--sub col-md-8 end--> */}
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12 doctor-box">
                  <h3 className="doc-name">Educational Qualifications</h3>
                  <div className="col-md-8 col-sm-6 col-xs-12 no-padding">
                    <h5 className="edu-title">Educations</h5>
                    {doctor ? <div className="edu-detail">
                      <p>{doctor.education}</p>
                    </div> : null}

                  </div>
                  <div className="col-md-4 col-sm-6 col-xs-12 no-padding">
                    <h5 className="edu-title">Board Certifications</h5>
                    {doctor ?
                      <div className="edu-detail">
                        <p>{doctor.board_certification}</p>
                      </div>
                      : null}
                  </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="col-md-4 col-sm-4 col-xs-12 no-padding">
                    <h5 className="edu-title">Languages Know</h5>
                    {doctor ?
                      <div className="edu-detail">
                        <p>{doctor.languages}</p>
                      </div>
                      : null}
                  </div>
                  <div className="col-md-4 col-sm-4 col-xs-12 no-padding">
                    <h5 className="edu-title">Specialities</h5>

                    {doctor ? <div className="edu-detail">
                      <p>{doctor.speciality}</p>
                    </div> : null}
                  </div>
                  <div className="col-md-4 col-sm-4 col-xs-12 no-padding">
                    <h5 className="edu-title">Others</h5>
                    <div className="edu-detail">
                      <p>Kids Specialist</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="buttons">
                    {!this.props.authenticated ?
                      <button type="button" className="book_appointment doc-button" data-toggle="modal" data-target="#myModal2">Book Appointment</button>
                      : <button type="button" className="book_appointment doc-button" data-toggle="modal" data-target="#myModal1">Book Appointment</button>}
                    {!this.props.authenticated ?
                      <button type="button" className="book_appointment doc-button" data-toggle="modal" data-target="#myModal2" > Send a Message</button>
                      : <button type="button" className="book_appointment doc-button" data-toggle="modal" data-target="#myModal3" > Send a Message</button>
                    }
                    {/* send_message doc-button */}
                    {!this.props.authenticated ?
                      <button type="button" className="book_appointment doc-button" data-toggle="modal" data-target="#myModal2">Your Feedback</button>
                      : <button type="button" className="book_appointment doc-button" data-toggle="modal" data-target="#myModal4">Your Feedback</button>}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        {/*popup start */}
        {doctor ?
          <div className="modal fade in" id="myModal1" role="dialog" style={{ display: "none" }}>
            <div className="modal-dialog doctor_confirm">

              {/* <!-- Modal content--> */}
              <div className="modal-content model-box ">

                <div className="modal-body model-height">
                  <p className="forget-para text-center">Are You Sure Want to Book Appointment?</p>
                  <div className="ulockd-srv-icon pull-left">
                    {/* <img src="/static/img/doctor-1.jpg" className="img-responsive" alt="Doctor Name" /> */}
                    {doctor ? <img alt="" className="img-responsive" src={doctor.photo} /> : null}
                  </div>
                  <div className="popup-details">
                    <h3 className="docpopup-name">Doctor Name</h3>
                    <h3 className="doc-popup-title"> Dr. {doctor.first_name} {doctor.last_name}</h3>


                    <h3 className="docpopup-name">Speciality</h3>
                    <h3 className="doc-popup-title">{doctor.speciality}</h3>
                    <ul className="horizontal">
                      <li>
                        <h3 className="docpopup-name">Date</h3>
                        <h3 className="doc-popup-title">{parse.date}</h3></li>

                      <li>
                        <h3 className="docpopup-name">Time</h3>
                        <h3 className="doc-popup-title">{time}</h3>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-doctor">
                    <div className="col-md-12 col-sm-12 col-xs-12 no-padding">

                      <div className="col-sm-6 col-xs-12 no-padding text-left">
                        <button type="button" onClick={() => { this.Bookappoinment(doctor.doctor_id, parse) }} className="doc-button confirm">Confirm</button>
                      </div>

                      <div className="col-sm-6 col-xs-12 no-padding text-right">
                        <button type="button" id="cancel" className="doc-button make-changes" data-dismiss="modal">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
          : null}
        {/* sgtdyhfg */}
        {doctor ?
          <div className="modal fade in" id="myModal3" role="dialog" style={{ display: "none" }}>
            <div className="modal-dialog doctor_confirm">

              {/* <!-- Modal content--> */}
              <div className="modal-content model-box ">

                <div className="modal-body model-height">
                  <p className="forget-para text-center">Send Message To Doctor</p>

                  <div className="form-group">
                    <textarea type="" ref="message" cols="" className="TextStyleOuter" rows="4"> </textarea>
                  </div>
                  <div className="col-sm-6 col-xs-12 no-padding text-left">
                    <button type="button" className="doc-button confirm" onClick={() => {
                      if (this.refs.message.value.trim() != "") {
                        this.props.insertmessage({ id: doctor.doctor_id, message: this.refs.message.value }).then((res) => {
                          if (res.code == 200) {
                            this.refs.message.value = ""
                          }
                        })
                      }
                    }}>Send Message</button>
                  </div>
                  <div className="col-sm-6 col-xs-12 no-padding text-right">
                    <button type="button" onClick={() => { this.refs.message.value = "" }} className="doc-button make-changes" data-dismiss="modal">cancel</button>
                  </div>
                </div>

              </div>

            </div>
          </div>
          : null}

        {doctor ?
          <div className="modal fade in" id="myModal4" role="dialog" style={{ display: "none" }}>
            <div className="modal-dialog doctor_confirm feedbackHeight">

              {/* <!-- Modal content--> */}
              <div className="modal-content model-box ">

                <div className="modal-body model-height feedBack-modal">
                  <p className="forget-para text-center">Feedback Form</p>
                  <div className="form-group">
                    About doctor
                  </div>
                  <form id="smileys">
                    <input type="radio" onClick={() => { this.setState({ doctorfeed: "happy" }) }} name="smiley" value="happy" className="happy" />
                    <input type="radio" onClick={() => { this.setState({ doctorfeed: "neutral" }) }} name="smiley" value="neutral" className="neutral" />
                    <input type="radio" onClick={() => { this.setState({ doctorfeed: "sad" }) }} name="smiley" value="sad" className="sad" />
                  </form>
                  <div className="form-group">
                    About Nurse
                  </div>
                  <form id="smileys">
                    <input type="radio" onClick={() => { this.setState({ nursefeed: "happy" }) }} name="smiley" value="happy" className="happy" />
                    <input type="radio" onClick={() => { this.setState({ nursefeed: "neutral" }) }} name="smiley" value="neutral" className="neutral" />
                    <input type="radio" onClick={() => { this.setState({ nursefeed: "sad" }) }} name="smiley" value="sad" className="sad" />
                  </form>
                  <div className="form-group">
                    About Hospital
                  </div>
                  <form id="smileys">
                    <input type="radio" onClick={() => { this.setState({ hospitalfeed: "happy" }) }} name="smiley" value="happy" className="happy" />
                    <input type="radio" onClick={() => { this.setState({ hospitalfeed: "neutral" }) }} name="smiley" value="neutral" className="neutral" />
                    <input type="radio" onClick={() => { this.setState({ hospitalfeed: "sad" }) }} name="smiley" value="sad" className="sad" />
                  </form>

                  <div className="form-group">
                    <label>Comment:</label>
                    <textarea type="" ref="feedback" cols="" className="TextStyleOuter" rows="4"> </textarea>
                  </div>

                  <div className="col-sm-6 col-xs-12 no-padding text-left">
                    <button type="button" className="doc-button confirm" onClick={this.feedbacksubmit}>Submit</button>
                  </div>
                  <div className="col-sm-6 col-xs-12 no-padding text-right">
                    <button type="button" onClick={() => { this.refs.message.value = "" }} className="doc-button make-changes" data-dismiss="modal">cancel</button>
                  </div>
                </div>

              </div>

            </div>
          </div>
          : null}
        {/* hgfh */}
        <div className="modal fade in" id="myModal2" role="dialog" style={{ display: "none" }}>
          <div className="modal-dialog otp_confirm">

            {/* <!-- Modal content--> */}
            <div className="modal-content model-box ">

              <div className="modal-body otpmodel text-center">
                <figure><img src="/static/img/sinup-icon.png" className="pay-icon" /></figure>
                <p className="forget-para">You Need to Sign In First to Book Appointment</p>
                <div className="footer-pay">
                  <Link to="/login" onClick={this.loginurl}>Login Now</Link> || <Link to="/signup" onClick={this.loginurl}>Register</Link>
                </div>

              </div>

            </div>

          </div>
        </div>
        <div id="snackbar">{this.state.content}</div>
        {/*popup end  */}
      </div>
    )
  }
}
export default connect(store => ({
  doctor: store.doctorsbyid.doctor,
  authenticated: store.auth.authenticated,
  address: store.billingaddress.add
}),
  actions

)(DoctorDetail);