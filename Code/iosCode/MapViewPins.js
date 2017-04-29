import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import MapView from 'react-native-maps';

var markers = {
  latlng: { latitude: 37.78825, longitude: -122.4324 }
}


class MapViewPins extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: ''
    }
  }

  componentWillMount(){
    var user = this.props.firebaseApp.auth().currentUser;
    var name, email, photoUrl, uid;

    if (user != null) {
      this.setState({
        username: user.displayName,
        email: user.email,
      });
    }
  }

  _navigateToProfile(){
    this.props.navigator.push({
      name: 'UserPage'
    })
    }


  componentDidMount(){
    //Getting user position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var userPosition = JSON.stringify(position);
        this.setState({userPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }


  // onRegionChange={this.onRegionChange()}>
  render() {
    console.log(this.state.userPosition)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} >
          </MapView>
          <TouchableOpacity onPress={this._navigateToProfile.bind(this)} style={styles.profile}>
            <Text>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._navigateToProfile.bind(this)} style={styles.profile}>
            <Text>Profile</Text>
          </TouchableOpacity>
      </View>
    )
  }

  //Function to auto update the region on the map
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
  },
  logout: {
    backgroundColor: '#FF0000',
    height: 40,
    borderRadius: 4,
    right:0,
  },
  profile: {

  }
})

export default MapViewPins;
