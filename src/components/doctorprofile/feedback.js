import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import moment from 'moment';


class Feedback extends Component {

    componentWillMount() {
        this.props.doctorfeedback()
    }
    renderfeedback = () => {
        return this.props.feeds.map((feed, i) => {
            return (<div key={i} className="col-xs-12 avial" style={{ marginBottom: "20px" }}>

                <div className="col-sm-2 col-xs-12 text-center">
                    <label className="customLabel">Name</label>
                    <p className="labelAfter">{feed.first_name} {feed.last_name}</p>
                </div>
                <div className="col-sm-2 col-xs-12 text-center">
                    <label className="customLabel">Doctor Feedback</label>
                    <form id="smileys">
                        <input type="radio" name="smiley" value={feed.doctor} checked="checked" className={feed.doctor} />
                    </form>
                </div>
                <div className="col-sm-3 col-xs-12 text-center">
                    <label className="customLabel">Nurse Feedback</label>
                    <form id="smileys">
                        <input type="radio" name="smiley" value={feed.nurse} checked="checked" className={feed.nurse} />
                    </form>
                </div>
                <div className="col-sm-2 col-xs-12 text-center">
                    <label className="customLabel">Hospital Feedback</label>
                    <form id="smileys">
                        <input type="radio" name="smiley" value={feed.hospital} checked="checked" className={feed.hospital} />
                    </form>
                </div>
                <div className="col-sm-3 col-xs-12 text-center">
                    <label className="customLabel">Comment</label>
                    <p className="labelAfter">{feed.comment}</p>

                </div>
            </div>)
        })

    }
    render() {

        return (
            <div className="col-md-9 col-sm-8 col-xs-12 aponireqst">
                <h3>Feedback</h3>
                {this.renderfeedback()}
            </div>
        );
    }
}
export default connect(store => ({
    feeds: store.feed
}),
    actions

)(Feedback);