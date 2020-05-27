import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker';
import * as actions from '../../actions/index'
import moment from 'moment';


class Social extends Component {
    state = {

    }
    submitlink = (e) => {
        e.preventDefault()
        const { fb, twit, wt, insta } = this.refs;
        var body = { facebook: `https://${fb.value}`, twitter: `https://${twit.value}`, insta: `https://${insta.value}`, whatsapp: `https://${wt.value}` }
        this.props.sociallinksave(body).then((res) => {
            this.setState({ content: res.message })
            var x = document.getElementById("snackbar")
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
            if (res.code == 200) {
                fb.value = ""
                twit.value = ""
                wt.value = ""
                insta.value = ""
            } else {

            }
        });
    }


    render() {

        return (
            <div className="col-md-9 col-sm-8 col-xs-12 aponireqst">
                <h3>Social Link</h3>
                <form onSubmit={this.submitlink}>
                    <div className="input-group">
                        <span className="input-group-addon">https://</span>
                        <input type="text" ref="fb" className="form-control" placeholder="Facebook" />
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">https://</span>
                        <input type="text" ref="twit" className="form-control" placeholder="Twitter" />
                    </div>

                    <div className="input-group">
                        <span className="input-group-addon">https://</span>
                        <input type="text" ref="insta" className="form-control" placeholder="Instagram" />
                    </div>

                    <div className="input-group">
                        <span className="input-group-addon">https://</span>
                        <input type="text" ref="wt" className="form-control" placeholder="Whatsapp" />
                    </div>

                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
                <div id="snackbar">{this.state.content}</div>
            </div>
        );
    }
}
export default connect(store => ({

}),
    actions

)(Social);