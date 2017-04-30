import React, { Component } from "react";
import {
  TouchableHighlight,
  Image,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";

class Tutorial extends Component {

  render() {
    return (
      <View style={style.container}>
        <StatusBar translucent backgroundColor="rgba(255,255,255,0)" />
        <View style={style.tutorial}>
          <View style={style.line}>
            <View style={style.imgbox}>
              <Image style={style.pin} source={require("../../Images/Red.png")} />
              <Image
                style={style.pin2}
                source={require("../../Images/Green.png")}
              />
            </View>

            <View style={style.textbox}>
              <Text style={style.text}>
                Find the best restrooms around you!
              </Text>
            </View>
          </View>
          <View style={style.line}>
            <View style={style.imgbox}>
              <Image
                style={style.pin}
                source={require("../../Images/RedMoney.png")}
              />
              <Image
                style={style.pin2}
                source={require("../../Images/GreenMoney.png")}
              />
            </View>

            <View style={style.textbox}>
              <Text style={style.text}>
                You might have to buy something to access stores{"\'"} restrooms.
              </Text>
            </View>
          </View>
          <View style={style.line}>
            <View style={style.imgbox}>
              <Image
                style={style.pin}
                source={require("../../Images/YellowMoney.png")}
              />
              <Image
                style={style.pin2}
                source={require("../../Images/Yellow.png")}
              />
            </View>

            <View style={style.textbox}>
              <Text style={style.text}>
                Look out for your best option!
              </Text>
            </View>
          </View>
          <View style={style.line}>
            <View style={style.imgbox}>
              <Image
                style={style.pin3}
                source={require("../../Images/plus.png")}
              />
            </View>
            <View style={style.textbox}>
              <Text style={style.text}>
                Add a new restroom if it doesn{"\'"}t exist yet!
              </Text>
            </View>
          </View>
          <View style={{ height: 75, marginBottom: 10 }}>
            <TouchableHighlight
              style={style.th}
              onPress={this._GoToMain.bind(this)}
              underlayColor="#FFA860">
              <Text style={style.button}>Got it!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  };

  _GoToMain() {
    this.props.navigator.push({
      name: "MapViewPins"
    });
  }

}

const style = new StyleSheet.create({
  container: {
    backgroundColor: "#FFA860",
    flex: 10
  },
  th: {
    flex: 1,
    backgroundColor: "#FFA860",
    marginTop: 20,
    width: Dimensions.get("window").width / 2,
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center"
  },
  button: {
    fontSize: 25,
    color: 'white',
    textAlign: "center"
  },
  text: {
    fontSize: 20,
    fontWeight: "300",
  },
  imgbox: {
    width: 120,
    marginLeft: 5,
  },
  textbox: {
    marginRight: 7,
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap"
  },
  pin: {
    marginLeft: -10,
    width: 80,
    height: 80
  },
  pin2: {
    position: 'absolute',
    width: 80,
    height: 80,
    left: 30
  },
  pin3: {
    width: 80,
    height: 80
  },
  line: {
    marginTop: 40,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  tutorial: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  }
});

export default Tutorial;
