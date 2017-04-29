import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Text,View, Navigator } from 'react-native';
import MapViewPins from './Code/androidCode/MapViewPins.js'
import SignIn from './Code/androidCode/SignIn.js'
import UserPage from './Code/androidCode/UserPage.js'
import Tutorial from './Code/androidCode/Tutorial.js'

import * as firebase from 'firebase';

//Initiaizing firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUZjvISVXl1Xl64PaDU2Zi0uRn6jdG9gA",
  authDomain: "gofu-9c8fb.firebaseio.com",
  databaseURL: "https://gofu-9c8fb.firebaseio.com/",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class StraightPoop extends Component {

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'Tutorial' }}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

  renderScene(route, navigator) {
    //Loads the main page
    if (route.name == 'MapViewPins'){
      return <MapViewPins navigator={navigator} firebaseApp={firebaseApp} />
    }
    if (route.name == 'UserPage'){
      return <UserPage navigator={navigator} firebaseApp={firebaseApp} />
    }
    if (route.name == 'Tutorial'){
      return <Tutorial navigator={navigator} firebaseApp={firebaseApp} />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('StraightPoop', () => StraightPoop);

