import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import AudioModule from './src/audioModule';
import * as Font from 'expo-font';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: ['party', 'shower', 'hairdryer', 'washer', 'crowd', 'sink'],
      fontLoaded: false,
      moduleColor: 'cadetblue',
      bigPhone: false,
    };
  }

  /* FUNCTIONS */
  toggleModule() {
    this.setState({ moduleColor: 'cadetblue' });
  }

  /* LIFECYCLE */
  async componentDidMount() {
    await Font.loadAsync({
      Neon: require('./assets/fonts/Neon.ttf'),
      Privacy: require('./assets/fonts/Privacy.ttf'),
    });
    this.setState({ fontLoaded: true });
    const screenHeight = Dimensions.get('window').height;
    console.log('the screen height is...', screenHeight);
    if (screenHeight > 601) {
      this.setState({ bigPhone: true });
    }
  }

  render() {
    return (
      <View style={styles.outside}>
        <View style={styles.appContainer}>
          {this.state.fontLoaded ? (
            this.state.bigPhone ? (
              <Text style={styles.textPlus}>privacy please!</Text>
            ) : (
              <Text style={styles.text}>privacy please!</Text>
            )
          ) : null}
          {this.renderModules()}
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center' }}>
              V reserved for ad space V
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderModules() {
    return this.state.modules.map(item => {
      return (
        <View
          key={item}
          style={[styles.module, { backgroundColor: this.state.moduleColor }]}
        >
          <AudioModule
            profile={item}
            volume={Math.random() / 2}
            fontLoaded={this.state.fontLoaded}
            toggleModule={this.toggleModule}
          />
        </View>
      );
    });
  }
}
const styles = StyleSheet.create({
  outside: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gainsboro',
  },
  appContainer: {
    // flex: 1,
    height: 568,
    width: 320,
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
    color: 'slategray',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
    // flex: 1,
  },
  textPlus: {
    fontFamily: 'Neon',
    fontSize: 47,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0,
    flex: 1,
    color: 'slategray',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  module: {
    backgroundColor: 'cadetblue', //black, 'gray'
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flex: 1,
  },
  modulePlus: {
    backgroundColor: 'cadetblue', //black, 'gray'
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flex: 1,
  },
});
