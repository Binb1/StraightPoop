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
     if(user_data != null){
       this.props.navigator.push({
         name: 'MapViewPins'
       });
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
      this.props.navigator.push({
        name: 'MapViewPins'
      });
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
      <View style={styles.blank}>
      </View>
        <View style={styles.welcome}>
        <Image
            style={styles.logo}
            source={require('../../Images/toilet.png')}
          />
          <Text style={styles.title}>Welcome to Straight Poop!</Text>
        </View>
        <View style={styles.bottom}>
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
        <View style={styles.blank}>
        </View>
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
    backgroundColor: '#FFA860',
  },
  blank:{
    flex: 1,
  },
  welcome:{
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom:{
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    marginBottom: 10,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  logo:{
    marginBottom: 20,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    minHeight: 40,
    minWidth: 250,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
    borderRadius: 5,
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
    color: "#FFA860",
    fontSize: 20,
    fontWeight: 'bold',
  },
  topBox: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SignIn;
