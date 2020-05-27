import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import DatePicker from 'react-datepicker';
import moment from 'moment';

const field = [
    { label: "First Name", ref: "firstname" },
    { label: "Last Name", ref: "lastname" },
    { label: "Email", ref: "email" },
    { label: "Mobile Number", ref: "phone" },
    { label: "Father's Name", ref: "fathersname" },
    { label: "Grand Father's Name", ref: "gfathersname" },
    { label: "Address", ref: "address" },
    { label: "National ID No. / Resident Permit No.", ref: "permit" },
    { label: "Place Of Birth", ref: "pob" },
    { label: "Employer / Workplace", ref: "employer" },
    { label: "Telephone", ref: "telephone" },
    { label: "Allergies(if any)", ref: "allergy" },
    { label: "Postal Code", ref: "postal" },
    { label: "Area Or Locality", ref: "area" }
]
const Relative = [
    { label: "Name", ref: "relname" },
    { label: "Phone", ref: "relphone" },
    { label: "Relationship Type", ref: "Relationship" }
]


class Myprofile extends Component {
    state = {
        firstname: "", lastname: "", email: "", phone: "",
        fathersname: "", gfathersname: "", address: "",
        permit: "", pob: "", employer: "", telephone: "", allergy: "",
        postal: "", area: "", relname: "", relphone: "", Relationship: "",
        country: "", city: "", gender: "", Nation: "", bgroup: "", dateformat: "",
        servererr: "",
        editable: false,
        imagePreviewUrl: "",
        newimage: false,
        userloader: false,
        date: ""
    }
    handleChange = (date) => {
        this.setState({
            date
        });
    }

    componentWillMount() {
        this.state.imagePreviewUrl = this.props.user.photo;
        var token = localStorage.getItem("token")
        const { getuserbyid, getallcountry } = this.props;
        getallcountry();
        getuserbyid(token).then((res) => {
            if (res.code != 200) {
                console.log(res)
            } else {
                this.setState({ imagePreviewUrl: res.data.photo })
                this.props.Recieveuserbyid(res.data)
            }
        });
    }

    componentWillUpdate(nextProps) {
        let { email, firstname, lastname, phone,
            fathersname, gfathersname, address,
            permit, pob, employer, telephone, allergy,
            postal, area, relname, relphone, Relationship } = this.refs;
        let { country, city, gender, Nation, bgroup } = this;

        if (nextProps.user.first_name) {
            firstname.value = nextProps.user.first_name;
        }
        if (nextProps.user.last_name) {
            lastname.value = nextProps.user.last_name;
        }
        if (nextProps.user.phone) {
            phone.value = nextProps.user.phone;
        }
        if (nextProps.user.email) {
            email.value = nextProps.user.email;
        }


        if (nextProps.user.father) {
            fathersname.value = nextProps.user.father;
        }
        if (nextProps.user.grand_father) {
            gfathersname.value = nextProps.user.grand_father;
        }

        if (nextProps.user.address_line_1) {
            address.value = nextProps.user.address_line_1;
        }
        if (nextProps.user.gender) {
            gender.value = nextProps.user.gender;
        }

        if (nextProps.user.national_id_number) {
            permit.value = nextProps.user.national_id_number;
        }

        if (nextProps.user.place_of_birth) {
            pob.value = nextProps.user.place_of_birth;
        }
        if (nextProps.user.employer) {
            employer.value = nextProps.user.employer;
        }
        if (nextProps.user.telephone) {
            telephone.value = nextProps.user.telephone;
        }

        if (nextProps.user.allergy) {
            allergy.value = nextProps.user.allergy;
        }


        if (nextProps.user.relation_name) {
            relname.value = nextProps.user.relation_name;
        }

        if (nextProps.user.relation_phone) {
            relphone.value = nextProps.user.relation_phone;
        }


        if (nextProps.user.relation_type) {
            Relationship.value = nextProps.user.relation_type;
        }
        if (nextProps.user.blood_group) {
            bgroup.value = nextProps.user.blood_group;
        }


        if (nextProps.user.nationality_id) {
            Nation.value = nextProps.user.nationality_id;
        }
        if (nextProps.user.country) {
            country.value = nextProps.user.country;

        }
        if (nextProps.user.city_id) {
            var citymatch = this.props.cities.filter((city) => {
                return city.city_id == nextProps.user.city_id;
            })
            if (citymatch.length == 0) {
                this.props.getallcities(nextProps.user.country).then(res => {
                    city.value = nextProps.user.city_id;
                })
            } else {
                city.value = nextProps.user.city_id;
            }

        }

        if (nextProps.user.postal_code) {
            postal.value = nextProps.user.postal_code;
        }
        if (nextProps.user.area) {
            area.value = nextProps.user.area;
        }
        if (nextProps.user.gender) {
            gender.value = nextProps.user.gender;
        }
        if (nextProps.user.dob) {
            if (this.state.date == "") {
                this.setState({ date: moment(nextProps.user.dob) })
            }

        }
    }
    apicall = () => {
        let { email, firstname, lastname, phone,
            fathersname, gfathersname, address,
            permit, pob, employer, telephone, allergy,
            postal, area, relname, relphone, Relationship } = this.refs;

        let { country, city, gender, Nation, bgroup } = this;
        const { updateuser } = this.props;
        this.setState({ userloader: true })
        var body = {
            "email": email.value,
            "first_name": firstname.value,
            "last_name": lastname.value,
            "phone": phone.value,
            "father": fathersname.value,
            "grand_father": gfathersname.value,
            "address_line_1": address.value,
            "national_id_number": permit.value,
            "place_of_birth": pob.value,
            "employer": employer.value,
            "telephone": telephone.value,
            "allergy": allergy.value,
            "relation_name": relname.value,
            "relation_phone": relphone.value,
            "relation_type": Relationship.value,
            "blood_group": bgroup.value,
            "nationality_id": Nation.value,
            "city_id": city.value,
            "country": country.value,
            "postal_code": postal.value,
            "gender": gender.value,
            "area": area.value,
            "dob": moment(this.state.date).format("YYYY-MM-DD")
        }
        if (this.state.newimage) {
            body.image = this.state.imagePreviewUrl
        }
        updateuser(localStorage.getItem("token"), body).then((data) => {
            if (data.code != 200) {
                this.setState({ servererr: data.message })
            } else {
                this.setState({ newimage: false })
                var token = localStorage.getItem("token")
                this.props.getuserbyid(token).then((res) => {
                    this.setState({ userloader: false })
                    if (res.code != 200) {
                        this.setState({ servererr: res.message, content: res.message })
                        var x = document.getElementById("snackbar")
                        x.className = "show";
                        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                    } else {

                        localStorage.setItem("name", res.data.first_name);
                        this.props.Recieveuserbyid(res.data)
                        this.setState({ editable: false, servererr: "", imagePreviewUrl: res.data.photo });
                    }
                });
            }
        });
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
    emailval = (a, b) => {
        const emailreg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm.test(a.value);
        if (b) {
            if (!emailreg) {
                this.setState({ [b]: "invalid email" })
            } else {
                this.setState({ [b]: "" })
            }
        }
        return !emailreg;
    }
    phoneval = (a, b) => {
        const numberreg = /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/.test(a.value);
        if (b) {
            if (!numberreg) {
                this.setState({ [b]: "invalid number" })
            } else {
                this.setState({ [b]: "" })
            }
        }
        return !numberreg;
    }
    dateval = () => {
        const date = document.getElementById("datepicker").value
        var aDate = moment(date, 'YYYY-MM-DD', true);
        var isValid = aDate.isValid();
        if (!isValid) {
            this.setState({ dateformat: "please enter a valid date" })
        } else {
            this.setState({ dateformat: "" })
        }
        return !isValid
    }

    Updateuser1 = () => {
        let { email, firstname, lastname, phone,
            fathersname, gfathersname, address,
            permit, pob, employer, telephone, allergy,
            postal, area, relname, relphone, Relationship } = this.refs;

        let { country, city, gender, Nation, bgroup } = this;

        this.requireval(firstname, "firstname");
        this.requireval(lastname, "lastname");
        this.emailval(email, "email");
        this.phoneval(phone, "phone")

        this.requireval(fathersname, "fathersname");
        this.requireval(gfathersname, "gfathersname");
        this.requireval(address, "address");
        this.requireval(permit, "permit");
        this.requireval(pob, "pob");
        this.requireval(employer, "employer");
        this.phoneval(telephone, "telephone");
        // this.requireval(allergy, "allergy");
        this.requireval(postal, "postal");
        this.requireval(area, "area");

        this.requireval(country, "country");
        this.requireval(city, "city");
        this.requireval(gender, "gender");
        this.requireval(Nation, "Nation");

        this.requireval(relname, "relname");
        this.phoneval(relphone, "relphone");
        this.requireval(Relationship, "Relationship");
        this.requireval(bgroup, "bgroup");
        this.dateval()

        if (this.requireval(firstname)) { } else
            if (this.requireval(lastname)) { } else
                if (this.emailval(email)) { } else
                    if (this.phoneval(phone)) { } else
                        if (this.requireval(fathersname)) { } else
                            if (this.requireval(gfathersname)) { } else
                                if (this.requireval(address)) { } else
                                    if (this.requireval(permit)) { } else
                                        if (this.requireval(pob)) { } else
                                            if (this.requireval(employer)) { } else
                                                if (this.phoneval(telephone)) { } else
                                                    //  if (this.requireval(allergy)) { } else
                                                    if (this.requireval(postal)) { } else
                                                        if (this.requireval(area)) { } else
                                                            if (this.requireval(country)) { } else
                                                                if (this.requireval(city)) { } else
                                                                    if (this.requireval(gender)) { } else
                                                                        if (this.requireval(Nation)) { } else
                                                                            if (this.requireval(relname)) { } else
                                                                                if (this.requireval(Relationship)) { } else
                                                                                    if (this.phoneval(relphone)) { } else
                                                                                        if (this.requireval(bgroup)) { } else
                                                                                            if (this.dateval()) { } else { this.apicall(); }
    }

    edituser = () => {
        this.setState({ editable: true })
    }

    fileselect = async (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            // console.log("reader", reader.result);
            this.setState({
                newimage: true,
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        var a = await reader.readAsDataURL(file);
    }
    selectcountry = (e) => {
        this.props.getallcities(e.target.value)
    }

    imageclick = () => {
        if (this.state.editable) {
            document.getElementById('img').click()
        }
    }

    render() {

        return (
            <div className="user-panel col-md-8 col-sm-8 setting-page ui-tabs-panel ui-widget-content ui-corner-bottom" id="htlfndr-user-tab-5" aria-labelledby="ui-id-5" role="tabpanel" aria-hidden="true" >
                <div className="userbox-setting">
                    <div className="userinner-avatar text-center">
                        <img onClick={this.imageclick} src={this.state.imagePreviewUrl} alt="user avatar" />

                        {this.state.editable ? <button onClick={this.Updateuser1} type="submit" className="edit-info">Update</button> : <button onClick={this.edituser} type="submit" className="edit-info"><i className="fa fa-pencil" aria-hidden="true"></i>Edit Info</button>}
                        {this.state.servererr != "" ? <div className="sr_err">
                            Oops' {this.state.servererr}!
                                            </div> : null}
                    </div>
                    <form className="user-form-setting" >
                        <div className="row">

                            <input style={{ display: "none" }} name="myFile" id="img" onChange={this.fileselect} type="file" accept="image/*" />
                            {/*{this.textfieldval("First Name", "firstname")}*/}

                            {field.map((input, index) => {
                                return (
                                    <div className="col-md-4 user-form-setting-cols">
                                        <label for="settings-name" className="">{input.label}</label>
                                        <input id="settings-name" disabled={!this.state.editable} ref={input.ref} className={`user-input borderinput`} type="text" name="settings-name" />
                                        {this.state[input.ref] != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                            <strong>{this.state[input.ref]}</strong>
                                        </div> : null}

                                    </div>
                                )
                            })}

                            <div className="col-md-4 user-form-setting-cols">
                                <label for="settings-name" className="">Country</label>
                                <select className="user-input borderinput" disabled={!this.state.editable} onChange={this.selectcountry} ref={(input) => this.country = input} >
                                    <option value="">Select a Country</option>
                                    {(!this.props.countries) ? null : this.props.countries.map((country, index) => {
                                        return <option key={index} value={country.country_id}>{country.name}</option>
                                    })}
                                </select>
                                {this.state.country != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                    <strong>{this.state.country}</strong>
                                </div> : null}

                            </div>

                            <div className="col-md-4 user-form-setting-cols">
                                <label for="settings-name" className="">City</label>
                                <select className="user-input borderinput" disabled={!this.state.editable} ref={(input) => this.city = input} >
                                    <option value="">Select a City</option>
                                    {(!this.props.cities) ? null : this.props.cities.map((city, index) => {
                                        return <option key={index} value={city.city_id}>{city.name}</option>
                                    })}
                                </select>
                                {this.state.city != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                    <strong>{this.state.city}</strong>
                                </div> : null}

                            </div>


                            <div className="col-md-4 user-form-setting-cols">
                                <label for="settings-name" className="">Gender</label>
                                <select className="user-input borderinput" disabled={!this.state.editable} ref={(input) => this.gender = input} >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {this.state.gender != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                    <strong>{this.state.gender}</strong>
                                </div> : null}

                            </div>

                            <div className="col-md-4 user-form-setting-cols">
                                <label for="settings-name" className="">Nationality</label>
                                <select className="user-input borderinput" disabled={!this.state.editable} ref={(input) => this.Nation = input} >
                                    <option value="">Select Nationality</option>
                                    {(!this.props.countries) ? null : this.props.countries.map((country, index) => {
                                        return <option key={index} value={country.country_id}>{country.name}</option>
                                    })}
                                </select>
                                {this.state.Nation != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                    <strong>{this.state.Nation}</strong>
                                </div> : null}

                            </div>
                            <div className="col-md-4 user-form-setting-cols">
                                <label for="settings-name" className="">Date Of Birth</label>
                                <DatePicker
                                    id="datepicker"
                                    className="form-control date-picker frmapponiform user-input witdth-full borderinput"
                                    disabled={!this.state.editable}
                                    selected={this.state.date}
                                    onChange={this.handleChange}
                                    dateFormat="YYYY-MM-DD"
                                />
                                {this.state.dateformat != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                    <strong>{this.state.dateformat}</strong>
                                </div> : null}

                            </div>
                            <div className="col-md-4 user-form-setting-cols">
                                <label for="settings-name" className="">Blood Group</label>
                                <select className="user-input borderinput" disabled={!this.state.editable} ref={(input) => this.bgroup = input} >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                                {this.state.bgroup != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                    <strong>{this.state.bgroup}</strong>
                                </div> : null}
                            </div>



                            <div className="col-md-12 user-form-setting-cols">
                                <label for="settings-name" style={{ fontWeight: "bolder" }} className="">Relative/Friend Contact</label>
                            </div>
                            {/*Relative/Friend Contact*/}
                            {Relative.map((input, index) => {
                                return (
                                    <div className="col-md-4 user-form-setting-cols">
                                        <label for="settings-name" className="">{input.label}</label>
                                        <input id="settings-name" disabled={!this.state.editable} ref={input.ref} className={`user-input borderinput`} type="text" name="settings-name" />
                                        {this.state[input.ref] != "" ? <div className="alert error alert-danger" style={{ position: "relative" }} >
                                            <strong>{this.state[input.ref]}</strong>
                                        </div> : null}

                                    </div>
                                )
                            })}
                            {/*End Relative/Friend Contact*/}
                        </div>
                    </form>
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
        );
    }
}
export default connect(store => ({
    user: store.userbyid.user,
    countries: store.countries.countries,
    cities: store.cities.cities
}),
    actions

)(Myprofile);