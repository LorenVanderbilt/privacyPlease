import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class CustomThumb extends React.Component {
  render() {
    return <View style={styles.rectangle} />;
  }
}

const styles = StyleSheet.create({
  rectangle: {
    width: 18,
    height: 48, // orig 30
    marginTop: -10, // orig nothing , moves curser vertically
    borderRadius: 50,
    backgroundColor: 'darkgray',
  },
});
