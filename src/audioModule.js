import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import VolumeModule from './volumeModule';

export default class AudioModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.audioContainer}>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text>hello</Text>
          </View>
        </TouchableOpacity>
        <VolumeModule />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    marginRight: 20,
  },
  audioContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 300,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
