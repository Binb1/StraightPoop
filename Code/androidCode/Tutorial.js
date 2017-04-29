import React, { Component } from "react";
import { Image, View, Text, StyleSheet, StatusBar } from "react-native";

class Tutorial extends Component {
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
            <Image style={style.pin} source={require("../../Markers/RedMoney.png")}>
              <Image
                style={style.pin2}
                source={require("../../Markers/GreenMoney.png")}
              />
            </Image>
            <View style={style.textbox}>
              <Text style={style.text}>
                You might have to buy something to access some.
              </Text>
            </View>
          </View>
          <View style={style.line}>
            <Image style={style.pin} source={require("../../Markers/YellowMoney.png")}>
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
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  textbox: {
    alignItems:'center',
    flex: 1,
    flexWrap: "wrap"
  },
  pin: {
    marginLeft:30,
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
