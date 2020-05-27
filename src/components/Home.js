////////////////////////home page//////////////////////////////
import React, { Component } from 'react'
import Header from './header'
import Footer from './footer'
import SearchForm from '../containers/Search'
import { Helmet } from "react-helmet";
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actions/index'

class HomePage extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Home Page</title>
                </Helmet>
                <Header />
                {/*<!-- Main Content -->*/}
                <div className="content-box">
                    {/*<!-- Hero Section -->*/}
                    <section className="section section-hero">
                        <div className="hero-box"> </div>

                        {/*<!-- Statistics Box -->*/}
                        <div className="container">
                            <div className="statistics-box">
                                <div className="statistics-item">
                                    <div className="form-style-8">
                                        <SearchForm />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                    {/*<!-- Work Section -->*/}
                    <section className="section section-destination">
                        {/*<!-- Title -->*/}
                        <div className="section-title">
                            <div className="container">
                                <h2 className="title">How it <span className="color">Works</span></h2>
                                <p className="sub-title">Ut egestas libero risus, sed semper est malesuada sed. Donec <br />dapibus nisl in tortor dignissim, et lobortis justo rutrum.</p>
                            </div>
                        </div>


                        <div className="process">
                            <div className="container">
                                <div className="row process-row">
                                    <div className="col-sm-4 col-md-4 process-step process-icon">
                                        <div className="process-box"><img src="/static/img/icon-1.png" className="img-responsive" alt="Search Your Doctor" /></div>
                                        <p className="title">Search Your Doctor</p>
                                        <p className="text-center">Ut egestas libero risus, sed semper est males<br /> uada sed donec dapibus nisl in tortor.</p>
                                    </div>
                                    <div className="col-sm-4 col-md-4 process-step process-icon ProcessStep">
                                        <div className="process-box"><img src="/static/img/icon-2.png" className="img-responsive" alt="Book Your Appointment" /></div>
                                        <p className="title">Book Your Appointment</p>
                                        <p className="text-center">Ut egestas libero risus, sed semper est males<br /> uada sed donec dapibus nisl in tortor.</p>
                                    </div>
                                    <div className="col-sm-4 col-md-4 process-step process-last">
                                        <div className="process-box"><img src="/static/img/icon-3.png" className="img-responsive" alt="You're All Done!" /></div>
                                        <p className="title">You’re All Done!</p>
                                        <p className="text-center">Ut egestas libero risus, sed semper est males <br />uada sed donec dapibus nisl in tortor.</p>
                                    </div>

                                </div>
                            </div>
                        </div>



                    </section>
                    {/*<!-- End Work Section -->*/}
                    {/*<!-- Hospital Section -->*/}
                    <div className="section parallax-box">
                        <div className="container-fluid">
                            <div className="row">
                                <div className=" col-md-6 col-lg-6 no-padding">
                                    {this.props.lang == "ar" ? <img src="/static/img/arabic-home.png" className="img-responsive" /> : <img src="/static/img/reception.png" className="img-responsive" />}

                                </div>

                                <div className=" col-md-6 col-lg-6 blue-half">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-lg-9">
                                                <div className="hero-text details">
                                                    <h2 className="doctor-title">Doctor’s <span className="color-White">Benefits</span></h2>
                                                    <ul className="benefit_list">
                                                        <li> <i className="fa fa-caret-right" aria-hidden="true"></i>{this.props.lang == "ar" ? "يعمل التطبيق على مدار الساعة ٧/٢٤، تقليص فرص ضياع المواعيد في اوقات خارج الدوام." : "Our app works around the o'clock 24/7, no more loosing appointments after work hours. "}</li>
                                                        <li><i className="fa fa-caret-right" aria-hidden="true"></i>{this.props.lang == "ar" ? "صداع أقل تكاليف أقل لإختيار برامج الحجوزات المناسبة وصيانتها وتعيين طاقم لحجز المواعيد." : "Less headache, less cost of selecting and buying the right reservation system, hiring staff for appointments scheduling, and maintaining the system."}</li>
                                                        <li><i className="fa fa-caret-right" aria-hidden="true"></i>{this.props.lang == "ar" ? "فريق خدمة العملاء لدينا سيعمل من أجل تأكيد حجوزات مرضاكم وتذكيرهم بالمواعيد." : "Our customer service will work in your behalf insuring patients booking, sending reminder or canceling appointments."}</li>
                                                        <li><i className="fa fa-caret-right" aria-hidden="true"></i>{this.props.lang == "ar" ? "يوفر التطبيق منصة تسويقية هائلة عن طريق البرنامج ووسائل التواصل الإجتماعي التابعه له." : "Effective marketing platform through our app and social media."}</li>
                                                    </ul>
                                                    <button className="practice_button">
                                                        {this.props.authenticated ? <a href="javascript:void(0)">List Your Practice</a> : <Link to="/doctorsignup" >List Your Practice</Link>}
                                                    </button>
                                                    {/* <Link to="/doctorsignup" className="practice_button">List Your Practice</Link> */}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                    {/*<!-- End Hospital Section -->*/}

                    {/*<!-- Patient Section -->*/}
                    <div className="section patient-box">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="containerbox">
                                        <h2 className="patient_title">Patient  <span className="color-blue">Benefits</span></h2>
                                        <ul className="patient_list">
                                            <li> <i className="fa fa-caret-right" aria-hidden="true"></i>{this.props.lang == "ar" ? "الراحة والسهولة: يعمل البرنامج على مدار الساعة ٧/٢٤، الإنتظار على الهاتف أصبح من الماضي. سهولة البحث على الطبيب المفضل حسب التخصص والموقع والوقت المناسب." : "Convenience  & Ease: No more phone calls, no worry of calling after work hours our application will serve you 24/7. Searching for a doctors never been easy, search for the right doctors by speciality, availability or location."}</li>
                                            <li><i className="fa fa-caret-right" aria-hidden="true"></i>{this.props.lang == "ar" ? "الخصوصية والحماية: نستخدم أفضل التقنيات المتاحة لحماية بياناتك الشخصية، نحن نأخذ مايقلقك بشكل جدي." : "Privacy & security: we uses some of the most advance technology for internet security, we take your concern seriously."}</li>
                                            <li><i className="fa fa-caret-right" aria-hidden="true"></i>{this.props.lang == "ar" ? "خدمة العملاء: رسالة فريق عملنا هي الحرص على تأكيد مواعيد حجوزاتك." : "Customer service: our team mission is to insure getting your appointment confirmed."}</li>
                                            <li><i className="fa fa-caret-right" aria-hidden="true"></i>{this.props.lang == "ar" ? "الوقت: الحصول على موعد قد يأخذ أسابيع وشهور والإنتظار لمعاينة الطبيب قد تأخذ ساعات، سنعمل بكل طاقتنا لتحسين طريقة حياتك بتغيير الأنماط السائدة." : "Reduce time: getting appointments with good doctors might take weeks or months, then waiting to see a doctors will take hours ...... well we will work hard to improve your way of living."}</li>
                                            {/* <li><i className="fa fa-caret-right" aria-hidden="true"></i>Ut egestas libero risus, sed semper est malesuada sed. Done dapibus nisl in tortor dignissim, et lobortis justo rutrum.</li> */}


                                        </ul>


                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <figure><img src="/static/img/patient.jpg" className="img-responsive" /></figure>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*<!-- End Patient Section -->*/}

                </div>

                {/*<!-- Footer -->*/}
                <Footer />
                <div className="bottom_footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <p className="text-center copyright">© 2017 Rozenamah. All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export default HomePage;
export default connect(
    store => ({
        authenticated: store.auth.authenticated,
        lang: store.langchange.lang
    }),
    actions
)(HomePage);