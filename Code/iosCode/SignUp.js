import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

class SignUp extends Component{

  constructor(props){
    super(props);
    this.state ={
      loaded: false,
      email: '',
      password: ''
    }
  }

  render(){
    return(
      <View style={styles.container}>
          <Text style={styles.topBox}>Email:</Text>
          <TextInput style={styles.inputs} placeholder="Email" onChangeText={(text) => this.setState({email: text})}/>
          <Text style={styles.topBox}>Password:</Text>
          <TextInput secureTextEntry={true} style={styles.inputs} placeholder="Password" onChangeText={(text) => this.setState({password: text})}/>
          <TouchableOpacity style={styles.signInButton} onPress={this.signUp.bind(this)}>
            <Text style={styles.textSignIn}>Sign Up</Text>
          </TouchableOpacity>
      </View>
    );
  };

  _navigateToUserNotLogged(){
    this.props.navigator.pop({
      name: "MapViewPins"
    });
  }

  signUp() {
    this.setState({
      // When waiting for the firebase server show the loading indicator.
      loading: true,
    });

    // Make a call to firebase to create a new user.
    this.props.firebaseApp.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.password).then(() => {
        // then and catch are methods that we call on the Promise returned from
        // createUserWithEmailAndPassword
        alert('Your account was created!');
        this.setState({
          // Clear out the fields when the user logs in and hide the progress indicator.
          email: '',
          password: '',
          loading: false
        });
        this.props.navigator.push({
          name: "MapViewPins"
        });
    }).catch((error) => {
      // Leave the fields filled when an error occurs and hide the progress indicator.
      this.setState({
        loading: false
      });
      alert("Account creation failed: " + error.message );
    });
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F58E38',
    minWidth: 375
  },
  logo: {
    flex: 3,
    paddingTop: 20,
    justifyContent: 'center',
    minWidth: 375,
  },
  backContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  logoContainer:{
    flex: 3 ,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowBack:{
    width: 30,
    height: 30,
    tintColor: '#FFFFFF',
  },
  iconLogo:{
    color: '#FFFFFF',
    fontSize: 40,
    fontFamily: 'Avenir-Black'
  },
  inputs: {
    minHeight: 40,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 4,
  },
  signInButton:{
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: '#FFFFFF',
    minWidth: 200,
    minHeight: 40,
    borderRadius: 4,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSignIn: {
    color: "#F58E38",
    fontSize: 20,
    fontWeight: 'bold',
  },
  topBox: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleTopBox:{
    color: '#FFFFFF',
    fontSize: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: 'Avenir-Black'
  }
});

export default SignUp;
