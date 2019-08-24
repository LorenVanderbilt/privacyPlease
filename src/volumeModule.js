import React from 'react';
import { View, StyleSheet, Slider } from 'react-native';
// import Slider from '@react-native-community/slider';

export default class VolumeModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: props.defaultVolume,
      disabled: true,
    };
  }
 /* LIFECYCLE */
   componentDidMount() {
    this.disabled(this.state.disabled);
  }

  /* FUNCTIONS */
  disabled(val) {
    this.setState({ disabled: val });
  }
  getVal(val) {
    this.props.onVolumeChange(val);
  }
  sliderValueChanged(val) {
    this.setState({ volume: val });
    this.getVal(val);
  }
  render() {
    return (
      <View style={styles.volumeContainer}>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumTrackTintColor="darkcyan"
          maximumTrackTintColor="pink"
          minimumValue={0}
          maximumValue={1}
          value={this.state.volume}
          disabled={this.state.disabled}
          onValueChange={val => this.sliderValueChanged(val)}
          onSlidingComplete={val => this.getVal(val)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  volumeContainer: {
    width: 200,
    height: 40,
    backgroundColor: 'white',
  },
});
