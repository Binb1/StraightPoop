import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Image, Animated } from 'react-native';
import MapView from 'react-native-maps';
import PopUpViewAdd from './PopUpViewAdd.js'
import PopUpViewClick from './PopUpViewClick.js'

const timer = require('react-native-timer');



var northPole = {
  latitude: -90,
  longitude: -180,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

globalCounter = 0
called = false

var markersBis = [];
var markersAux = [

]
var markers = []
var keyStorage = []
var displayPressed = false


class MapViewPins extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsRef: this.props.firebaseApp.database().ref('/custom'),
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
      username: '',
      email: '',
      bottomViewAdd: -250,
      bottomViewClick: -200,
      markerPointerAdd: {
        latitude: -90,
        longitude: -180,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markerPointerAddValue: {
        latitude: 17.78825,
        longitude: -102.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      addingPin: false,
      checkCompleteBool: false
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
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        this.setState({
          userPosition: { latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
          region: { latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        },
          this.geoQueryLauncher(latitude, longitude));
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );


    timer.setInterval('deepshit', () => this.deepShit(), 3000);
    timer.setInterval('trickedMove', () => this.trickedMove(), 2000)
    timer.setInterval('getPins', () => this.geoQueryLauncher(this.state.region.latitude, this.state.region.longitude), 10000)

  }



  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}>

          {markers.map(marker => (
            <MapView.Marker
              onPress={() => this.displayPopUpClick()}
              coordinate={marker.latlng}
              image={marker.image}
              key={marker.key}
            />
          ))}
          <MapView.Marker
            coordinate={this.state.userPosition}
          />
          <MapView.Marker
            coordinate={this.state.markerPointerAdd}
            pinColor={'blue'}
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
          height: 250, borderWidth: 3, borderColor: 'white', borderRadius: 10, position: 'absolute', left: 10, right: 10, bottom: this.state.bottomViewAdd,
          backgroundColor: '#FFA860', shadowColor: '#999999', shadowOffset: { width: 0, height: 3 }, shadowRadius: 2, shadowOpacity: 0.3
        }}>
          <PopUpViewAdd bottomViewAdd={this.state.bottomViewAdd} closePopUpViewAdd={this.closePopUpViewAdd.bind(this)} geofire={this.props.geofire} firebaseApp={this.props.firebaseApp} markerPointerAddValue={this.state.markerPointerAdd} />
        </Animated.View>
        <Animated.View style={{
          height: 200, borderWidth: 3, borderColor: 'white', borderRadius: 10, position: 'absolute', left: 10, right: 10, bottom: this.state.bottomViewClick,
          backgroundColor: '#FFA860', shadowColor: '#999999', shadowOffset: { width: 0, height: 3 }, shadowRadius: 2, shadowOpacity: 0.3
        }}>
          <PopUpViewClick closePopUpViewAdd={this.closePopUpViewClick.bind(this)} geofire={this.props.geofire} firebaseApp={this.props.firebaseApp} region={this.state.region} />
        </Animated.View>
      </View>
    )
  }

  //Function to auto update the region on the map
  onRegionChange(region) {
    this.setState({
      region,
    });
    if (this.state.addingPin == true) {
      this.setState({
        markerPointerAdd: region
      })
    }
    if (!called) {
      this.deepShit()
    }
  }

  //Crazy function - Does a big part of the job to display pins
  deepShit() {
    var items = [];
    console.log(keyStorage.length)
    for (var j = 0; j < keyStorage.length; j++) {
      if (keyStorage[j] != null) {
        this.state.itemsRef.child(keyStorage[j]).on('value', (snap) => {
          // get children as an array
          items.push({
            name: snap.val().name,
            grade: snap.val().grade,
            negative: snap.val().negative,
            positive: snap.val().positive,
            pay: snap.val().pay,
            _key: snap.key
          });
        });
      }

    }
    console.log(items)
    console.log(globalCounter)

    if (items.length > 0) {
      markers = []
      for (var i = 0; i < items.length; i++) {
        markers.push({ key: items[i]._key, latlng: markersAux[items[i]._key].latlng, image: this.rightImage(items[i]) })
        console.log(markers)
        called = true
      }
    }
  }

  //How to trick users
  trickedMove() {
    this.setState({
      region: this.state.region
    })
  }

  //Other crazy function, called to get the pins from the database
  geoQueryLauncher(latitude, longitude) {
    var geoQuery = this.props.geofire.query({
      center: [this.state.region.latitude, this.state.region.longitude],
      radius: 3000,
    });
    var counter = 3;
    keyStorage = []
    markersAux = []
    var variable = geoQuery.on("key_entered", function (key, location, distance) {
      console.log(key + " entered query at " + location[0] + " (" + distance + " km from center)");
      keyStorage[counter - 3] = key
      markersAux[key] = { key: counter, title: 'hello', latlng: { latitude: location[0], longitude: location[1] } }
      globalCounter++
      counter++;
    })
  }

  //Function called when plus button is clicked
  plusPressed() {
    this.setState({
      bottomViewAdd: 40,
      addingPin: true,
      markerPointerAdd: this.state.userPosition
    })
  }

  //Func called when close is clicked on the Add popup 
  closePopUpViewAdd() {
    this.setState({
      bottomViewAdd: -250,
      addingPin: false,
      markerPointerAddValue: this.state.markerPointerAddValue,
      markerPointerAdd: northPole
    })
  }

  //Func called when close is called on the Rating popup
  closePopUpViewClick() {
    this.setState({
      bottomViewClick: -200,
    })
  }

  //Func called when click on a pin
  displayPopUpClick() {
    this.setState({
      bottomViewClick: 40
    })
  }

  //Function used to determine which pin to display
  rightImage(items) {
    if (items.pay && items.positive >= items.negative) {
      return require('../../Images/GreenMoney.png')
    }
    if (!items.pay && items.positive >= items.negative) {
      return require('../../Images/Green.png')
    }
    if (items.pay && items.positive < items.negative) {
      return require('../../Images/RedMoney.png')
    }
    if (!items.pay && items.positive < items.negative) {
      return require('../../Images/red1.png')
    }
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
    top: 60,
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
  },
  marker: {
    width: 60,
    height: 75
  }
})

export default MapViewPins;
