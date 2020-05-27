import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actions from '../../actions/index'
import moment from 'moment';
import DatePicker from 'react-datepicker';
// import { findDOMNode } from 'react-dom';

class Message extends Component {
    state = {
        messageinner: false,
        startDate: ""
    }
    componentWillMount() {
        this.props.messagelist()
    }
    convesation = (id) => {
        this.setState({ messageinner: true })
        this.props.message({ id })
        //  console.log("user",user); 
    }
    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    }
    filtermessage = () => {

        const date = document.getElementById("datepicker").value
        var aDate = moment(date, 'DD-MM-YYYY', true);
        var isValid = aDate.isValid();
        if (isValid) {
            this.props.messagelist(moment(this.state.startDate).format("YYYY-MM-DD"), this.refs.name.value)
        } else {
            this.props.messagelist("", this.refs.name.value)
        }

    }

    messageout = () => {
        return (
            <div className="col-md-8 col-sm-8 col-xs-12 aponireqst">
                <h3>Messages</h3>
                <div className="col-md-12 col-sm-12 col-xs-12 apoimtfiltrrqsr">
                    <h3>Filter Option</h3>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="col-md-4 col-sm-4 col-xs-12 appointreqstfrm">
                            <input type="text" ref="name" placeholder="recipient name" className="form-control frmapponiform" />
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12 appointreqstfrm">
                            <DatePicker
                                id="datepicker"
                                className="form-control date-picker frmapponiform"
                                ref="datepicker"
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                dateFormat="DD-MM-YYYY"
                            />
                            <div className="input-group-btn">
                                <button onClick={() => { document.getElementById('datepicker').click() }} className="btn btn-default" ><i className="fa fa-calendar"></i></button>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12 appointreqstfrm1 ">
                            <a href="javascript:void(0)" onClick={this.filtermessage} className="btn btn-filter">Filter Results</a>
                        </div>
                    </div>
                </div>
                {(!this.props.chatlist) ? null : this.props.chatlist.map((userchat, index) => {
                    return (
                        <div className="col-md-12 col-sm-12 col-xs-12  appointcontmain msgmaindiv">
                            <div className="col-md-12 col-sm-12 col-xs-12 patienttxt msg">
                                <div className="col-md-1 col-sm-2 col-xs-2 nopadding">
                                    <img src={userchat.photo} className="img-responsive" />
                                </div>
                                <div onClick={() => { this.convesation(userchat.userid) }} className="col-md-11 col-sm-10 col-xs-2 nopadding">
                                    <h4>{userchat.first_name} {userchat.last_name}</h4>
                                    <h5>{moment(userchat.created_at).format("DD/MM/YYYY")}  | {moment(userchat.created_at).format("h:mm A")}</h5>
                                    <p>{userchat.message}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    submitmessage = () => {
        const message = this.refs.textmessage.value.trim()
        if (message.length > 0) {
            if (this.props.photos.response_id) {
                this.props.insertmessage({ id: this.props.photos.response_id, message })
                this.refs.textmessage.value = ""
            }
        }
    }
    messagechat = () => {
        if (this.props.messages.length > 0) {
            return this.props.messages.map((message, index) => {

                if (this.props.photos.response_id == message.from) {
                    return (
                        <div className="col-md-12 col-sm-12 col-xs-12 msgreply">
                            <div className="col-md-8 col-sm-12 col-xs-12 nopadding">
                                <div className="col-md-1 col-sm-2 col-xs-2 nopadding msgicon">
                                    <img src={this.props.photos.user_photo} />
                                </div>
                                <div className="col-md-10 col-sm-10 col-xs-10 ">
                                    <div className="col-md-12 col-sm-12 col-xs-12 msgtxt">
                                        <h6>{message.message}</h6>
                                        <h5>{message.date}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12">
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="col-md-12 col-sm-12 col-xs-12 msgreply">
                            <div className="col-md-4 col-sm-4 col-xs-12">
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12 nopadding">
                                <div className="col-md-10 col-sm-10 col-xs-10 ">
                                    <div className="col-md-12 col-sm-12 col-xs-12 msgtxt1">
                                        <img src="/static/img/triangle1.png" />
                                        <h6>{message.message}</h6>
                                        <h5>{message.date}</h5>
                                    </div>
                                </div>
                                <div className="col-md-1 col-sm-2 col-xs-2 nopadding msgicon">
                                    <img src={this.props.photos.doctor_photo} className="" />
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        }
    }

    messagein = () => {
        return (
            <div className="col-md-8 col-sm-8 col-xs-12 aponireqst messageinner">
                <div className="col-md-9 col-sm-9 col-xs-8 textperson">
                    <h3><img onClick={() => { this.setState({ messageinner: false }); this.props.messagelist(); }} src="/static/img/arrowleft.png" />{this.props.photos.name}</h3>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-4 messinnerimg">
                    {/* <img src="/static/img/mesinnersearch.png" className="minner" />
                    <label htmlFor="file-upload">
                        <img src="/static/img/mesinnersearch1.png" className="minner" />
                    </label> */}
                    <img src="/static/img/mesinnersearch2.png" className="minner" />
                </div>
                {/* <div style={{overflow:"auto" ,maxHeight:"90px"}}> */}
                {this.messagechat()}
                {/* </div> */}
                <div className="col-md-12 col-sm-12 col-xs-12 msgreplysection">
                    <div className="col-md-1 col-sm-2 col-xs-2 nopadding msgicon1">
                        <i className="fa fa-smile-o" aria-hidden="true"></i>
                    </div>
                    <div className="col-md-8 col-sm-10 col-xs-10">
                        <div className="col-md-12 col-sm-12 col-xs-12 nopadding typingdiv">
                            <textarea ref='textmessage' type="text" className="replytxt" placeholder="Start Typing..."></textarea>
                            {/* <label htmlFor="file-upload" className="replygal">
                                <i className="fa fa-paperclip"></i>
                            </label>
                            <input id="file-upload" className="galryfile" type="file" accept="image/*" /> */}
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-10 col-xs-10 sendreply">
                        <button className="btn" onClick={this.submitmessage} ><img src="/static/img/submitarrow.png" />Send</button>
                        {/* <img src="/static/img/appoint-reustimg.png" className="" /> */}
                        <img src={this.props.photos.doctor_photo} style={{ width: "50px", marginLeft: "10px" }} />
                    </div>
                </div>
            </div>
        )
    }

    render() {

        return (
            <div>
                {this.state.messageinner ? this.messagein() : this.messageout()}
            </div>
        )
    }
}
export default connect(store => ({
    chatlist: store.chatlist.list,
    messages: store.chats.messages,
    photos: store.chats.photos
}),
    actions

)(Message);