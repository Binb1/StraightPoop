import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Image, TextInput } from 'react-native';
import MapView from 'react-native-maps';


class PopUpViewAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameOfThePlace: '',
      thumbsUp: require('../../Images/thumbs-up-white.png'),
      thumsDown: require('../../Images/dislike-thumb-white.png')
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

        </View>  

      </View>
    )
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
