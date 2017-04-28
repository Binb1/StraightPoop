import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

class MapViewPins extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //states
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    zjaeiezanezakeajzkoezakealzk
                </Text>    
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }} />
            </View>
        )
    }
}

const styles = new StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})

export default MapViewPins;