import React, { Component } from 'react'
import Header from '../header'
import Footer from '../footer'
import { Helmet } from "react-helmet";
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../actions'
// import moment from 'moment';


class MedicalRecord extends Component {
    state = {
        imagePreviewUrl: "",
        collection: [],
        medicine: "", quantity: "", dose: "", often: "", morning: "", afternoon: "", evening: "", night: "", needed: "", Comments: "",
        Started: "", Stopped: "", Prescribed: "", Phone: "", id: "",
        message: "",
        space: {}
    }

    componentWillMount() {
        this.props.spaceused().then(res => this.setState({ space: res.messages }));
    }

    fileselect = async (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        var a = await reader.readAsDataURL(file);
    }
    uploaddoc = () => {
        this.setState({
            collection: [...this.state.collection, JSON.stringify({ note: this.refs.notes.value, type: this.type.value, image: this.state.imagePreviewUrl })]
        }, () => {
            this.refs.notes.value = ""
            this.refs.image.value = ""
        })
    }
    removeImage = (index) => {
        let rm = this.state.collection.splice(index, 1);
        this.setState({ collection: this.state.collection })
    }

    mapimage = () => {
        return this.state.collection.map((image, index) => {

            return (
                <div className="col-md-4 col-sm-4 col-xs-4" style={{ position: "relative" }}>
                    <img src={JSON.parse(image).image} className="img-responsive" />
                    <span onClick={this.removeImage.bind(this, index)} style={{ position: "absolute", top: "0px", right: "0px", zIndex: "99", color: "#000" }}><i className="fa fa-times"></i></span>
                    <h5>{JSON.parse(image).type}</h5>
                </div>
            );
        })
    }

    submitMedicalRecord = () => {
        let { medicine, quantity, dose, often, morning, afternoon, evening, night, needed, Comments,
            Started, Stopped, Prescribed, Phone, id } = this.refs;
        const body = {
            name_of_medicine: medicine.value,
            dose_strength: dose.value,
            how_many: quantity.value,
            how_often: often.value,
            morning: morning.value,
            afternoon: afternoon.value,
            evening: evening.value,
            night: night.value,
            as_needed: needed.value,
            comments: Comments.value,
            started_on: Started.value,
            stopped_on: Stopped.value,
            prescribed_by_doctor: Prescribed.value,
            phone: Phone.value,
            id: id.value,
        }

        if (medicine.value.trim().length <= 0) {
            this.setState({ medicine: "required" })
        } else {
            this.setState({ medicine: "" })
        }
        if (dose.value.trim().length <= 0) {
            this.setState({ dose: "required" })
        } else {
            this.setState({ dose: "" })
        }
        if (quantity.value.trim().length <= 0) {
            this.setState({ quantity: "required" })
        } else {
            this.setState({ quantity: "" })
        }

        if (often.value.trim().length <= 0) {
            this.setState({ often: "required" })
        } else {
            this.setState({ often: "" })
        }
        if (morning.value.trim().length <= 0) {
            this.setState({ morning: "required" })
        } else {
            this.setState({ morning: "" })
        }
        if (afternoon.value.trim().length <= 0) {
            this.setState({ afternoon: "required" })
        } else {
            this.setState({ afternoon: "" })
        }

        if (evening.value.trim().length <= 0) {
            this.setState({ evening: "required" })
        } else {
            this.setState({ evening: "" })
        }

        if (night.value.trim().length <= 0) {
            this.setState({ night: "required" })
        } else {
            this.setState({ night: "" })
        }

        if (needed.value.trim().length <= 0) {
            this.setState({ needed: "required" })
        } else {
            this.setState({ needed: "" })
        }

        if (Comments.value.trim().length <= 0) {
            this.setState({ Comments: "required" })
        } else {
            this.setState({ Comments: "" })
        }

        if (Started.value.trim().length <= 0) {
            this.setState({ Started: "required" })
        } else {
            this.setState({ Started: "" })
        }

        if (Stopped.value.trim().length <= 0) {
            this.setState({ Stopped: "required" })
        } else {
            this.setState({ Stopped: "" })
        }

        if (Prescribed.value.trim().length <= 0) {
            this.setState({ Prescribed: "required" })
        } else {
            this.setState({ Prescribed: "" })
        }

        if (Phone.value.trim().length <= 0) {
            this.setState({ Phone: "required" })
        } else {
            this.setState({ Phone: "" })
        }

        if (id.value.trim().length <= 0) {
            this.setState({ id: "required" })
        } else {
            this.setState({ id: "" })
        }
        if (medicine.value.trim().length <= 0) { } else if (dose.value.trim().length <= 0) { } else if (quantity.value.trim().length <= 0) { } else
            if (often.value.trim().length <= 0) { } else if (morning.value.trim().length <= 0) { } else if (afternoon.value.trim().length <= 0) { } else
                if (evening.value.trim().length <= 0) { } else if (night.value.trim().length <= 0) { } else if (needed.value.trim().length <= 0) { } else
                    if (Comments.value.trim().length <= 0) { } else if (Started.value.trim().length <= 0) { } else if (Stopped.value.trim().length <= 0) { } else
                        if (Prescribed.value.trim().length <= 0) { } else if (Phone.value.trim().length <= 0) { } if (id.value.trim().length <= 0) { } else {
                            this.props.MedicalRecordDetailPost(body).then((res) => {
                                if (res.code == 200) {
                                    medicine.value = ""; quantity.value = ""; dose.value = ""; often.value = ""; morning.value = ""; afternoon.value = ""; evening.value = "";
                                    night.value = ""; needed.value = ""; Comments.value = ""; Started.value = ""; Stopped.value = ""; Prescribed.value = ""; Phone.value = ""; id.value = "";
                                }
                                this.setState({ message: res.message }, () => {
                                    var x = document.getElementById("snackbar")
                                    x.className = "show";
                                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                                })
                            })
                        }
    }


    savedoc = () => {
        if (this.state.collection.length > 0) {
            this.props.savedoc({ image: `[${this.state.collection}]` }).then((res) => {
                this.setState({ collection: [], message: res.message }, () => {
                    var x = document.getElementById("snackbar")
                    x.className = "show";
                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                })
            });
        }
    }

    render() {
        return (<div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Medical Records</title>
            </Helmet>
            <Header />
            <div className="breadcrumb">
                <div className="container">
                    <nav id="breadcrumb-trail">
                        <ol>
                            <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
                            <li className="active"><Link to="/medicalrecords">Medical Record</Link></li>

                        </ol>
                    </nav>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 medicalrecord">
                        <h3>Medical Records</h3>

                        <div className="col-md-6 col-sm-6 col-xs-12 uploadfilediv">
                            <form>
                                {this.mapimage()}

                                <div className="col-md-12 col-sm-12 col-xs-12 doc-form">
                                    <div className="form-group col-md-4">
                                        <input className="form-control" ref="image" onChange={this.fileselect} type="file" accept="image/*" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <select ref={(input) => this.type = input}>
                                            <option value="X-Ray">X-Ray</option>
                                            <option value="General Scan">General Scan</option>
                                            <option value="MRI Scan">MRI Scan</option>
                                            <option value="Prescription">Prescrineededption</option>
                                            <option value="Notes">Notes</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <input type="text" ref="notes" className="form-control" placeholder="Notes" />
                                    </div>
                                    <button type="button" className="btn-bs-file btn btn-lg btn-primary" onClick={this.uploaddoc} >Add Documents</button>
                                    <button type="button" className="btn-bs-file btn btn-lg btn-primary" style={{ float: "right" }} onClick={this.savedoc} >Save Documents</button>
                                    <div className="clearfix"></div>
                                    <div className="margindiv">
                                        <div className="col-md-3 col-sm-12 ">
                                            <img src="/static/img/hard.jpg" />
                                        </div>
                                        <div className="col-md-9 col-sm-12 ">
                                            {this.state.space.percentage ? <div className="progress">
                                                <div className={`progress-bar ${this.state.space.percentage < 90 ? "progress-bar-success" : "progress-bar-danger"}`} role="progressbar" aria-valuenow={`${this.state.space.percentage}`}
                                                    aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.space.percentage}%` }}>
                                                    {this.state.space.space_used} free of  {this.state.space.space_allowed}
                                                </div>
                                            </div> : null}

                                        </div>
                                        <Link to="selectplan" >Upgrade</Link>
                                    </div>
                                </div>
                            </form>

                        </div>


                        <div className="col-sm-6 col-md-6 col-xs-12">

                            <div className="panel panel-default medicalrecorddet">
                                <div className="panel-body form-horizontal medicalrecordform">
                                    <div className="form-group">
                                        <label for="concept" className="col-sm-3 control-label">Name of Medicine</label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="medicine" className="form-control" id="concept" name="concept" />
                                            {this.state.medicine != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.medicine}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label for="description" className="col-sm-3 control-label">Dose / Strength :</label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="dose" className="form-control" id="description" name="description" />
                                            {this.state.dose != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.dose}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label for="amount" className="col-sm-3 control-label">How much / Many :</label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="quantity" className="form-control" id="amount" name="amount" />
                                            {this.state.quantity != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.quantity}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label for="status" className="col-sm-3 control-label">How often</label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="often" className="form-control" id="amount" name="amount" />
                                            {this.state.often != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.often}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label for="date" className="col-sm-3 control-label">Morning</label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="morning" className="form-control" id="date" name="date" />
                                            {this.state.morning != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.morning}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label for="date" className="col-sm-3 control-label">Afternoon</label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="afternoon" className="form-control" id="date" name="date" />
                                            {this.state.afternoon != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.afternoon}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label for="date" className="col-sm-3 control-label">Evening</label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="evening" className="form-control" id="date" name="date" />
                                            {this.state.evening != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.evening}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label for="date" className="col-sm-3 control-label">Night</label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="night" className="form-control" id="date" name="date" />
                                            {this.state.night != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.night}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label for="date" className="col-sm-3 control-label">As needed</label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="needed" className="form-control" id="date" name="date" />
                                            {this.state.needed != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.needed}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label for="date" className="col-sm-3 control-label">Comments:</label>
                                        <div className="col-sm-9">
                                            <textarea ref="Comments" className="form-control" id="date" name="date"></textarea>
                                            {this.state.Comments != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.Comments}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label for="date" className="col-sm-3 control-label">Started on</label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="Started" className="form-control" id="date" name="date" />
                                            {this.state.Started != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.Started}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label for="date" className="col-sm-3 control-label">Stopped On :</label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="Stopped" className="form-control" id="date" name="date" />
                                            {this.state.Stopped != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.Stopped}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>


                                    <div className="form-group">
                                        <label for="date" className="col-sm-3 control-label">Prescribed by Doctor</label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="Prescribed" className="form-control" id="date" name="date" />
                                            {this.state.Prescribed != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.Prescribed}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label for="date" className="col-sm-3 control-label">Phone: </label>
                                        <div className="col-sm-9">
                                            <input type="text" ref="Phone" className="form-control" id="date" name="date" />
                                            {this.state.Phone != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.Phone}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label for="date" className="col-sm-3 control-label">ID #</label>
                                        <div className="col-sm-9">
                                            <input ref="id" type="text" className="form-control" id="date" name="date" />
                                            {this.state.id != "" ? <div className="alert error alert-danger" >
                                                <strong>{this.state.id}</strong>
                                            </div> : <div />}
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label for="date" className="col-sm-3 control-label"></label>
                                        <div className="col-sm-9 text-right">
                                            <input type="submit" onClick={this.submitMedicalRecord} className="form-control recordsbmt" value="Submit" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="snackbar">{this.state.message}</div>
            <Footer />
        </div >
        );
    }
}
export default connect(store => ({

}),
    actions

)(MedicalRecord);