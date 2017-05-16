import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Image, TextInput, Dimensions, TouchableHighlight, Alert } from 'react-native';
import MapView from 'react-native-maps';

var keyGlobal = "";

class PopUpViewAdd extends Component {

  constructor(props) {

    super(props);
    this.state = {
      email: '',
      idPlace: '',
      nameOfThePlace: '',
      thumbsUp: require('../../Images/thumbs-up-white.png'),
      thumsDown: require('../../Images/dislike-thumb-white.png'),
      thumbsChosen: false,
      thumbsChoice: '',
      bottomViewAdd: this.props.bottomViewAdd,
      freeChosen: false,
      freeChoice: '',
      chosenFreeColor: '#FFA860',
      inverseFreeColor: '#FFA860',
      itemsRef: this.props.firebaseApp.database().ref('/content')
    }
  }

  componentWillMount() {
    var user = this.props.firebaseApp.auth().currentUser;

    if (user != null) {
      this.setState({
        email: user.email,
      });
    }
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
        <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <Text
            style={{ color: 'white', fontSize: 20, fontWeight: '400' }}>
            {this.props.name}
         </Text>
        </View>
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

  freePress() {
    this.setState({
      chosenFreeColor: 'green',
      inverseFreeColor: '#FFA860',
      freeChosen: true,
      freeChoice: 'yes'
    })
  }

  paidPress() {
    this.setState({
      chosenFreeColor: '#FFA860',
      inverseFreeColor: 'green',
      freeChosen: true,
      freeChoice: 'no'
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

    if (this.state.thumbsChoice == 'up'){
      this.props.ratePinUp()
    }
    else{
      //this.props.ratePinDown()
    }


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
  container: {
    borderWidth: 3, borderColor: 'white', borderRadius: 10,
    backgroundColor: '#FFA860', shadowColor: '#999999', shadowOffset: { width: 0, height: 3 }, shadowRadius: 2, shadowOpacity: 0.3
  },
  textInput: {
    flex: 0.6,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 5, 
    marginLeft: 5
  },
  buttonSendContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
        marginRight: 5, 
    marginLeft: 5
  },
  buttonSendbox: {
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 5,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').height / 20,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.3
  },
  freeOrPaidContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonFreeAndPaid: {
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 5,
    width: Dimensions.get('window').width / 6,
    height: Dimensions.get('window').height / 20,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
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
