import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';

class SignIn extends Component{

  constructor(props){
    super(props);
    this.state ={
      email: '',
      password: '',
      loading: false
    }
  }

  componentWillMount(){
  //Check if userData is stored on device else open Login
    AsyncStorage.getItem('userData').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      console.log(user_data);
      if(user_data != ''){
        /*this.props.navigator.push({
          name: 'MapViewPins'
        });*/
      }
    });
  }

  signIn(){
    this.setState({
      loading: true
    });
    // Log in and display an alert to tell the user what happened.
    this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((userData) =>
    {
      this.setState({
        loading: false
      });
      AsyncStorage.setItem('userData', JSON.stringify(userData));
     /* this.props.navigator.push({
        name: 'MapViewPins'
      });*/
    }).catch((error) =>
    {
        this.setState({
          loading: false
        });
        alert('Login Failed. Please try again'+error);
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.title}>Welcome to Straight Poop!</Text>
        </View>
        <Text style={styles.topBox}>Email:</Text>
        <TextInput style={styles.inputs} onChangeText={(text) => this.setState({email: text})}/>
        <Text style={styles.topBox}>Password:</Text>
        <TextInput secureTextEntry={true} style={styles.inputs} onChangeText={(text) => this.setState({password: text})}/>
        <TouchableOpacity style={styles.signInButton} onPress={this.signIn.bind(this)}>
          <Text style={styles.textSignIn}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._navigateToSignUp.bind(this)}>
          <Text>Click Here to Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _navigateToSignUp(){
    this.props.navigator.push({
      name: "SignUp"
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
  welcome:{
    justifyContent: 'center',
    minWidth: 30,
  },
  title:{
    marginBottom: 70,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
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
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
    borderRadius: 4,
  },
  signInButton:{
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: '#FFFFFF',
    minWidth: 200,
    minHeight: 40,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 15,
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

export default SignIn;
