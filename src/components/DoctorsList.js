/////////////////////doctors list page/////////////////////////////
import React, { Component } from 'react'
import Header from './header'
import Footer from './footer'
import { Helmet } from "react-helmet";
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import { bindActionCreators } from 'redux'
import { browserHistory, Link } from 'react-router';
import $ from 'jquery'
import queryString from 'query-string';
import moment from 'moment';
import Slider from 'react-slick';
import ReactDom from 'react-dom';
import Map from './map'
class DoctorsList extends Component {

    componentWillMount() {
        let { location } = this.props;
        let parse = queryString.parse(location.search)
        this.props.getDoctorsList(parse)
        this.props.getLocation();
        this.props.getInsurance();

    }

    ///////////////////////////////
    state = {
        cd: {},
        pacakges: []
    }
    ///////////////////pagination click event///////////////////////////
    li = (page) => {
        let { location } = this.props;
        let parse = queryString.parse(location.search)
        parse.page = page
        parse.name = this.refs.name.value
        parse.clinic = this.refs.clinic.value;
        this.props.getDoctorsList(parse);
        this.props.EmptyTimeSlot([])
        window.scrollTo(0, 450)
    }
    ////////////////search doctors by name//////////////////////
    searchbyname = (e) => {
        // let { location } = this.props;
        // let parse = queryString.parse(location.search)
        // parse.name = e.target.value;
        // parse.clinic = this.refs.clinic.value;
        // this.props.EmptyTimeSlot([])
        // this.props.getDoctorsList(parse);
    }

    ///////////////search doctors by clinic////////////////////////
    searchbyclinic = (e) => {
        // let { location } = this.props;
        // let parse = queryString.parse(location.search)
        // parse.clinic = e.target.value;
        // parse.name = this.refs.name.value;
        // this.props.EmptyTimeSlot([])
        // this.props.getDoctorsList(parse);
    }

    //////////////search by location////////////////////

    handleChange = (event) => {
        let { location } = this.props;
        let parse = queryString.parse(location.search)
        // parse.locations = event.target.value;
        // parse.name = this.refs.name.value;
        // parse.clinic = this.refs.clinic.value;
        // this.props.EmptyTimeSlot([])
        browserHistory.push(`/doctorlist?specility=${parse.specility}&locations=${event.target.value}&insurance=${parse.insurance}`)
        // this.props.getDoctorsList(parse);
    }
    searchlist = () => {
        let { location } = this.props;
        let parse = queryString.parse(location.search)
        parse.name = this.refs.name.value.trim();
        parse.clinic = this.refs.clinic.value.trim()
        this.props.EmptyTimeSlot([]);
        this.props.getDoctorsList(parse);

    }

    getmoredata = (id) => {
        this.setState({ [id]: true })
    }
    ///////////////render doctors time slot//////////////////
    doctorsavailibility = (dr) => {
        const { slot } = this.props;
        if (slot.length == 0) {
            return <div className="get-time-slot text-center">fetching time slot</div>
        } else {
            var filterdata = slot.filter((sl) => {
                return sl.doctor.doctor_id == dr.doctor_id
            })

            let dates = [];
            let time = [];
            if (filterdata.length > 0) {
                if (!this.state.cd[`${filterdata[0].doctor.doctor_id}`]) {
                    Object.assign(this.state.cd, { [`${filterdata[0].doctor.doctor_id}`]: 4 });
                }


                for (var key in filterdata[0].doctor.dates) {
                    //  var date = moment(key);
                    //  var days = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
                    //  var dow = date.day();
                    // console.log("dates", filterdata[0].doctor.dates)

                    // if (filterdata[0].doctor.dates[key].length > 0) {
                    if (this.state[dr.doctor_id]) {
                        dates.push(<div>
                            <h3 className="heading"> <p className="date">{key}</p></h3>
                            <div className="col-sm-12 col-md-12">
                                <ul className="doctime docmargin-left">
                                    {
                                        filterdata[0].doctor.dates[key].map((val, index) => {
                                            if (val.available) {
                                                return <li><div className="time-box"><Link to={`book?date=${key}&doctor=${filterdata[0].doctor.doctor_id}&time=${val.time24}`} >{val.time24}</Link></div></li>
                                            }

                                        })
                                    }
                                </ul>
                            </div>
                        </div>)
                    } else {
                        dates.push(<div>
                            <h3 className="heading"> <p className="date">{key}</p></h3>
                            <div className="col-sm-12 col-md-12">
                                <ul className="doctime docmargin-left">
                                    {
                                        filterdata[0].doctor.dates[key].map((val, index) => {
                                            if (index < 3) {
                                                if (val.available) {
                                                    return <li><div className="time-box"><Link to={`book?date=${key}&doctor=${filterdata[0].doctor.doctor_id}&time=${val.time24}`} >{val.time24}</Link></div></li>
                                                }
                                            } else if (index == 3) {
                                                return <li><div className="time-box " style={{ backgroundColor: "#65cedd" }}><a onClick={this.getmoredata.bind(this, dr.doctor_id)} href="javascript:void(0);">More</a></div></li>
                                            }
                                        })

                                    }

                                </ul>
                            </div>
                        </div>)
                    }

                    // }

                }
            }
            const { getTimeSlot } = this.props;
            let setState = this.setState.bind(this);
            let state = this.state;

            var settings = {
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
                // rtl: true,
                infinite: false,
                focusOnSelect: false,
                beforeChange: function (leftArrow, rightArrow) {
                    if (rightArrow > leftArrow) {
                        let data = moment().add(state.cd[`${filterdata[0].doctor.doctor_id}`], "day").format("YYYY-MM-DD");
                        state.cd[`${filterdata[0].doctor.doctor_id}`]++;
                        getTimeSlot({ doctor_id: [filterdata[0].doctor.doctor_id], dates: [data] }).then((res) => {
                            //  console.log("res", res[0].doctor.dates[data]) 
                        });

                    }
                }
            };
            return (<div className="padding">
                <div className="main">
                    <Slider {...settings}>
                        {dates}
                    </Slider>
                </div>
            </div>);
        }
    }
    //////////////// render doctors list/////////////////////////
    renderdoctorslist = () => {
        const { doctors } = this.props;


        return doctors.data.map((doctor, index) => {
            return (
                <div className="col-sm-6 col-md-6 ulockd-srvc-column">
                    <div className="doctor-column" key={doctor.id}>
                        <div className="col-md-4"><img src={doctor.photo} className="img-responsive" alt="Doctor Name" /></div>
                        <div className="col-md-8">
                            <h3 className="doc-title">Dr. {doctor.first_name} {doctor.last_name}</h3>
                            <ul className="docdetail">
                                <li><i className="fa fa-user-md" aria-hidden="true"></i></li>
                                <li>|</li>
                                <li>{doctor.education}</li>
                            </ul>
                            <ul className="docdetail">
                                <li><i className="fa fa-map-marker" aria-hidden="true"></i></li>
                                <li>|</li>
                                <li>{doctor.name}</li>
                            </ul>
                            <h3 className="doc-title doccharge">Charges</h3>
                            <h3 className="hour-price">${doctor.consultation_fee}/Hour</h3>
                            {/*<input type="button" className="book_appointment" value="Book Appointment" />*/}
                        </div>
                        <div className="col-sm-12 col-md-12 no-padding">
                            <h3 className="doc-available text-center">Doctor’s Availability</h3>
                            {this.doctorsavailibility(doctor)}
                        </div>
                    </div>
                </div>
            );
        });

    }
    ///////////////////render complete component///////////////////////
    render() {
        const { doctors, cities, insurance } = this.props;
        let rows = [];
        if (doctors.total) {
            const pageno = Math.ceil(doctors.total / 4);
            for (var i = 0; i < pageno; i++) {
                rows.push(<li className="page-item" onClick={this.li.bind(this, i + 1)}><a className="page-link" href="JavaScript:void(0);">{i + 1}</a></li>);
            }
        }
        if (insurance.length > 0) {
            let { location } = this.props;
            let parse = queryString.parse(location.search)
            if (Number(parse.insurance) > 0) {
                var pacakges = insurance.filter(res => res.insurance_id == parse.insurance)[0].insurance_plan;
                // console.log("pacakge", pacakges)
                if (this.state.pacakges != pacakges) {
                    this.setState({ pacakges })
                }
            }

        }
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Doctor’s List</title>
                </Helmet>
                <Header />
                <div className="breadcrumb">
                    <div className="container">
                        <nav id="breadcrumb-trail">
                            <ol>
                                <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i>Home</Link></li>
                                <li className="active"><a href="">Doctor's List</a></li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/*<!-- Main Content -->*/}
                <div className="content-box">
                    {/*<!-- Hero Section -->*/}
                    <section className="section section-doclist">
                        {/* <div ref="googleMap" style={{ width: "100%", height: "400px" }}></div> */}
                        <div className="container" style={{ width: '100%', height: '471px', position: "relative" }}>
                            <Map />
                        </div>
                        {/*<!-- Statistics Box -->*/}
                        <div className="container doctor-listbox ">
                            <div className="statistics-box" style={{ position: "absolute" }}>
                                <div className="statistics-item">
                                    <div className="form-style-8">

                                        <form>
                                            <h1 className="filter_by"><i className="fa fa-filter" aria-hidden="true"></i>Filter By</h1>
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <div className="col-sm-6 col-md-2 col-lg-2">
                                                    <input type="text" className="soflow1" ref="name" onChange={this.searchbyname} placeholder="Doctor Name" />
                                                </div>
                                                <div className="col-sm-6 col-md-3 col-lg-3">
                                                    <select id="soflow" className="soflow1" ref={(input) => this.pack = input}>
                                                        <option value="location">Package Name</option>
                                                        {this.state.pacakges.map((pacakge) => {
                                                            return <option key={pacakge.plan_id} value={pacakge.plan_id}>{pacakge.plan}</option>
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="col-sm-6 col-md-3 col-lg-3">
                                                    <input type="text" className="soflow1" ref="clinic" onChange={this.searchbyclinic} placeholder="Clinic Name" />
                                                </div>
                                                <div className="col-sm-6 col-md-3 col-lg-3">
                                                    <select onChange={this.handleChange} className="soflow1" id="soflow" ref={(input) => this.locat = input} >
                                                        <option value="">Select Location</option>
                                                        {(!cities) ? null : cities.map((city) => {
                                                            return <option key={city.id} value={city.id}>{city.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="col-sm-12 col-md-1 col-lg-1">
                                                    <input type="button" onClick={this.searchlist} className="docdetailgo" value="GO" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*<!-- Work Section -->*/}
                    <section className="section section-destination">
                        {/*<!-- Title -->*/}
                        <div className="section-title">
                            <div className="container">
                                <h2 className="title">Doctor's <span className="color">List</span></h2>
                            </div>
                        </div>
                        <div className="process doclist">
                            <div className="container">
                                {this.renderdoctorslist()}
                                <div className="text-center paginationWrapper">
                                    <ul className="pagination  page-navigation text-center">
                                        {rows}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </section>
                    {/*<!-- End Work Section -->*/}
                </div>
                <Footer />

            </div>
        );
    }
}

export default connect(store => ({
    doctors: store.doctorslist.doctors,
    cities: store.recievelocation.cities,
    slot: store.doctorstimeslot.slot,
    insurance: store.recieveinsurance.insurance

}),
    actions

)(DoctorsList);