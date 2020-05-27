////////////////home page search form////////////////////////
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router';

class SearchForm extends Component {
    componentWillMount() {
        this.props.getSpecility();
        this.props.getLocation();
        this.props.getInsurance();
    }
    submit = () => {
        let specility = this.special.value;
        let location = this.locat.value;
        let insurance = this.insure.value;
        browserHistory.push(`/doctorlist?specility=${specility}&locations=${location}&insurance=${insurance}`)
    }
    render() {
        const { specialities, cities, insurance } = this.props;
        return (
            <form>
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <select id="soflow" ref={(input) => this.special = input} >
                            <option value="">Select specialist</option>
                            {(!specialities) ? null : specialities.map((spl) => {
                                return <option key={spl.id} value={spl.id}>{this.props.lang == "ar" ? spl.name_ar : spl.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <select id="soflow" ref={(input) => this.locat = input} >
                            <option value="">Select Location</option>
                            {(!cities) ? null : cities.map((city) => {
                                return <option key={city.id} value={city.id}>{city.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <select id="soflow" ref={(input) => this.insure = input} >
                            <option value="">Select Insurance</option>
                            {(!insurance) ? null : insurance.map((insr) => {
                                return <option key={insr.id} value={insr.insurance_id}>{this.props.lang == "ar" ? insr.name_ar : insr.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-sm-2 col-md-2 col-lg-2">
                        <input onClick={this.submit} type="button" value="Search" />
                    </div>
                </div>
            </form>
        );
    }
}

export default connect(store => ({
    specialities: store.recievespecility.specialities,
    cities: store.recievelocation.cities,
    insurance: store.recieveinsurance.insurance,
    lang: store.langchange.lang
}),
    actions

)(SearchForm) 