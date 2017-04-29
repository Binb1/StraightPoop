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
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity onPress={this._navigate.bind(this)}>
            <Image
              style={styles.arrow}
              source={require('../../Images/left-arrow.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={styles.description}>Profile</Text>
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
       </View>
    );
  };

  _navigate(){
    this.props.navigator.pop();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA860',
  },
  top:{
    flex: 3,
    marginTop: 25,
    marginRight: 300,
  },
  arrow: {
    width: 30,
    height: 30,
  },
  body: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    height: 80,
    marginBottom: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  description: {
    marginBottom: 7,
    color: '#646464',
    fontSize: 30,
    fontFamily: 'Avenir'
  },
  descriptionUnderline: {
    fontSize: 20,
    textDecorationLine: 'underline',
    fontFamily: 'Avenir'
  },
  inputBox: {
    minHeight: 40,
    backgroundColor: "#FFA860",
    margin: 10,
    padding: 5,
    borderRadius: 4,
  },
})

export default UserPage;
