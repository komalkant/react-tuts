import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import moment from 'moment';


class DoctorProfileSidebar extends Component {
    state = {
        imagePreviewUrl: "",
        name: ""
    }

    render() {
        return (<div className="col-sm-4 col-md-3 col-xs-12">
            <div className="user-setting">
                <div className="user-navigation">
                    <div className="user-avatar">
                        <img src={this.props.user.photo} alt="user avatar" />
                    </div>
                    <h3 className="user-name">{this.props.user.first_name} {this.props.user.last_name}</h3>

                    <ul role="tablist" className="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-corner-all">
                        <li onClick={() => { this.props.doctorprofile() }} className={this.props.tab == "profile" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="0" aria-controls="htlfndr-user-tab-5" aria-labelledby="ui-id-5" aria-selected="true" aria-expanded="true">
                            <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-1"><span className="listicon">
                                <figure className="active-image"><img src="/static/img/profile-active.png" id="image-2" />
                                </figure>
                                <figure className="noactive"><img src="/static/img/profile-icon.png" id="image-2" /></figure>
                            </span>My Profile</a>
                        </li>
                        <li onClick={() => { this.props.doctorappointment() }} className={this.props.tab == "appointment" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-2" aria-labelledby="ui-id-2" aria-selected="false" aria-expanded="false">
                            <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-2"><span className="listicon">
                                <figure className="other-image"><img src="/static/img/img1a0.png" id="image-2" />
                                </figure>
                                <figure className="activeimg"><img src="/static/img/img1.png" id="image-2" /></figure>
                            </span>Appointment Requests</a>
                        </li>
                        <li onClick={() => { this.props.doctoravailability() }} className={this.props.tab == "avail" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                            <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                <figure className="other-image"><img src="/static/img/img1a.png" id="image-2" />
                                </figure>
                                <figure className="activeimg"><img src="/static/img/img2.png" id="image-2" /></figure>
                            </span>Availablities</a>
                        </li>
                        <li onClick={() => { this.props.doctorsappointment() }} className={this.props.tab == "appoint" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                            <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                <figure className="other-image"><img src="/static/img/img1b.png" id="image-2" />
                                </figure>
                                <figure className="activeimg"><img src="/static/img/img3.png" id="image-2" /></figure>
                            </span>Scheduled Appointments</a>
                        </li>
                        <li onClick={() => { this.props.doctormessage() }} className={this.props.tab == "message" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                            <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                <figure className="other-image"><img src="/static/img/img1c.png" id="image-2" />
                                </figure>
                                <figure className="activeimg"><img src="/static/img/img4.png" id="image-2" /></figure>
                            </span>Messages</a>
                        </li>
                        <li onClick={() => { this.props.doctorbilling() }} className={this.props.tab == "billing" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                            <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                <figure className="other-image"><img src="/static/img/img1d.png" id="image-2" />
                                </figure>
                                <figure className="activeimg"><img src="/static/img/img5.png" id="image-2" /></figure>
                            </span>Billings</a>
                        </li>

                        <li onClick={() => { this.props.doctorpass() }} className={this.props.tab == "pass" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                            <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                <figure className="other-image"><img src="/static/img/img1e.png" id="image-2" />
                                </figure>
                                <figure className="activeimg"><img src="/static/img/img6.png" id="image-2" /></figure>
                            </span>Change Password</a>
                        </li>

                        <li onClick={() => { this.props.doctorsetting() }} className={this.props.tab == "set" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                            <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                <figure className="other-image"><img src="/static/img/img1f.png" id="image-2" />
                                </figure>
                                <figure className="activeimg"><img src="/static/img/img7.png" id="image-2" /></figure>
                            </span>Insurance</a>
                        </li>
                        <li onClick={() => { this.props.doctorlink() }} className={this.props.tab == "link" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                            <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                <figure className="other-image">
                                    <i className="fa fa-twitter-square"></i>
                                </figure>
                                <figure className="activeimg">
                                    <i className="fa fa-twitter-square"></i>
                                </figure>
                            </span>Social Links</a>
                        </li>
                        <li onClick={() => { this.props.doctorfeed() }} className={this.props.tab == "feed" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                            <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                <figure className="other-image"> <i className="fa fa-comments-o"></i>
                                </figure>
                                <figure className="activeimg"><i className="fa fa-comments-o"></i></figure>
                            </span>Feedback</a>
                        </li>
                        <li onClick={() => { this.props.doctorlocation() }} className={this.props.tab == "loc" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                            <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                <figure className="other-image"><i className="fa fa-map-marker"></i>
                                </figure>
                                <figure className="activeimg"><i className="fa fa-map-marker"></i></figure>
                            </span>Location</a>
                        </li>
                        <li onClick={() => { this.props.doctordelete() }} className={this.props.tab == "del" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                            <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                <figure className="other-image"><i className="fa fa-trash-o"></i>
                                </figure>
                                <figure className="activeimg"><i className="fa fa-trash-o"></i></figure>
                            </span>Delete Account</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        );
    }
}
export default connect(store => ({
    tab: store.profiletab.text,
    user: store.userbyid.user
}),
    actions

)(DoctorProfileSidebar);