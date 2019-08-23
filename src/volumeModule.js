import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class VolumeModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={styles.volumeContainer}></View>;
  }
}

const styles = StyleSheet.create({
  volumeContainer: {
    width: 200,
    height: 30,
    backgroundColor: 'white'
  },
});
