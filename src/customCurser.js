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
    marginTop: -9, // orig nothing , moves curser vertically
    // marginLeft: 10,
    borderRadius: 50,
    backgroundColor: 'wheat', //darkgray, darkgoldenrod
    zIndex: 3,
  },
});
