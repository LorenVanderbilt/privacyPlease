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
    height: 30,
    backgroundColor: 'darkcyan'
  }
});

