import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Image, TextInput, Dimensions, TouchableHighlight, Alert } from 'react-native';
import MapView from 'react-native-maps';

class PopUpViewAdd extends Component {

  constructor(props) {

    super(props);
    this.state = {
      email: '',
      nameOfThePlace: '',
      thumbsUp: require('../../Images/thumbs-up-white.png'),
      thumsDown: require('../../Images/dislike-thumb-white.png'),
      thumbsChosen: false,
      thumbsChoice: '',
      bottomViewAdd: this.props.bottomViewAdd,
      itemsRef: this.props.firebaseApp.database(),
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
      <View style={{ flex: 3 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter the name of the place"
          onChangeText={(text) => this.setState({ nameOfThePlace: text })}
        />
        <View style={styles.buttonContainer}>
          <TouchableHighlight underlayColor='#FFA860' onPress={() => this.thumbsDownPress()}>
            <Image
              style={styles.thumbsDown}
              source={this.state.thumsDown}
            />
          </TouchableHighlight>
          <TouchableHighlight underlayColor='#FFA860' onPress={() => this.thumbsUpPress()}>
            <Image
              style={styles.thumbsUp}
              source={this.state.thumbsUp}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.buttonSendContainer}>
          <TouchableHighlight style={styles.buttonSendbox} onPress={() => this.props.closePopUpViewAdd()}>
            <Text style={{ color: '#FFA860', fontSize: 20 }}>
              Close
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonSendbox} onPress={() => this.sendPin()}>
            <Text style={{ color: '#FFA860', fontSize: 20 }}>
              Send!
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  thumbsUpPress() {
    this.setState({
      thumbsUp: require('../../Images/thumbs-up-green.png'),
      thumsDown: require('../../Images/dislike-thumb-white.png'),
      thumbsChosen: true,
      thumbsChoice: 'up'
    })
  }

  thumbsDownPress() {
    this.setState({
      thumbsUp: require('../../Images/thumbs-up-white.png'),
      thumsDown: require('../../Images/dislike-thumb-red.png'),
      thumbsChosen: true,
      thumbsChoice: 'down'
    })
  }

  sendPin() {
    errors = false;
    //Checking if the thumb input is irght
    if (this.state.thumbsChoice == '') {
      Alert.alert(
        'Error',
        'Choose thumbs down or thumbs up for those restrooms!',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      )
      errors = true;
    }
    //Checking if a name is good
    if (this.state.nameOfThePlace == '') {
      Alert.alert(
        'Error',
        'Enter the name of the place !',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      )
      errors = true;
    }
    //Sending the item to the database
    //latitude: 37.78825,
    //longitude: -122.4324,


    this.state.itemsRef.ref("custom").push({'name': this.state.nameOfThePlace, 'positive': this.state.thumbsChoice == 'up' ? 1 :0, 'negative': this.state.thumbsChoice == 'up' ? 0 :1  });
    /*this.props.geoQuery.on("key_entered", function(key, location, distance) {
      console.log(key + " entered query at " + location + " (" + distance + " km from center)");
    });
    if(!errors){
      this.props.geofire.set(this.state.nameOfThePlace,[39.78836, -129.4324]).then(function() {
        console.log("Provided keys have been added to GeoFire");
      }, function(error) {
        console.log("Error: " + error);
      });*/




    this.props.closePopUpViewAdd()

    //Reseting the field
    this.resetField()
  }

  resetField() {
    this.setState({
      thumbsUp: require('../../Images/thumbs-up-white.png'),
      thumsDown: require('../../Images/dislike-thumb-white.png'),
      thumbsChosen: false,
      thumbsChoice: '',
      nameOfThePlace: ''
    })
  }
}

const styles = new StyleSheet.create({
  textInput: {
    flex: 0.8,
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.3
  },
  thumbsUp: {
    height: 50,
    width: 50,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.3
  },
  thumbsDown: {
    height: 50,
    width: 50,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.3
  },
  buttonContainer: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonSendContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonSendbox: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    width: Dimensions.get('window').width / 4,
    borderRadius: 3,
    alignItems: 'center',
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.3
  }
})

export default PopUpViewAdd;
