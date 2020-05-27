import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../actions'
// import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Map from './map'

class DoctorSignup3 extends Component {

    componentWillMount() {
        this.props.getallcountry();
    }

    // searchlocation = () => {

    //     geocodeByAddress(this.refs.location.value)
    //         .then(results => getLatLng(results[0]))
    //         .then(latLng => this.props.findlatlong([latLng]))
    //         .catch(error => console.error('Error', error))
    // }


    submitstep3 = async () => {
        const { clinicname, adline1, adline2, postal, lat, long } = this.refs;
        const reg = /^(?=.)-?((8[0-5]?)|([0-7]?[0-9]))?(?:\.[0-9]{1,20})?$/;
        // if (clinicname.value.trim().length == 0) { this.setState({ clname: "required" }) } else { this.setState({ clname: "" }) }
        // if (adline1.value.trim().length == 0) { this.setState({ addline1: "required" }) } else { this.setState({ addline1: "" }) }
        // if (adline2.value.trim().length == 0) { this.setState({ addline2: "required" }) } else { this.setState({ addline2: "" }) }
        if (postal.value.trim().length == 0) { this.setState({ postalerr: "required" }) } else { this.setState({ postalerr: "" }) }
        // if (lat.value.trim().length == 0) { this.setState({ laterr: "required" }) } else if (reg.test(lat.value)) { this.setState({ laterr: "please provide a valid latitude" }) } else { this.setState({ laterr: "" }) }
        // if (long.value.trim().length == 0) { this.setState({ longerr: "required" }) } else if (reg.test(long.value)) { this.setState({ longerr: "please provide a valid longitude" }) } else { this.setState({ longerr: "" }) }
        if (this.country.value == "") { this.setState({ countryerr: "please select a country" }) } else { this.setState({ countryerr: "" }) }
        if (this.city.value == "") { this.setState({ cityerr: "please select a city" }) } else { this.setState({ cityerr: "" }) }
        let clinic = true
        await this.props.cord.map((res) => {
            if (res.clinicname) {
                if (res.clinicname.trim().length == 0) {
                    clinic = false;
                    // this.setState({ clinic: false })
                }

            } else {
                clinic = false;
                // this.setState({ clinic: false })
            }
        })

        // if (clinicname.value.trim().length == 0) { }else
        // if (adline1.value.trim().length == 0 && this.state.addline1 != "") { }
        // else if (adline2.value.trim().length == 0 && this.state.addline2 != "") { }
        // else if (reg.test(lat.value)) { }
        // else if (reg.test(long.value)) { } else
        if (this.country.value == "") { } else
            if (!clinic) {
                this.setState({ content: "Please Enter your clinic name against location." })
                var x = document.getElementById("snackbar")
                x.className = "show";
                setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
            } else
                if (postal.value.trim().length == 0) { }
                else if (this.city.value == "") {
                } else {
                    this.setState({ userloader: true })
                    this.props.postsignupstep3(
                        {
                            // clinic_name: clinicname.value,
                            // address: adline1.value,
                            // area_name: adline2.value,
                            postal_code: postal.value,
                            countryID: this.country.value,
                            cityID: this.city.value,
                            location: this.props.cord
                            // latitude: this.props.cord[0].lat,
                            // longitude: this.props.cord[0].lng
                        },
                         localStorage.getItem("cred")
                    ).then((res) => {
                        this.setState({ userloader: false })
                        if (res.code == 200) {
                            localStorage.setItem("token", localStorage.getItem("cred"));
                            localStorage.setItem("type", 2);
                            this.props.doctorsignupstepend();
                            localStorage.removeItem("cred")
                            browserHistory.push("/home")
                        }
                    })
                }
    }
    selectcountry = (e) => {
        this.props.getallcities(e.target.value)
    }
    // addline1val = () => {
    //     const { adline1, adline2 } = this.refs;
    //     if (adline1.value.trim().length > 0) {
    //         geocodeByAddress(adline1.value + " " + adline2.value)
    //             .then(results => getLatLng(results[0]))
    //             .then(latLng => {
    //                 this.props.findlatlong([latLng])
    //                 this.setState({ addline1: "" })
    //             })
    //             .catch(error => {
    //                 if (error == "ZERO_RESULTS") {
    //                     this.props.findlatlong([])
    //                     this.setState({ addline1: "Wrong Address" })
    //                 }
    //                 console.error('Error', error)
    //             })
    //     }
    // }

    // addline2val = () => {
    //     const { adline1, adline2 } = this.refs;
    //     if (adline2.value.trim().length > 0) {
    //         geocodeByAddress(adline1.value + " " + adline2.value)
    //             .then(results => getLatLng(results[0]))
    //             .then(latLng => {
    //                 this.props.findlatlong([latLng])
    //                 this.setState({ addline1: "" })
    //             })
    //             .catch(error => {
    //                 if (error == "ZERO_RESULTS") {
    //                     this.props.findlatlong([])
    //                     this.setState({ addline1: "Wrong Address" })
    //                 }
    //                 console.error('Error', error)
    //             })
    //     }
    // }

    state = {
        clname: "",
        addline1: "",
        addline2: "",
        postalerr: "",
        laterr: "",
        longerr: "",
        countryerr: "",
        cityerr: "",
        userloader: false,
        clinic: true
    }
    render() {
        return (
            <div className="modal-body">
                <div className="row">
                    <div className=" col-sm-12 col-md-12">
                        <h1 className="login_title">Sign Up</h1>
                        <div className="dol-md-3 stepr">
                            <h5 className="stopof">step 3 of 3</h5>
                            <span className="steperdiv"></span>
                            <span className="steperdiv"></span>
                            <span className="steperdiv"></span>

                            <div className="clearfix"></div>
                            <span></span>
                        </div>
                        <div className="form-signin" >

                            {/* <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" ref="clinicname" className="form-control" placeholder="Clinic Name" />
                                {this.state.clname != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.clname}</strong>
                                </div> : null}

                            </div> */}
                            {/* <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" ref="adline1" className="form-control" onBlur={this.addline1val} placeholder="Address Line1" />
                                {this.state.addline1 != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.addline1}</strong>
                                </div> : null}
                            </div> */}
                            {/* <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" ref="adline2" className="form-control" onBlur={this.addline2val} placeholder="Address Line2" />
                                {this.state.addline2 != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.addline2}</strong>
                                </div> : <div />}
                            </div> */}

                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" ref="postal" className="form-control" placeholder="Postal Code" />
                                {this.state.postalerr != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.postalerr}</strong>
                                </div> : <div />}
                            </div>
                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <select className="form-control" onChange={this.selectcountry} ref={(input) => this.country = input} >
                                    <option value="">Select a Country</option>
                                    {(!this.props.countries) ? null : this.props.countries.map((country, index) => {
                                        return <option key={index} value={country.country_id}>{country.name}</option>
                                    })}
                                </select>
                                {this.state.countryerr != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.countryerr}</strong>
                                </div> : <div />}
                            </div>

                            <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <select className="form-control" ref={(input) => this.city = input} >
                                    <option value="">Select a City</option>
                                    {(!this.props.cities) ? null : this.props.cities.map((city, index) => {
                                        return <option key={index} value={city.city_id}>{city.name}</option>
                                    })}
                                </select>
                                {this.state.cityerr != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.cityerr}</strong>
                                </div> : <div />}
                            </div>

                            {/*<div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                    <input type="text" className="form-control" placeholder="Enter Your City Name" ref="location" />
                                </div>
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <button type="button" className="form-control btn btn-primary" onClick={this.searchlocation}>Search</button>
                                </div>
                            </div>*/}
                            <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ border: "1px solid" }}>

                                {this.props.cord.map(({ address }, index) => {
                                    return (
                                        <div className="chip" key={index}>
                                            <input type="text" placeholder="Clinic name" onBlur={(e) => { this.props.clinicnameupdate(e.target.value, index) }} />
                                            address:-{address}
                                            <span className="closebtn" onClick={() => { this.props.removelatlong(index) }}>&times;</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <Map />
                                {/*<SimpleForm />*/}
                            </div>
                            {/*<div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" ref="lat" className="form-control" placeholder="Latitude" />
                                {this.state.laterr != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.laterr}</strong>
                                </div> : <div />}
                            </div>*/}
                            {/*<div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" ref="long" className="form-control" placeholder="Longitude" />
                                {this.state.longerr != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.longerr}</strong>
                                </div> : <div />}
                            </div>*/}
                            <div style={{ clear: 'both' }}></div>
                            <div className="signup_button text-center">
                                <button onClick={this.submitstep3} className="btn btn-lg btn-primary btn-block login-button" type="submit">
                                    Sign Up </button>
                            </div>
                            {/* <p className="text-center nonmember"> Already a Member?<Link to="/login">Login</ Link></p> */}
                        </div>

                    </div>
                    {/* <!-- loader--> */}
                    <div className="modal fade in" role="dialog" style={{ display: this.state.userloader ? "block" : "none" }}>
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
                <div id="snackbar">{this.state.content}</div>
            </div>
        );
    }
}
export default connect(
    store => ({
        countries: store.countries.countries,
        cities: store.cities.cities,
        cord: store.latlong.cord
    }),
    actions
)(DoctorSignup3);