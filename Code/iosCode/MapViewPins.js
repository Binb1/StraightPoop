import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Image, Animated } from 'react-native';
import MapView from 'react-native-maps';
import PopUpViewAdd from './PopUpViewAdd.js'

var markers = {
  latlng: { latitude: 37.78825, longitude: -122.4324 }
}


class MapViewPins extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userPosition: {
        latitude: 17.78825,
        longitude: -102.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      region: {
        latitude: 17.78825,
        longitude: -102.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: [
        {
          key: 1,
          title: 'hello',
          latlng: {
            latitude: 37.78825,
            longitude: -122.4324
          },
        },
      ],
      username: '',
      email: '',
      bottomViewAdd: -200
    }
  }

  _navigateToProfile() {
    this.props.navigator.push({
      name: 'UserPage'
    })
  }


  componentDidMount() {
    //Getting user infos
    var user = this.props.firebaseApp.auth().currentUser;
    var name, email, photoUrl, uid;

    if (user != null) {
      this.setState({
        username: user.displayName,
        email: user.email,
      });
    }

    //Getting user position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('In')
        this.setState({
          userPosition: { latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }


  //Function to auto update the region on the map
  onRegionChange(region) {
    this.setState({
      region
    });
  }

  render() {
    console.log('region', this.state.region)
    console.log('userPosition', this.state.userPosition)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          region={this.state.userPosition}
          onRegionChange={this.onRegionChange.bind(this)}>

          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              title={marker.title}
              key={marker.key}
            />
          ))}
          <MapView.Marker
            coordinate={this.state.userPosition}
          />
        </MapView>

        <TouchableOpacity onPress={() => this.plusPressed()} style={styles.plus}>
          <Image
            style={styles.plusButton}
            source={require('../../Images/plus.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._navigateToProfile.bind(this)} style={styles.profile}>
          <Image
            style={styles.profilePage}
            source={require('../../Images/profilePage.png')}
          />
        </TouchableOpacity>
        <Animated.View style={{
          flex: 3,
          height: 200,
          borderWidth: 3,
          borderColor: 'white',
          borderRadius: 10,
          position: 'absolute',
          left: 10,
          right: 10,
          bottom: this.state.bottomViewAdd,
          backgroundColor: '#FFA860',
          shadowColor: '#999999',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 2,
          shadowOpacity: 0.3
        }}>
          <PopUpViewAdd bottomViewAdd={this.state.bottomViewAdd} closePopUpViewAdd={this.closePopUpViewAdd.bind(this)}/>
        </Animated.View>
      </View>
    )
  }

  plusPressed() {
    this.setState({
      bottomViewAdd: 40
    })
  }

  closePopUpViewAdd(){
    this.setState({
      bottomViewAdd: -200
    })
  }
}

const styles = new StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F58E38'
  },
  map: {
    borderRadius: 10,
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    bottom: 20,
  },
  plus: {
    position: 'absolute',
    bottom: 40,
    right: 20
  },
  profile: {
    position: 'absolute',
    top: 40,
    right: 20
  },
  plusButton: {
    width: 70,
    height: 70,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 1.0
  },
  profilePage: {
    width: 50,
    height: 50,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 1.5
    },
    shadowRadius: 0.5,
    shadowOpacity: 1.0
  }
})

export default MapViewPins;
