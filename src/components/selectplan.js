import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Header from "./header"
import Footer from "./footer"
import { connect } from 'react-redux'
import * as actions from '../actions/index'
class SelectPlan extends Component {
    componentWillMount() {
        this.props.getsubscriptionplan()
    }
    purchaseplan = (id) => {
        this.props.purchaseplan({ id })
    }
    render() {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>subscription plan</title>
                </Helmet>
                <Header />
                <div className="content-box">
                    {/* <!-- Work Section -->  */}
                    <section className="section section-destination choose-plan">
                        {/* <!-- Title --> */}
                        <div className="section-title">
                            <div className="container">
                                <h2 className="title">Choose <span className="color">Plan</span></h2>
                                <p className="plan-desc">Vivamus tellus elit, ullamcorper sit amet libero at, maximus tristique urna. Etiam nisl justo, fermentum nec lacinia nec, pharetra id libero. Sed eu sem accumsan augue ullamcorper ornare quis bibendum orci. Duis consectetur risus sit amet lectus pulvinar facilisis. Sed facilisis massa sit amet pretium vestibulum. Maecenas sagittis, eros sit amet efficitur fringilla, lectus mi condimentum enim.</p>
                            </div>
                        </div>
                        <div className="process">
                            <div className="container">
                                <div className="row process-row">


                                    <div className="promos">
                                        {
                                            this.props.plans.map((plan, index) => {
                                                return (
                                                    <div className="promo first back">
                                                        <h3 className="price">{plan.plan}</h3>
                                                        <ul className="features">
                                                            <li>{plan.plan_description}</li>
                                                            <hr className="border" />
                                                            <li> space allowed :- {plan.space_allowed}</li>
                                                            <hr className="border" />
                                                        </ul>
                                                        <button onClick={this.purchaseplan.bind(this, plan.plan_id)} disabled={plan.plan_fee == 0} className="buy">${plan.plan_fee}/Year</button>
                                                    </div>
                                                )
                                            })
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <!-- End Work Section --> */}
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(
    store => ({
        plans: store.plans
    }),
    actions
)(SelectPlan);