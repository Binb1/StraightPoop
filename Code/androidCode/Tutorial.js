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
  GoToMain() {
    this.props.navigator.push({
      name: "MapViewPoints"
    });
  }
  render() {
    return (
      <View style={style.container}>
        <StatusBar translucent backgroundColor="rgba(255,255,255,0)" />
        <View style={style.tutorial}>
          <View style={style.line}>
            <Image style={style.pin} source={require("../../Markers/Red.png")}>
              <Image
                style={style.pin2}
                source={require("../../Markers/Green.png")}
              />
            </Image>
            <View style={style.textbox}>
              <Text style={style.text}>
                Find the best restrooms around you!
              </Text>
            </View>
          </View>
          <View style={style.line}>
            <Image
              style={style.pin}
              source={require("../../Markers/RedMoney.png")}
            >
              <Image
                style={style.pin2}
                source={require("../../Markers/GreenMoney.png")}
              />
            </Image>
            <View style={style.textbox}>
              <Text style={style.text}>
                You might have to buy something to access stores' restrooms.
              </Text>
            </View>
          </View>
          <View style={style.line}>
            <Image
              style={style.pin}
              source={require("../../Markers/YellowMoney.png")}
            >
              <Image
                style={style.pin2}
                source={require("../../Markers/Yellow.png")}
              />
            </Image>
            <View style={style.textbox}>
              <Text style={style.text}>
                Look out for your best option!
              </Text>
            </View>
          </View>
          <View style={{height:75,marginBottom:50}}
          activeOpacity={0.5}>
          <TouchableHighlight style = {style.th}
            onPress={this.GoToMain.bind(this)}>
            <Text style={style.button}>Got it!</Text>
          </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const style = new StyleSheet.create({
  container: {
    backgroundColor: "#FFA860",
    flex: 1
  },
  th: {
    flex: 1,
    backgroundColor: '#FFA860',
    width: Dimensions.get('window').width / 4,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button: {
    fontSize: 25,
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: "bold"
  },
  textbox: {
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap"
  },
  pin: {
    marginLeft: 30,
    width: 75,
    height: 75
  },
  pin2: {
    marginLeft: -30,
    width: 75,
    height: 75
  },
  line: {
    marginTop: 40,
    alignSelf: "center",
    flex: 1,
    flexDirection: "row"
  },
  tutorial: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 20
  }
});

export default Tutorial;
