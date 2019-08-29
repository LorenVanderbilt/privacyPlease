import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import AudioModule from './src/audioModule';
import * as Font from 'expo-font';
import Constants from 'expo-constants';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: ['party', 'shower', 'hair dryer', 'washer', 'crowd', 'sink'],
      fontLoaded: false,
      screenHeight: Math.round(Dimensions.get('window').height),
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Neon: require('./assets/fonts/Neon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const screenHeight = Math.round(Dimensions.get('window').height);
    return (
      <View style={styles.appContainer}>
        {this.state.fontLoaded ? (
          // <ImageBackground source={require('./assets/images/marble.jpg')} style={{width: '100%', height: '100%'}}>
          <Text style={styles.text}>privacy please</Text>
        ) : // </ImageBackground>
        null}
        {/* <Image source={require('./assets/images/washer.png')} /> */}
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
            volume={Math.random()}
            fontLoaded={this.state.fontLoaded}
          />
        </View>
      );
    });
  }
}
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: 'gainsboro', //'thistle',//'seashell', //'papayawhip', //'peachpuff', //'mediumturquoise',
    alignItems: 'stretch',
  },
  text: {
    fontFamily: 'Neon',
    fontSize: 37,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 25,
    // flex: 1,
  },
  textPlus: {
    fontFamily: 'Neon',
    fontSize: 37,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 25,
    flex: 4,
  },
  module: {
    backgroundColor: 'darkcyan',
    // width: 300,
    // height: 1000,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flex: 1,
  },
});
