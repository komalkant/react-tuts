import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actions from '../../actions/index'

class ProfileDoc extends Component {
    state = {
        imagePreviewUrl1: "",
        // imagePreviewUrl2: "",
        imagePreviewUrl3: ""
    }
    Insurance = async (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file1: file,
                imagePreviewUrl3: reader.result
            });
        }

        var a = await reader.readAsDataURL(file);
    }

    // Iqama = async (e) => {
    //     e.preventDefault();

    //     let reader = new FileReader();
    //     let file = e.target.files[0];

    //     reader.onloadend = () => {
    //         this.setState({
    //             file2: file,
    //             imagePreviewUrl2: reader.result
    //         });
    //     }

    //     var a = await reader.readAsDataURL(file);
    // }

    National = async (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file3: file,
                imagePreviewUrl1: reader.result
            });
        }

        var a = await reader.readAsDataURL(file);
    }
    submitdoc = () => {
        this.props.documents_of_patient({
            national_card: this.state.imagePreviewUrl1,
            // iqama: this.state.imagePreviewUrl2,
            insurance_card: this.state.imagePreviewUrl3
        }).then((res) => {
            // console.log("res", res)
            this.setState({ content: res.message, imagePreviewUrl1: "", imagePreviewUrl2: "", imagePreviewUrl3: "" })
            var x = document.getElementById("snackbar")
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        })
    }

    render() {

        return (
            <div className="user-panel pro-doc col-md-8 col-sm-8 setting-page ui-tabs-panel ui-widget-content ui-corner-bottom" id="htlfndr-user-tab-5" aria-labelledby="ui-id-5" role="tabpanel" aria-hidden="true" >
                <div className="aponireqst">
                    <h3>Profile Document</h3>
                    <hr />



                    <div className="ImageView">
                        {this.state.imagePreviewUrl1 != "" ? <img src={this.state.imagePreviewUrl1} alt="Image" className="img-responsive" />
                            : null}
                        {this.state.imagePreviewUrl1 != "" ? <h5 className="text-center">National ID No</h5> : null}
                    </div>
                    {/* <div className="ImageView">
                        {this.state.imagePreviewUrl2 != "" ? <img src={this.state.imagePreviewUrl2} alt="Image" className="img-responsive" />
                            : null}
                        {this.state.imagePreviewUrl2 != "" ? <h5 className="text-center">Resident Permit Card</h5> : null}
                    </div> */}
                    <div className="ImageView">
                        {this.state.imagePreviewUrl3 != "" ?
                            <img src={this.state.imagePreviewUrl3} alt="Image" className="img-responsive" />
                            : null}
                        {this.state.imagePreviewUrl3 != "" ? <h5 className="text-center">Insurance Card</h5> : null}
                    </div>

                </div>
                <div className="col-md-12 col-xs-12 nopad">
                    <label htmlFor="iqama">National ID No. / Resident Permit No.</label>
                    <div className="form-group">
                        <input onChange={this.National} ref="img1" type="file" id="national_card" name="iqama" className="form-control" />
                        <i onClick={() => { this.refs.img1.value = ""; this.setState({ imagePreviewUrl1: "" }) }} className="fa fa-times crosfild"></i>
                    </div>
                </div>
                {/* <div className="col-md-12 col-xs-12 nopad">
                    <label htmlFor="iqama">Iqama (Resident Permit Card)</label>
                    <div className="form-group">

                        <input onChange={this.Iqama} ref="img2" type="file" id="national_card" name="iqama" className="form-control" />
                        <i onClick={() => { this.refs.img2.value = ""; this.setState({ imagePreviewUrl2: "" }) }} className="fa fa-times crosfild"></i>
                    </div>
                </div> */}
                <div className="col-md-12 col-xs-12 nopad">
                    <label htmlFor="iqama">Insurance Card</label>
                    <div className="form-group">

                        <input onChange={this.Insurance} ref="img3" type="file" id="national_card" name="iqama" className="form-control" />
                        <i onClick={() => { this.refs.img3.value = ""; this.setState({ imagePreviewUrl3: "" }) }} className="fa fa-times crosfild"></i>
                    </div>
                </div>
                <div className="col-md-12 col-xs-12 nopad">
                    <button onClick={this.submitdoc} className="btn btn-primary" type="button">Submit</button>
                </div>
                <div id="snackbar">{this.state.content}</div>
            </div>


        )
    }
}
export default connect(store => ({

}),
    actions

)(ProfileDoc);