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
          <Text style={styles.bottonText}>You have reviewed 3 restrooms! {"\n"}
          Your next achievement is in 7 reviews! {"\n"}</Text>
          <View style={styles.images}>
          <Image
            style={styles.achievements}
            source={require('../../Images/SimpleToilet.png')}
          />
          <Image
              style={styles.achievements}
              source={require('../../Images/poop.png')}
            />
          </View>
          <View style={styles.legende}>
            <Text style={styles.legendeText}>CleanMaster    </Text>
            <Text style={styles.legendeText}>    PoopMaster</Text>
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
    backgroundColor: '#FFA860',
  },
  top:{
    flex: 1,
    marginTop: 25,
    marginRight: 290,
  },
  arrow: {
    marginLeft: 20,
    width: 30,
    height: 30,
  },
  body: {
    flex: 6,
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  bottom: {
    flex: 3,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottonText:{
    flex: 0.8,
    marginLeft: 8,
    textAlign: 'center',
    marginTop: 12,
  },
  images:{
    flex: 1.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legende:{
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendeText:{
    marginBottom: 5,
  },
  mail:{
    marginBottom: 4,
    marginTop: 8,
  },
  description: {
    marginBottom: 10,
    marginTop: 10,
    color: 'black',
    fontWeight: '300',
    fontSize: 25,
  },
  achievements:{
    overlayColor: 'gray',
    width: 50,
    height: 50,
    marginTop: 8,
    marginLeft: 22,
    marginRight: 22,
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
