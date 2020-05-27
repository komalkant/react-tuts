import React, { Component } from 'react'
import Header from '../header'
import { connect } from 'react-redux'
import Footer from '../footer'
import { Link } from 'react-router'
import * as actions from '../../actions/index'
import ProfileDoc from './profiledoc'
import Prefer from './prefer'
import Message from './pmessage'
import Myprofile from './myprofile'
import Changepass from './changepassword'
import CancelAppoint from './cancelappointment'
import DeleteAccount from './delete'
// import { findDOMNode } from 'react-dom';

class Settings extends Component {
    state = {
        tab: "Profile"

    }

    componentWillMount() {

    }



    render() {
        const { user } = this.props;
        return (
            <div>
                <Header />
                <div className="breadcrumb">
                    <div className="container">
                        <nav id="breadcrumb-trail">
                            <ol>
                                <li><Link to="/home"><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
                                <li className="active"><Link to="/settings">Settings</Link></li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="content-box">
                    <div className="container">
                        <div className="row user-tabs ui-tabs ui-widget ui-corner-all ui-tabs-vertical ui-helper-clearfix">
                            <div className="col-sm-4 col-md-4">
                                <div className="user-setting">
                                    <div className="user-navigation">
                                        <div className="user-avatar"><img src={this.props.user.photo} alt="user avatar" />
                                        </div>
                                        <h3 className="user-name">{this.props.user.first_name} {this.props.user.last_name}</h3>

                                        <ul role="tablist" className="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-corner-all">
                                            <li onClick={() => { this.setState({ tab: "Profile" }) }} className={this.state.tab == "Profile" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="0" aria-controls="htlfndr-user-tab-5" aria-labelledby="ui-id-5" aria-selected="true" aria-expanded="true"><a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-1"><span className="listicon">
                                                <figure className="active-image"><img src="/static/img/profile-active.png" id="image-2" />
                                                </figure>
                                                <figure className="noactive"><img src="/static/img/profile-icon.png" id="image-2" /></figure>
                                            </span> My Profile</a>
                                            </li>
                                            <li onClick={() => { this.setState({ tab: "Password" }) }} className={this.state.tab == "Password" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-2" aria-labelledby="ui-id-2" aria-selected="false" aria-expanded="false"><a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-2"><span className="listicon">
                                                <figure className="other-image"><img src="/static/img/change-pass.png" id="image-2" />
                                                </figure>
                                                <figure className="activeimg"><img src="/static/img/change-passactive.png" id="image-2" /></figure>
                                            </span>Change Password</a>
                                            </li>
                                            <li onClick={() => { this.setState({ tab: "Profiledoc" }) }} className={this.state.tab == "Profiledoc" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="0" aria-controls="htlfndr-user-tab-5" aria-labelledby="ui-id-5" aria-selected="true" aria-expanded="true"><a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-1"><span className="listicon">
                                                <figure className="active-image"><img src="/static/img/img5.png" id="image-2" />
                                                </figure>
                                                <figure className="noactive"><img src="/static/img/img1d.png" id="image-2" /></figure>
                                            </span>Profile Document</a>
                                            </li>
                                            <li onClick={() => { this.setState({ tab: "Preferences" }) }} className={this.state.tab == "Preferences" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="0" aria-controls="htlfndr-user-tab-5" aria-labelledby="ui-id-5" aria-selected="true" aria-expanded="true"><a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-1"><span className="listicon">
                                                <figure className="active-image"><img src="/static/img/img2.png" id="image-2" />
                                                </figure>
                                                <figure className="noactive"><img src=" /static/img/img1a.png" id="image-2" /></figure>
                                            </span>Preferences</a>
                                            </li>
                                            <li onClick={() => { this.setState({ tab: "message" }) }} className={this.state.tab == "message" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                                                <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                                    <figure className="other-image"><img src="/static/img/img1c.png" id="image-2" />
                                                    </figure>
                                                    <figure className="activeimg"><img src="/static/img/img4.png" id="image-2" /></figure>
                                                </span>Messages</a>
                                            </li>
                                            {/* <li onClick={() => { this.setState({ tab: "cancel" }) }} className={this.state.tab == "cancel" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false"><a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                                <figure className="other-image"><img src="/static/img/bellicon.png" id="image-2" />
                                                </figure>
                                                <figure className="activeimg"><img src="/static/img/bellactive.png" id="image-2" /></figure>
                                            </span> Cancel Appointment</a>
                                            </li> */}

                                            <li onClick={() => { this.setState({ tab: "delete" }) }} className={this.state.tab == "delete" ? "ui-state-default ui-tabs-active ui-state-active" : "ui-state-default"} role="tab" tabindex="-1" aria-controls="htlfndr-user-tab-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                                                <a href="javascript:void(0)" className="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3"><span className="listicon">
                                                    <figure className="other-image">
                                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                    </figure>
                                                    <figure className="activeimg">
                                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                    </figure>
                                                </span>Delete Account</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {this.state.tab == "message" ? <Message /> : null}

                            {this.state.tab == "Password" ?
                                <Changepass /> : null}
                            {this.state.tab == "Profile" ?
                                <Myprofile />
                                : null}

                            {this.state.tab == "Profiledoc" ?
                                <ProfileDoc />
                                : null}
                            {this.state.tab == "Preferences" ?
                                <Prefer />
                                : null}

                            {this.state.tab == "cancel" ?
                                <CancelAppoint />
                                : null}

                            {this.state.tab == "delete" ?
                                <DeleteAccount />
                                : null}
                        </div>
                    </div>
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
                <div id="snackbar">{this.state.content}</div>
                <Footer />
            </div>
        )
    }
}
export default connect(store => ({
    user: store.userbyid.user
}),
    actions

)(Settings);