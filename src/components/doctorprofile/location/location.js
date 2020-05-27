import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions/index'
import { Link } from 'react-router'
import Map from './map'
import MapAdd from './map1'

class Location extends Component {
    state = {
        locationlist: true
    }
    componentWillMount() {
        this.props.hospitallocation()
    }
    snackebarpopup = (content) => {
        this.setState({ content })
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    submitlocation = (e) => {
        e.preventDefault()
        if (this.props.cord.length == 0) {
            this.snackebarpopup("Please select a location")
        } else {
            if (!this.props.cord[0].clinicname) {
                this.snackebarpopup("Please enter clinic name")
            } else if (!this.props.cord[0].address) {
                this.snackebarpopup("Please select your clinic location")
            } else {
                this.props.addlocationbydoctor({ location: this.props.cord }).then((res) => {
                    if (res.code == 200) {
                        this.setState({ locationlist: true })
                        this.refs.clinic.value = ""
                    }
                    this.snackebarpopup(res.message);
                })
            }
        }
    }


    renderlist = () => {

        return this.props.hospitals.map((hospital, index) => {
            return (
                <div className="tablecesc" key={index}>

                    <div className="col-md-2 col-sm-2 col-xs-12 tblcel">
                        <img src="/static/img/dummy.jpg" className="img-responsive center-block" />
                    </div>

                    <div className="col-md-7 col-sm-7 col-xs-12 table-responsive ">
                        <table className="table">
                            {/* <tr>
                              <td>Date / Time</td>
                              <td> : </td>
                              <td>09-May-2017, 09:00 AM to 10:00 AM</td>
                          </tr> */}
                            <tr>
                                <td>Clinic Name</td>
                                <td> : </td>
                                <td>{hospital.clinicname}</td>
                            </tr>
                            <tr>
                                <td>Latitude </td>
                                <td>: </td>
                                <td>{hospital.lat}</td>
                            </tr>
                            <tr>
                                <td>Longitude</td>
                                <td>:</td>
                                <td>{hospital.lng}</td>
                            </tr>
                            {/* <tr>
                              <td>Zip Code</td>
                              <td>:</td>
                              <td>1029028923</td>
                          </tr> */}
                            <tr>
                                <td>Address </td>
                                <td>:</td>
                                <td>{hospital.address}</td>
                            </tr>
                        </table>
                    </div>


                    <div className="col-md-3 col-sm-3 col-xs-12 tblcel">
                        <Map ind={index} />
                    </div>

                </div>)
        })

    }
    addclinic = (e) => {
        // console.log("target", e.target.value)
        this.props.addclinicname(e.target.value)
    }

    showloction = () => {
        return this.props.cord.map((loct) => {
            return (
                <div className="col-xs-12 avial">
                    {/* <div className="col-xs-12 feedbackOutput"> */}
                    <div className="col-sm-3 col-xs-12 text-center">
                        <label className="customLabel">Clinic Name</label>
                        {loct.clinicname ? <p className="labelAfter">{loct.clinicname}</p> : <p className="labelAfter"></p>}
                    </div>
                    <div className="col-sm-3 col-xs-12 text-center">
                        <label className="customLabel">Address</label>
                        {loct.address ? <p className="labelAfter">{loct.address}</p> : <p className="labelAfter"></p>}
                    </div>
                    <div className="col-sm-3 col-xs-12 text-center">
                        <label className="customLabel">Latitude</label>
                        {loct.lat ? <p className="labelAfter">{loct.lat}</p> : <p className="labelAfter"></p>}

                    </div>

                    <div className="col-sm-3 col-xs-12 text-center">
                        <label className="customLabel">Longitude</label>
                        {loct.lng ? <p className="labelAfter">{loct.lng}</p> : <p className="labelAfter"></p>}

                    </div>
                </div>
            )
        })
    }

    addlocation = () => {
        return (
            <div>
                <form className="formSpace" onSubmit={this.submitlocation}>
                    <div className="col-sm-6 col-xs-12 form-group zero-padding " style={{
                        position: "relative"
                    }}>
                        <label for="text" className="labelStyle" style={{
                            textTransform: "uppercase",
                            fontSize: "16px",
                            fontWeight: 400
                        }}>Clinic Name:</label>
                        <input type="text" ref="clinic" className="form-control" onChange={this.addclinic} style={{
                            border: "1px solid #cfcece",
                            padding: "10px",
                            top: "-3px",
                            width: "50%",
                            right: "90px",
                            position: "absolute",
                        }} />
                    </div>

                    <div className="col-sm-6 col-xs-12">
                        <button type="submit" className="btn locationBtn" style={{
                            padding: "5px 13px",
                            marginTop: "-4px"
                        }}>Submit</button>
                    </div>

                </form>
                <div className="clearfix"></div>

                {this.props.cord.length > 0 ? this.showloction() : null}
                <div className="row">

                    <div className="col-xs-12 mapLocation">
                        <MapAdd />
                    </div>

                </div>

            </div>
        )
    }

    render() {
        return (

            <div className="col-md-9 col-sm-8 col-xs-12 nurse-resep locatnmap">
                <h3 className="inlinePositon">Location</h3>
                <div className="pull-right">
                    {this.state.locationlist ?
                        <button type="button" onClick={() => { this.setState({ locationlist: false }) }} className="btn addBtn">Add New</button>
                        : <button type="button" onClick={() => { this.setState({ locationlist: true }) }} className="btn addBtn">Back</button>}

                </div>
                <div className="clearfix"></div>
                {this.state.locationlist ? this.renderlist() : this.addlocation()}
                <div id="snackbar">{this.state.content}</div>
            </div>
        );
    }
}

export default connect(store => ({
    hospitals: store.hospitals,
    cord: store.addlatlong.cord
}),
    actions

)(Location);