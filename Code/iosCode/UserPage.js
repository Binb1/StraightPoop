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
          <TouchableOpacity onPress={this._navigateBack.bind(this)}>
            <Image
              style={styles.arrow}
              source={require('../../Images/left-arrow.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={styles.description}>Profile</Text>
          <Text style={styles.mail}>Username</Text>
          <TextInput
            placeholder={this.state.name == '' ? 'Username' : this.state.username }
            style={styles.inputBox}
            onChangeText={(text) => this.setState({'username':text})}
          />
          <Text>Email</Text>
          <TextInput
            placeholder={this.state.email == '' ? "Email" : this.state.email }
            style={styles.inputBox}
            editable={false}
          />
          <TouchableOpacity onPress={this.update.bind(this)}>
            <Text style={{marginBottom: 5}}>Update account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.logout.bind(this)}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.bottonText}>You have reviewed COUNTER restrooms! {"\n"}
          Your next achievement is in VALUE reviews! {"\n"}</Text>
          <View style={styles.images}>
          <Image
            style={styles.achievements}
            source={require('../../Images/poop.png')}
          >
          <Image
              style={styles.achievements}
              source={require('../../Images/SimpleToilet.png')}
            />
          </Image>
          </View>
        </View>
       </View>
    );
  };

  _navigateBack(){
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
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  bottom: {
    flex: 3,
    width: 320,
    height: 50,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottonText:{
    marginLeft: 8,
    textAlign: 'center',
    marginTop: 12,
  },
  images:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mail:{
    marginBottom: 4,
    marginTop: 8,
  },
  description: {
    marginBottom: 9,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
  achievements:{
    overlayColor: 'gray',
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  descriptionUnderline: {
    fontSize: 20,
    textDecorationLine: 'underline',
    fontFamily: 'Avenir'
  },
  inputBox: {
    minHeight: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
    backgroundColor: "#FFA860",
    margin: 12,
    padding: 5,
    borderRadius: 5,
  },
})

export default UserPage;
