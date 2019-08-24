import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AudioModule from './src/audioModule';
let defaultVolume = 0.6;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: ['sink', 'shower', 'hairdryer', 'washing machine', 'crowd', '6'],
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Privacy Please</Text>
        {this.renderModules()}
      </View>
    );
  }

  renderModules() {
    return this.state.modules.map(item => {
      return (
        <View key={item} style={styles.module}>
        <AudioModule
        profile={item}
        volume={defaultVolume}
        />
        </View>
      );
    });
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  module: {
    backgroundColor: 'darkcyan',
    height: 75,
    width: 300,
    marginBottom: 10,
    justifyContent: 'center',
    marginLeft: 10
  },
});
