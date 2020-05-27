import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import * as actions from '../../../actions'

class MapAdd extends Component {
    state = {
        hover: false
    }
    addmarker = ({ lat, lng }) => {

        geocodeByAddress(`${lat},${lng}`)
            .then((result) => {
                if (result[0]) {
                    var address = result[0].formatted_address;
                    this.props.addlatlong({ lat, lng, address })
                }
            })
            .catch(error => console.error('Error', error))
    }

    render() {
        return (
            <GoogleMapReact
                defaultCenter={{ lat: 23.697909, lng: 46.870111 }}
                defaultZoom={5}
                style={{ height: '300px', width: '100%' }}
                onClick={this.addmarker}
            >
                {this.props.cord.map((marker, i) => {
                    return (
                        <div key={i} lat={marker.lat}
                            lng={marker.lng} className="newmap">
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
    cord: store.addlatlong.cord
}),
    actions
)(MapAdd);