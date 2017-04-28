/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Text,View, Navigator } from 'react-native';
import MapViewPins from './Code/iosCode/MapViewPins.js'
import SignIn from './Code/iosCode/SignIn.js'
import UserPage from './Code/iosCode/UserPage.js'

import * as firebase from 'firebase';

//Initiaizing firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUZjvISVXl1Xl64PaDU2Zi0uRn6jdG9gA",
  authDomain: "gofu-9c8fb.firebaseio.com",
  databaseURL: "https://gofu-9c8fb.firebaseio.com/",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class Navigate extends Component{

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'StraightPoop' }}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

  renderScene(route, navigator) {
    //Loads the main page
    if (route.name == 'StraightPoop'){
      return <StraightPoop navigator={navigator} firebaseApp={firebaseApp} />
    }

    if (route.name == 'UserPage'){
      return <UserPage navigator={navigator} firebaseApp={firebaseApp} />
    }

  }

}

AppRegistry.registerComponent('StraightPoop', () => Navigate);

class StraightPoop extends Component {

  async componentWillMount(){
    //Check if userData is stored on device else open Login
    AsyncStorage.getItem('userData').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      if(user_data != null){
        this.props.navigator.push({
          name: 'UserPage'
        });
      }
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <MapViewPins />
      </View>
    );
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
