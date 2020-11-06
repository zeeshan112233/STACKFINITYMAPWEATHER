/*global google*/

import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const GoogleMaps = (props) => {
  const GoogleMapExample = withGoogleMap(({ Lat, Lng }) => (
    <GoogleMap defaultCenter={{ lat: Lat, lng: Lng }} defaultZoom={10}>
      <Marker position={{ lat: Lat, lng: Lng }}></Marker>
    </GoogleMap>
  ));
  return (
    <div>
      <GoogleMapExample
        Lat={33.6844}
        Lng={73.0479}
        containerElement={<div style={{ height: `450px`, width: `1200px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default GoogleMaps;
