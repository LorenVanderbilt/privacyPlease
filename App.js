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
      screenHeight: Math.round(Dimensions.get('window').height),
    };
  }

   /* FUNCTIONS */
  toggleModule(){
    this.setState({ moduleColor: 'cadetblue' });
  }

   /* LIFECYCLE */
  async componentDidMount() {
    await Font.loadAsync({
      Neon: require('./assets/fonts/Neon.ttf'),
      Privacy: require('./assets/fonts/Privacy.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const screenHeight = Math.round(Dimensions.get('window').height);
    return (
      <View style={styles.appContainer}>
        {this.state.fontLoaded ? (
          // <ImageBackground source={require('./assets/images/marble.jpg')} style={{width: '100%', height: '100%'}}>
          <Text style={styles.text}>privacy please!</Text>
        ) : // </ImageBackground>
        null}
        {this.renderModules()}
        {/* <View style={{ Flex: 1 }}>
          
          <Text> hihi </Text> */}
        {/* </View> */}
      </View>
    );
  }

  renderModules() {
    return this.state.modules.map(item => {
      return (
        <View key={item} style={[styles.module, {backgroundColor: this.state.moduleColor}]}>
          <AudioModule
            profile={item}
            volume={Math.random()}
            fontLoaded={this.state.fontLoaded}
            toggleModule={this.toggleModule}
          />
        </View>
      );
    });
  }
}
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
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
