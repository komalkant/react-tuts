import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'


class Map extends Component {
 

  render() {
    return (
      <GoogleMapReact
        defaultCenter={{ lat: 28.7041, lng: 77.0927 }}
        defaultZoom={3}
        style={{ height: '300px', width: '100%' }}
       
      >
        {this.props.doctors.data.map((marker, i) => {
          return (
            <div key={i} lat={marker.latitude}
              lng={marker.longitude}>
              <img data-tip data-for={`happyFace${i}`} style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'inline-block' }} src="/static/img/hospital_map.png" alt="doctor" />
              <ReactTooltip id={`happyFace${i}`} type='error'>
                <span>Dr {marker.first_name}  {marker.last_name}</span>
              </ReactTooltip>
            </div>
          )
        })}
      </GoogleMapReact>
    );
  }
}

export default connect(store => ({
  doctors: store.doctorslist.doctors
})
)(Map);