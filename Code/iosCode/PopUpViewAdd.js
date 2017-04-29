import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Image, TextInput } from 'react-native';
import MapView from 'react-native-maps';

class PopUpViewAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nameOfThePlace: '',
      thumbsUp: require('../../Images/thumbs-up-white.png'),
      thumsDown: require('../../Images/dislike-thumb-white.png')
    }
  }

  componentWillMount(){
    var user = this.props.firebaseApp.auth().currentUser;

    if (user != null) {
      this.setState({
        email: user.email,
      });
    }
  }

  componentDidMount() {

  }


  //Function to auto update the region on the map
  onRegionChange(region) {
    this.setState({
      region
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="   Enter the name of the place"
          onChangeText={(text) => this.setState({nameOfThePlace})}
        />
        <View style={styles.buttonContainer}>
          <Image
            style={{height: 50, width: 50}}
            source={this.state.thumsDown}
          />
          <Image
          style={{height: 50, width: 50}}
            source={this.state.thumbsUp}
          />
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.savePin.bind(this)} style={styles.profile}>
            <Text>SAVE</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }


//latitude: 37.78825,
//longitude: -122.4324,
  savePin(){
    this.props.geofire.set('Potatoes',[37.78835, -122.4326]).then(function() {
      console.log("Provided keys have been added to GeoFire");
    }, function(error) {
      console.log("Error: " + error);
    });
  }

}

const styles = new StyleSheet.create({
  container: {
    flex: 3,
    height: 200,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 40,
    backgroundColor: '#FFA860',
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 1.0
  },
  textInput: {
    flex: 0.8,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 3
  },
  buttonContainer: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

export default PopUpViewAdd;
