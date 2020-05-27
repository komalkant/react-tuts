import React, { Component } from 'react'
// import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../../actions/index'
import { findDOMNode } from 'react-dom'
//  import moment from 'moment';

const days = [{ name: "Monday", day: 1 }, { name: "Tuesday", day: 2 }, { name: "Wednesday", day: 3 }, { name: "Thursday", day: 4 }, { name: "Friday", day: 5 }, { name: "Saturday", day: 6 }, { name: "Sunday", day: 7 }]


class BookTime extends Component {
    state = {
        timeslot1: [
            { time: "12 AM", time24: 24 }, { time: "1 AM", time24: 1 },
            { time: "2 AM", time24: 2 }, { time: "3 AM", time24: 3 },
            { time: "4 AM", time24: 4 }, { time: "5 AM", time24: 5 },
            { time: "6 AM", time24: 6 }, { time: "7 AM", time24: 7 },
            { time: "8 AM", time24: 8 }, { time: "9 AM", time24: 9 },
            { time: "10 AM", time24: 10 }, { time: "11 AM", time24: 11 },
            { time: "12 PM", time24: 12 }, { time: "1 PM", time24: 13 },
            { time: "2 PM", time24: 14 }, { time: "3 PM", time24: 15 },
            { time: "4 PM", time24: 16 }, { time: "5 PM", time24: 17 },
            { time: "6 PM", time24: 18 }, { time: "7 PM", time24: 19 },
            { time: "8 PM", time24: 20 }, { time: "9 PM", time24: 21 },
            { time: "10 PM", time24: 22 }, { time: "11 PM", time24: 23 }
        ],
        timeslot2: [],
        timeslot3: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        content: ""
    }


    change1 = (e) => {
        var sortarray1 = [];
        var ind = this.state.timeslot1.findIndex(x => `${x.time24}:00` == this.slot1.value);
        this.state.timeslot1.map((slot, index) => {
            if (ind < index) {
                sortarray1.push(slot)
            }
        })
        this.setState({ timeslot2: sortarray1 });

    }


    checkbox = (day, e) => {
        // console.log(day)
        this.props.updateday(day, e.target.checked, this.props.indx);

    }

    saveslot = () => {
        const { slot1, slot2, slottime } = this;
        const { checkedval } = this.props;
        var keys = Object.keys(checkedval);
        var filtered = keys.filter(function (key) {
            return checkedval[key]
        });
        // console.log(slot1)
        if (filtered.length == 0) {
            this.setState({ content: "Please Check any day" })
            var x = document.getElementById("snackbar")
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

        } else if (slot2.value == "") {
            this.setState({ content: "Please Select End date Or Start date" })
            var x = document.getElementById("snackbar")
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        } else {
            var body = {
                from_time: slot1.value,
                to_time: slot2.value,
                one_slot: slottime.value,
                day: filtered
            }

            this.props.submitslots(body).then((res) => {
                this.setState({ content: res.message })
                var x = document.getElementById("snackbar")
                x.className = "show";
                setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                if (res.code == 200) {
                    this.props.getsubmitslots();

                }
            });
        }

    }


    render() {

        return (
            <div>
                <div className="col-md-12 col-sm-12 col-xs-12 avial">
                    {days.map((day, index) => {
                        return (
                            <div key={index} className="col-md-2 col-sm-2 col-xs-6 dayname">
                                <input type="checkbox" onChange={this.checkbox.bind(this, day.day)} /> <span >{day.name}</span>
                            </div>
                        )
                    })}

                    <div className="clearfix"></div>
                    <div className="col-md-6 col-sm-12 col-xs-12 selectmaindi">
                        <div className="col-md-6 col-sm-6 col-xs-12 selectstart">
                            <label>Start Time</label>
                            <select className="form-control" onChange={this.change1} ref={(input) => this.slot1 = input} >
                                {this.state.timeslot1.map((slot, index) => {
                                    return (
                                        <option key={index} value={`${slot.time24}:00`} >{`${slot.time24}:00`}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="col-md-6 col-sm-6 col-xs-12 selectstart">
                            <label>End Time</label>
                            <select className="form-control" onChange={this.change2} ref={(input) => this.slot2 = input}>
                                {this.state.timeslot2.map((slot, index) => {
                                    return (
                                        <option key={index} value={`${slot.time24}:00`}>{`${slot.time24}:00`}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-12 col-xs-12 selectmaindi">
                        <div className="col-md-12 col-sm-12 col-xs-12 selectstart">
                            <label>One Slot Duration(in Minutes)</label>
                            <select className="form-control" ref={(input) => this.slottime = input}>
                                {this.state.timeslot3.map((slot, index) => {
                                    return (
                                        <option value={slot}>{slot}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <button type="button" style={{ marginTop: "25px" }} onClick={this.saveslot} className="btn btn-success Previoustim">Save</button>
                <div id="snackbar">{this.state.content}</div>
            </div>
        );
    }
}
export default connect(store => ({
    checkedval: store.doctoravail
}),
    actions

)(BookTime);