/////////////////header///////////////////////
import React, { Component } from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import { findDOMNode } from 'react-dom';
import { browserHistory } from 'react-router';
// import $ from 'jquery'
class Header extends Component {
	state = {
		show: false,
		bottonshow: true,
		imagePreviewUrl: "",
		name: ""
	}

	logout = () => {
		const { signoutUser } = this.props;
		signoutUser();
	}
	componentWillMount() {
		var token = localStorage.getItem("token")
		const { getuserbyid } = this.props;
		if (token) {
			getuserbyid(token).then((res) => {
				if (res.code != 200) {
					console.log(res)
				} else {
					var name = res.data.first_name + " " + res.data.last_name
					this.props.Recieveuserbyid(res.data)
					this.setState({ imagePreviewUrl: res.data.photo, name })
				}
			});
			this.props.getnotification(token, 3);
		}
	}

	toggle = () => {
		var token = localStorage.getItem("token");
		this.props.removenotification(token)
		this.setState({ show: !this.state.show })
	}

	loginurl = () => {
		let { location: pathname } = this.props;
		localStorage.setItem("location", window.location.href.split('://')[1].split('/')[1]);
	}
	getmorenotification = () => {
		var token = localStorage.getItem("token");
		if (token) {
			this.props.getnotification(token).then((data) => {
				if (data.messages.length > 3) {
					this.setState({ bottonshow: false })
				}
			});
		} else {
			let { location: pathname } = this.props;
			localStorage.setItem("location", window.location.href.split('://')[1].split('/')[1]);
			browserHistory.push("/login")
		}
	}

	notificationcontent = () => {
		const { message1 } = this.props;
		if (message1.length == 0) {
			return <div className="get-time-slot text-center">no notification</div>
		} else {
			return message1.map((msg, index) => {
				return (
					<div className="notify content" key={index}>
						<div className="notify-user  pull-left">
							<img src={msg.photo} style={{ height: "50px" }} />
						</div>
						<div className="notify-details">
							<p> {msg.message}</p>
							<p className="notifytime"><i className="fa fa-clock-o" aria-hidden="true"></i>
								{msg.date}
							</p>
						</div>
					</div>
				)
			})

		}
	}

	arabiclang = () => {
		localStorage.setItem("language", "ar");
		this.props.arabic();
	}
	englishlang = () => {
		localStorage.setItem("language", "en");
		this.props.english();
	}

	renderLinks() {
		if (!this.props.authenticated) {
			return (<div className="col-sm-12 col-md-10 col-lg-9">
				<div className="my_nav">
					<nav className="navbar navbar-default">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>

						</div>

						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">


								<li className="login">
									<Link onClick={this.loginurl} to='/login'>
										<i className="fa fa-sign-in navicon" aria-hidden="true"></i>
										Login
									 </Link>
								</li>
								<li className="border">|</li>
								<li className="join">

									<Link onClick={this.loginurl} to='/signup'>
										<i className="fa fa-user-plus navicon" aria-hidden="true"></i>
										Join
                                  </Link>
								</li>

								<li className="dropdown nav_text2">
									<a href="javascript:void(0)" className="dropdown-toggle" >

										{this.props.lang == "ar" ? <div onClick={this.englishlang} className="btn btn-outlined">
											<img src="/static/img/language.png" alt="Language Icon" />
										</div> : <div onClick={this.arabiclang} className="btn btn-outlined">
												<img src="/static/img/language.png" alt="Language Icon" />
											</div>}

									</a>
									{/* <ul className="dropdown-menu">
										<li onClick={this.englishlang}><a href="javascript:void(0)">English</a>
										</li>
										<li onClick={this.arabiclang}><a href="javascript:void(0)">Arabic</a>
										</li>
									</ul> */}
								</li>

							</ul>
						</div>
					</nav>
				</div>
			</div>);
		} else {
			return (
				<div className="col-sm-12 col-md-10 col-lg-9">
					<div className="my_nav">
						<nav className="navbar navbar-default">
							<div className="navbar-header">
								<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>

							</div>
							<ul className="header_notify">
								<li id="notification_li">
									<a href="javascript:void(0)" onClick={this.toggle} id="notificationLink">
										{this.props.count > 0 ? <span id="notification_count">{this.props.count}</span> : null}
										<img src="/static/img/notification.png" />
									</a>
									<div id="notificationContainer" ref="a" style={{ display: this.state.show ? "block" : "none" }}>
										<div id="notificationTitle">Notifications</div>
										<div id="notificationsBody" className="notifications">
											{this.notificationcontent()}
										</div>
										{this.state.bottonshow ? <div onClick={this.getmorenotification} id="notificationFooter"><a href="javascript:void(0)">See More <i className="fa fa-angle-double-right" aria-hidden="true"></i></a>
										</div> : null}
									</div>
								</li>
								<li>
									<div className="inner">
										<img src={this.props.detail.photo} alt="user-name" />
										<span className="lnt-product-info">
											<span className="profile-name">{this.props.detail.first_name}</span>

											<div onClick={this.logout} className="lnt-product-price"><i className="fa fa-sign-in navicon" aria-hidden="true"></i>Logout</div>
										</span>
									</div>
								</li>

							</ul>
							<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
								<ul className="nav navbar-nav">
									<li><Link to="/">{this.props.lang == "ar" ? "منزل" : "Home"}<span className="sr-only">(current)</span></Link>
									</li>
									{localStorage.getItem("type") == 2 ? null : <li><Link to="/appointment">{this.props.lang == "ar" ? "التعيينات" : "Appoinments"}</Link></li>}

									{localStorage.getItem("type") == 2 ? null : <li><Link to="/medicalrecords">{this.props.lang == "ar" ? "السجلات الطبية" : "Medical Records"}</Link></li>}

									<li>
										{localStorage.getItem("type") == 2 ? <Link to="/doctorprofile" >{this.props.lang != "ar" ? "Settings" : "إعدادات"}</Link> : <Link to="/settings" >{this.props.lang != "ar" ? "Settings" : "إعدادات"}</Link>}

									</li>
									<li className="dropdown nav_text2">
										<a href="javascript:void(0)" className="dropdown-toggle" >
											{this.props.lang == "ar" ? <div onClick={this.englishlang} className="btn btn-outlined">
												<img src="/static/img/language.png" alt="Language Icon" />
											</div> : <div onClick={this.arabiclang} className="btn btn-outlined">
													<img src="/static/img/language.png" alt="Language Icon" />
												</div>}
										</a>
										{/* <ul className="dropdown-menu">
											<li onClick={this.englishlang}><a href="javascript:void(0)">English</a>
											</li>
											<li onClick={this.arabiclang}><a href="javascript:void(0)">Arabic</a>
											</li>
										</ul> */}
									</li>
								</ul>
							</div>
						</nav>
					</div>
				</div>
			)
		}
	}

	render() {
		return (
			<header className="header_wrapper">
				<div className="container">
					<div className="row">
						<div className="col-sm-12 col-md-2 col-lg-3">
							<div className="header_logo">
								<Link to="/" >
									{this.props.lang == "ar" ? <img className="img-responsive" src="/static/img/arablogo.jpg" alt="logo" /> : <img className="img-responsive" src="/static/img/logo.png" alt="logo" />}
								</ Link>
							</div>
						</div>
						{this.renderLinks()}
					</div>
				</div>
			</header>
		);
	}
}

export default connect(store => ({
	authenticated: store.auth.authenticated,
	count: store.notificationrecieve.count,
	message1: store.notificationrecieve.message,
	detail: store.userbyid.user,
	lang: store.langchange.lang
}),
	actions
)(Header);
