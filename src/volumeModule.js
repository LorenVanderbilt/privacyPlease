import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class VolumeModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={styles.volumeContainer}><Text>volume slider</Text></View>;
  }
}

const styles = StyleSheet.create({
  volumeContainer: {
    width: 200,
    height: 30,
    backgroundColor: 'white'
  },
});
