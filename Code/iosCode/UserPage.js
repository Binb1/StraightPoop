import React, {Component} from 'react';
import {StyleSheet, View, Image, Button, Text, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';

class UserPage extends Component{

  constructor(props){
    super(props);
    this.state={
      email: '',
      username: '',
    }
  }

  componentWillMount(){
    var user = this.props.firebaseApp.auth().currentUser;
    var name, email, photoUrl, uid;

    if (user != null) {
      this.setState({
        username: user.displayName,
        email: user.email,
      });
    }
  }

  logout(){
    AsyncStorage.setItem('userData', '');
    this.props.navigator.push({
      name: 'SignIn'
    });
  }

  update(){
    var user = this.props.firebaseApp.auth().currentUser;
    user.updateProfile({
      displayName: this.state.username,
    }).then(function() {
      alert('Your account has been updated successfully.');
    }, function(error) {
      alert('Sorry yout account couldn\'t be updated.')
    });
  }

  render(){
    return(
        <View style={styles.body}>
          <Text>PROFILE</Text>
          <Text>{this.state.email}</Text>
          <Text>Username</Text>
          <TextInput
            placeholder={this.state.name == '' ? 'Username' : this.state.username }
            style={styles.inputBox}
            onChangeText={(text) => this.setState({'username':text})}
          />
          <Text>Email</Text>
          <TextInput
            placeholder={this.state.email == '' ? "Email" : this.state.email }
            style={styles.inputBox}
          />
          <TouchableOpacity onPress={this.update.bind(this)}>
            <Text>Update account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.logout.bind(this)}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  body: {
    flex: 8.6,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 375
  },
  description: {
    color: '#646464',
    fontSize: 50,
    fontFamily: 'Avenir'
  },
  descriptionUnderline: {
    fontSize: 50,
    textDecorationLine: 'underline',
    fontFamily: 'Avenir'
  },
  inputBox: {
    minHeight: 40,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
  },
})

export default UserPage;
