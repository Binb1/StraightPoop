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
        <View style={styles.top}>
          <TouchableOpacity onPress={this._navigateBack.bind(this)}>
            <Image
              style={styles.arrow}
              source={require('../../Images/left-arrow.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.middleBox}>
          <Text style={styles.registerText}>Please register to access thousands of restrooms around the world!</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.topBox}>Email:</Text>
          <TextInput style={styles.inputs} placeholder="Email" onChangeText={(text) => this.setState({email: text})}/>
          <Text style={styles.topBox}>Password:</Text>
          <TextInput secureTextEntry={true} style={styles.inputs} placeholder="Password" onChangeText={(text) => this.setState({password: text})}/>
          <TouchableOpacity style={styles.signInButton} onPress={this.signUp.bind(this)}>
            <Text style={styles.textSignIn}>Sign Up</Text>
          </TouchableOpacity>
         </View>
      </View>
    );
  };

  _navigateBack(){
    this.props.navigator.pop();
  }

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
          name: "Tutorial"
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
    backgroundColor: '#FFA860',
    minWidth: 375
  },
  top:{
    flex: 1,
    marginTop: 25,
    marginRight: 300,
  },
  arrow: {
    width: 30,
    height: 30,
  },
  body: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    height: 80,
    marginBottom: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  middleBox:{
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText:{
    color: 'white',
    marginRight: 15,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
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
    color: '#FFFFFF',
    fontWeight: 'bold',
    backgroundColor: "#FFA860",
    margin: 12,
    padding: 5,
    borderRadius: 5,
  },
  signInButton:{
    borderWidth: 1,
    borderColor: '#FFA860',
    backgroundColor: '#FFA860',
    minWidth: 200,
    minHeight: 40,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSignIn: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
  },
  topBox: {
    color: '#FFA860',
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
