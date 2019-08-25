import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class CustomThumb extends React.Component {
  render() {
    return (
      <View style={styles.rectangle} />

    );
  }
}

const styles = StyleSheet.create({
  rectangle: {
    width: 10,
    height: 40, // orig 30
    // marginTop: 50, // orig nothing
    backgroundColor: 'darkgray'
  }
});

