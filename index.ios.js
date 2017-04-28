/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Text,View } from 'react-native';
import MapViewPins from './Code/iosCode/MapViewPins.js'
import SignIn from './Code/iosCode/SignIn.js'
import UserPage from './Code/iosCode/UserPage.js'

export default class StraightPoop extends Component {
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
    backgroundColor: '#F5FCFF',
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
