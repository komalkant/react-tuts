import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux'
import BookTime from './timeslot';
import * as actions from '../../../actions/index'
import moment from 'moment';
const days = [{ name: "Monday", day: 1 }, { name: "Tuesday", day: 2 }, { name: "Wednesday", day: 3 }, { name: "Thursday", day: 4 }, { name: "Friday", day: 5 }, { name: "Saturday", day: 6 }, { name: "Sunday", day: 7 }]

class Availaible extends Component {
    state = {

    }
    componentWillMount() {
        this.props.getsubmitslots();
    }
    delete = (id) => {
        this.props.deleteslot({ id }).then((res) => {
            this.props.getsubmitslots();
            console.log("resp", res)
        })
    }

    render() {
        const { lang } = this.props;
        return (
            <div className="col-md-9 col-sm-8 col-xs-12 aponireqst">
                <h3> Availability </h3>
                <br />

                <BookTime />

                <table className="table table-bordered" style={{ marginTop: "38px" }}>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Slot Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.slots.map((slot, index) => {
                                var filterval = days.filter((day) => {
                                    return slot.day == day.day;
                                });
                                return (
                                    <tr key={index}>
                                        <td>{filterval[0].name}</td>
                                        <td>{slot.from_time}</td>
                                        <td>{slot.to_time}</td>
                                        <td>{slot.one_slot}</td>
                                        <td> <i className="fa fa-trash-o" aria-hidden="true" onClick={this.delete.bind(this, slot.id)}></i></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        );
    }
}
export default connect(store => ({
    lang: store.langchange.lang,
    slots: store.slots
}),
    actions

)(Availaible);