import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

 
const Marker = () =>  {
  return (
    <div className="contacts__map-marker">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
      </svg>
    </div>
  )  
}

class ContactsSimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 40.17848684362067,
      lng: 44.525580326895074
    },
    zoom: 16
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBabXGDNHaGD1A-xNxkW-hxDVGXL2-PZf4" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}> 
          < Marker
           
            lat={40.17848684362067}
            lng={44.525580326895074}
            text="Smile Clinic"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default ContactsSimpleMap;