import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class CustomCurser extends React.Component {
  render() {
    return <View style={styles.rectangle} />;
  }
}

const styles = StyleSheet.create({
  rectangle: {
    width: 18,
    height: 48, // orig 30
    marginTop: -1, // -9 moves curser vertically
    // marginLeft: 10,
    borderRadius: 50,
    marginLeft: 180,
    backgroundColor: 'wheat', //darkgray, darkgoldenrod
    zIndex: 3,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 0.5,
    shadowOpacity: 0.1
  },
});
