import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AudioModule from './src/audioModule';
import * as Font from 'expo-font';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: ['party', 'shower', 'hair dryer', 'washer', 'crowd', 'sink'],
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Neon: require('./assets/fonts/Neon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View>
        {this.state.fontLoaded ? (
          <Text style={styles.text}>privacy please</Text>
        ) : null}
        {this.renderModules()}
      </View>
    );
  }

  renderModules() {
    return this.state.modules.map(item => {
      return (
        <View key={item} style={styles.module}>
          <AudioModule profile={item} volume={0.3} />
        </View>
      );
    });
  }
}
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Neon',
    fontSize: 37,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  module: {
    backgroundColor: 'darkcyan',
    height: 75,
    width: 300,
    marginBottom: 10,
    justifyContent: 'center',
    marginLeft: 10,
  },
});
