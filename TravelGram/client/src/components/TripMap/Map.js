import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import darkTheme from './MapStyle';

export class MapContainer extends React.Component {
  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: darkTheme,
    });
  }

  render() {
    return (
      <div style={this.props.style}>
        <Map
          google={this.props.google}
          zoom={8}
          options={{
            styles: darkTheme,
          }}
          initialCenter={this.props.coordinates}
          center={this.props.coordinates}
          onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}>
          {this.props.markers.map((marker, index) => {
            return (
              <Marker
                key={index}
                id={index}
                position={{
                  lat: marker.lat,
                  lng: marker.lng,
                }}
                onClick={() => this.props.onMarkerClick(marker)}
              />
            );
          })}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
