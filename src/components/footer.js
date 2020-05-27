//////////////////footer////////////////////
import React, { Component } from 'react'
import { Link } from 'react-router';

class Footer extends Component {

	render() {
		return (
			<footer className="main-footer">
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							<div className="widget widget_links">
								<figure><img src="/static/img/footer-logo.png" /></figure>
								<p className="about-us">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus fermentu mdui, sodales bibendum mauris fermen tum eu.
                               </p>
								<h5 className="widget-title">Follows Us</h5>
								<ul className="clean-list social-block">
									<li>
										<a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
									</li>
									<li>
										<a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
									</li>
									<li>
										<a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
									</li>
									<li>
										<a href="#"><img src="/static/img/whatapp.png" className="whatapp" /></a>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-md-3">
							<div className="widget widget_links">
								<h5 className="widget-title">Specialities</h5>
								<ul>
									<li><Link to="/doctorlist?specility=2&locations=&insurance=">Allergist (Immunologist)</Link></li>
									<li><Link to="/doctorlist?specility=1&locations=&insurance=">Cardiologist (Heart Doctor)</Link></li>
									<li><Link to="/doctorlist?specility=3&locations=&insurance=">Chiropractor</Link></li>
									<li><Link to="/doctorlist?specility=4&locations=&insurance=">Dentist</Link></li>
									<li><Link to="/doctorlist?specility=5&locations=&insurance=">Dermatologist</Link></li>

								</ul>
							</div>
						</div>

						<div className="col-md-3">
							<div className="widget widget_social useful_link">
								<ul>
									<li><Link to="/doctorlist?specility=6&locations=&insurance=">Dietitian / Nutritionist</Link></li>
									<li><Link to="/doctorlist?specility=7&locations=&insurance=">Ear, Nose & Throat Doctor (ENT)</Link></li>
									<li><Link to="/doctorlist?specility=8&locations=&insurance=">Endocrinologist</Link></li>
									<li><Link to="/doctorlist?specility=9&locations=&insurance=">Eye Doctor</Link></li>
									<li><Link to="/doctorlist?specility=10&locations=&insurance=">Gastroenterologist</Link></li>

								</ul>


							</div>
						</div>

						<div className="col-md-3">
							<div className="widget widget_links">
								<h5 className="widget-title">Contact us</h5>
								<ul id="services-list">
									<li className="address"><span><img src="/static/img/address-icon.png" className="image" /></span>
										<div className="content">
											<p>71 Pilgrim Avenue </p>
											<p>Chevy Chase, MD 20815</p>
										</div>
									</li>

									<li><span><img src="/static/img/phone-icon.png" className="image" /></span>
										<div className="content">
											<p>(234) 254 6685 2345</p>
											<p>  (234) 254 6685 2346</p>
										</div>
									</li>
									<li><span><img src="/static/img/mail-icon.png" className="image" /></span>
										<div className="content">
											<p><a href="mailto:info@rozenamah.au">info@rozenamah.au</a><br />
												<a href="mailto:support@rozenamah.au"> support@rozenamah.au</a></p>
										</div></li>
								</ul>
							</div>
						</div>
					</div>
				</div>

			</footer>
		)
	}
}

export default Footer;