import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'
import * as actions from '../../../actions/index'

class Signin extends Component {
    // used to take supplied inputs and check auth
    handleFormSubmit({ email, password }) {
        // Need something to log user in
        console.log('test', email, password);
        // signinUser({ email, password });
    }

    // renderAlert() {
    //     /*if (this.props.errorMessage) {
    //         return (
    //             <div className="alert alert-danger">
    //                 <strong>Oops!</strong> {this.props.errorMessage}
    //             </div>
    //         );
    //     }*/
    // }

    render() {
        // handleSubmit is a built in redux-form helper to bind ui to values
        const { handleSubmit, dispatch } = this.props;
        console.log("props", this.props);
        // console.log("actions", actions);

        // dispatch(actions.getSpecility());

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field name="email" component="input" type="text" required className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field name="password" component="input" type="password" required className="form-control" />
                </fieldset>
                {/*{this.renderAlert()}*/}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

Signin.propTypes = {
    // signinUser: PropTypes.func,
    // errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func
};

function mapStateToProps(stateform) {
    // console.log("state", state)
    return { stateform };
}

export default connect( mapStateToProps,  actions)(reduxForm({
    form: 'signin'
})(Signin));
