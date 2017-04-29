import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

var markers = {
  latlng: { latitude: 37.78825, longitude: -122.4324 }
}


class MapViewPins extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: [{
        key: 1,
        title: 'hello',
        latlng: {
          latitude: 37.78825,
          longitude: -122.4324
        },
      },
      {
        key: 2,
        title: 'hello',
        latlng: {
          latitude: 37.78827,
          longitude: -122.4226
        },
      }]
    }
  }


  // onRegionChange={this.onRegionChange()}>


  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}>

          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              title={marker.title}
              key={marker.key}
            //  description={marker.description}
            />
          ))}

        </MapView>
      </View>
    )
  }

  onRegionChange(region) {
    this.setState({
      region
    });
  }
}

const styles = new StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
})

export default MapViewPins;