import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux'


class Map extends Component {

  state = {
    lat: 28.7041,
    lng: 77.0927
  }
  componentWillMount() {
    // console.log("will mount", this.props.hospitals)
  }

  render() {
    if (this.props.hospitals.length > 0) {
      // console.log(`hospital${this.props.ind}`, this.props.hospitals[this.props.ind].lat)
      if (this.state.lat != this.props.hospitals[this.props.ind].lat) {
        // this.setState({ lat: this.props.hospitals[this.props.ind].lat, lng: this.props.hospitals[this.props.ind].lng })
      }
    }
    return (
      <GoogleMapReact
        defaultCenter={{ lat: 24.13979195001079, lng: 45.02440787499992 }}
        // center={this.state}
        defaultZoom={3}
        style={{ height: '150px', width: '100%' }}
        ref={`map${this.props.ind}`}

      >

        {this.props.hospitals.map((hospital, i) => {
          if (this.props.ind == i) {
            return (
              <div key={i} lat={hospital.lat}
                lng={hospital.lng}>
                <img style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'inline-block' }} src="/static/img/hospital_map.png" alt="doctor" />
              </div>
            )
          }

        })}
      </GoogleMapReact>
    );
  }
}

export default connect(store => ({
  hospitals: store.hospitals
})
)(Map);