import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import * as actions from '../../actions'

class Map extends Component {
    state = {
        hover: false
    }
    addmarker = ({ lat, lng }) => {

        geocodeByAddress(`${lat},${lng}`)
            .then((result) => {
                if (result[0]) {
                    var address = result[0].formatted_address;
                    this.props.findlatlong({ lat, lng, address })
                }
                // var value = add.split(",");

                // var count = value.length;
                // var country = value[count - 1];
                // var state = value[count - 2];
                // var city = value[count - 3];
                // console.log("country", country);
                // console.log("state", state)
                // console.log("city", city)
            })
            .catch(error => console.error('Error', error))
    }
    // handleMouseEnter = () => {
    //     this.setState({ hover: true })
    // }
    // handleMouseLeave = () => {
    //     this.setState({ hover: false })
    // }
    render() {
        return (
            <GoogleMapReact
                defaultCenter={{ lat: 23.697909, lng: 46.870111 }}
                defaultZoom={5}
                style={{ height: '300px', width: '100%' }}
                onClick={this.addmarker}
            // onChildMouseEnter={this.handleMouseEnter}
            //onChildMouseLeave={this.handleMouseLeave}

            >
                {this.props.cord.map((marker, i) => {
                    {/*console.log("marker",marker);*/ }
                    return (
                        <div key={i} lat={marker.lat}

                            lng={marker.lng} className="newmap">
                            {/* <i onClick={() => { this.props.removelatlong(i) }} style={{ display: this.state.hover ? "block" : "none" }} className="fa fa-times newmapfa"></i> */}
                            <img className="newmapimg" src="/static/img/hospital_map.png"
                                alt="doctor" />
                        </div>
                    )
                })}
            </GoogleMapReact>
        );
    }
}

export default connect(store => ({
    cord: store.latlong.cord
}),
    actions
)(Map);