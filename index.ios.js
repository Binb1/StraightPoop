/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Text,View, Navigator, AsyncStorage } from 'react-native';
import MapView from './Code/iosCode/MapView.js'
import SignIn from './Code/iosCode/SignIn.js'
import UserPage from './Code/iosCode/UserPage.js'

import * as firebase from 'firebase';

//Initiaizing firebase
const firebaseConfig = {
  apiKey: "AIzaSyDiLxHPhf_sMM93ukyBdXQQQTnNx6XstOw",
  authDomain: "straightpoop-9f9d6.firebaseio.com",
  databaseURL: "https://straightpoop-9f9d6.firebaseio.com/",
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

  componentWillMount(){
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
        <SignIn />
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
