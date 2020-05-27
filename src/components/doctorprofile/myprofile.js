import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import Select from 'react-select'

const field = [
    { label: "First Name", ref: "firstname" },
    { label: "Last Name", ref: "lastname" },
    { label: "Email", ref: "email" },
    { label: "Mobile Number", ref: "phone" },
    { label: "Education", ref: "education" },
    { label: "Area of interest", ref: "ai" },
    { label: "Postal Code", ref: "postal" },

]


class Myprofile extends Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        education: "",
        ai: "",
        postal: "",
        country: "",
        city: "",
        servererr: "",
        editable: false,
        imagePreviewUrl: "",
        newimage: false,
        userloader: false,
        value: [],
        langs: [],
        langerr: "",
        splerr: ""
    }

    componentDidMount() {
        this.state.imagePreviewUrl = this.props.user.photo;
        var token = localStorage.getItem("token")
        const { getuserbyid } = this.props;
        if (token) {
            getuserbyid(token).then((res) => {
                if (res.code != 200) {
                    console.log(res)
                } else {
                    this.setState({ imagePreviewUrl: res.data.photo })
                    this.props.Recieveuserbyid(res.data)
                }
            });
        }
        this.props.getLanguage();
        this.props.getInsurance();
        this.props.getSpecility();
        this.props.getallcountry();

    }

    componentWillUpdate(nextProps) {
        let { email, firstname, lastname, phone, education, ai, postal } = this.refs;
        let { country, city, special } = this;
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
        if (nextProps.user.education) {
            education.value = nextProps.user.education;
        }
        if (nextProps.user.area_of_interest) {
            ai.value = nextProps.user.area_of_interest;
        }
        if (nextProps.user.postal_code) {
            postal.value = nextProps.user.postal_code;
        }
        if (nextProps.user.country_id) {
            country.value = nextProps.user.country_id;
        }
        if (nextProps.user.speciality) {
            special.value = nextProps.user.speciality;

        }
        if (nextProps.user.city_id) {

            var citymatch = this.props.cities.filter((city) => {
                return city.city_id == nextProps.user.city_id;
            })


            if (citymatch.length == 0) {

                this.props.getallcities(nextProps.user.country_id).then(res => {
                    city.value = nextProps.user.city_id;
                })
            } else {
                city.value = nextProps.user.city_id;
            }

        }
        if (nextProps.user.language) {
            if (this.state.value.length == 0) {
                var langs = []
                for (let lang of nextProps.user.language) {
                    langs.push({ value: lang.language_id, label: lang.name })
                }
                this.setState({ value: langs })

            }
        }

    }
    selectcountry = (e) => {
        this.props.getallcities(e.target.value)
    }


    logChange = (value) => {
        this.setState({ value });
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
    lang = () => {

        if (this.state.value.length == 0) {
            this.setState({ langerr: "select language" })
        } else {
            this.setState({ langerr: "" })
        }
        return this.state.value.length == 0;
    }

    updateuser = () => {
        let { email, firstname, lastname, phone, education, ai, postal } = this.refs;
        let { country, city, special } = this;
        const { updateuser } = this.props;
        this.requireval(firstname, "firstname");
        this.requireval(lastname, "lastname");
        this.emailval(email, "email");
        this.phoneval(phone, "phone");
        this.requireval(education, "education");
        this.requireval(ai, "ai");
        this.phoneval(postal, "postal");
        this.requireval(country, "country");
        this.requireval(city, "city");
        this.requireval(special, "splerr");
        this.lang();
        if (this.requireval(firstname)) { } else
            if (this.requireval(lastname)) { } else
                if (this.emailval(email)) { } else
                    if (this.phoneval(phone)) { } else
                        if (this.requireval(education)) { } else
                            if (this.requireval(ai)) { } else
                                if (this.phoneval(postal)) { } else
                                    if (this.requireval(country)) { } else
                                        if (this.requireval(city)) { } else
                                            if (this.requireval(special)) { } else
                                                if (this.lang()) { } else {
                                                    this.setState({ userloader: true })
                                                    let languages = [];
                                                    this.state.value.map(lang => languages.push(lang.value))
                                                    var body1 = {
                                                        email: email.value,
                                                        first_name: firstname.value,
                                                        last_name: lastname.value,
                                                        phone: phone.value,
                                                        education: education.value,
                                                        area_of_interest: ai.value,
                                                        postal: postal.value,
                                                        country: country.value,
                                                        city: city.value,
                                                        speciality: special.value,
                                                        languages: `[${languages}]`
                                                    }
                                                    if (this.state.newimage) {
                                                        body1.image = this.state.imagePreviewUrl
                                                    }
                                                    updateuser(localStorage.getItem("token"), body1).then((data) => {
                                                        if (data.code != 200) {
                                                            this.setState({ servererr: data.message })
                                                        } else {
                                                            this.setState({ newimage: false });
                                                            var token = localStorage.getItem("token")
                                                            this.props.getuserbyid(token).then((res) => {
                                                                this.setState({ userloader: false });
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
                                                            })
                                                        }
                                                    })


                                                }


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

    imageclick = () => {
        if (this.state.editable) {
            document.getElementById('img').click()
        }
    }
    key = (ref) => {
        console.log("event", ref)
    }

    render() {
        const { specialities, languages, insurance } = this.props;
        if (languages.length > 0) {
            var langs = []
            for (let lang of languages) {
                langs.push({ value: lang.id, label: lang.name })
            }
            if (this.state.langs.length == 0) {
                this.setState({ langs })
            }
        }

        return (
            <div className="user-panel col-md-8 col-sm-8 setting-page ui-tabs-panel ui-widget-content ui-corner-bottom" id="htlfndr-user-tab-5" aria-labelledby="ui-id-5" role="tabpanel" aria-hidden="true" >
                <div className="userbox-setting">
                    <div className="userinner-avatar text-center">
                        <img onClick={this.imageclick} src={this.state.imagePreviewUrl} alt="user avatar" />

                        {this.state.editable ? <button onClick={this.updateuser} type="submit" className="edit-info">Update</button> : <button onClick={this.edituser} type="submit" className="edit-info"><i className="fa fa-pencil" aria-hidden="true"></i>Edit Info</button>}
                        {this.state.servererr != "" ? <div className="sr_err">
                            Oops' {this.state.servererr}!
                                            </div> : null}
                    </div>
                    <form className="user-form-setting" >
                        <div className="row">
                            <input style={{ display: "none" }} name="myFile" id="img" onChange={this.fileselect} type="file" accept="image/*" />
                            {field.map((input, index) => {
                                return (
                                    <div className="col-md-4 user-form-setting-cols">
                                        <label for="settings-name" className="">{input.label}</label>
                                        <input id="settings-name" onClick={this.key.bind(this, input.ref)} disabled={!this.state.editable} ref={input.ref} className={`user-input borderinput`} type="text" name="settings-name" />
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
                                <label for="settings-name" className="">Select languages</label>
                                <Select
                                    multi
                                    value={this.state.value}
                                    placeholder="Select your Known Languages"
                                    options={this.state.langs}
                                    disabled={!this.state.editable}
                                    onChange={this.logChange} />
                                {this.state.langerr != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.langerr}</strong>
                                </div> : null}
                            </div>
                            <div className="col-md-4 user-form-setting-cols">
                                <label for="settings-name" className="">Speciallity</label>
                                <select className="form-control" disabled={!this.state.editable} ref={(input) => this.special = input} >
                                    <option value="">Select Specility</option>
                                    {(!specialities) ? null : specialities.map((spl) => {
                                        return <option key={spl.id} value={spl.id}>{spl.name}</option>
                                    })}
                                </select>
                                {this.state.splerr != "" ? <div className="alert error alert-danger" >
                                    <strong>{this.state.splerr}</strong>
                                </div> : null}
                            </div>
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
    languages: store.languages.langs,
    specialities: store.recievespecility.specialities,
    insurance: store.recieveinsurance.insurance,
    countries: store.countries.countries,
    cities: store.cities.cities
}),
    actions

)(Myprofile);