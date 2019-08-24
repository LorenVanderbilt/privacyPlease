import React from 'react';
import { View, StyleSheet, Slider } from 'react-native';
import CustomThumb from './customThumb';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

// import Slider from '@react-native-community/slider';
// this does not currently work with expo managed, so will need to use depreciated slider for now

export default class VolumeModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: [props.defaultVolume],
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
        <MultiSlider
          //   style={{ width: 200, height: 40 }}
          sliderLength={200}
          customMarker={() => {
            return <CustomThumb />;
          }}
          minimumTrackTintColor="darkcyan"
          maximumTrackTintColor="pink"
          min={0}
          max={1}
          step={0.1}
          values={this.state.volume}
          disabled={this.state.disabled}
          onValuesChange={val => this.sliderValueChanged(val)}
          onValuesChangeFinish={val => this.getVal(val)}
          selectedStyle={{
            backgroundColor: 'transparent',
          }}
          unselectedStyle={{
            backgroundColor: 'transparent',
          }}
          trackStyle={{
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderRightWidth: 200,
            borderTopWidth: 30,
            borderRightColor: 'transparent',
            borderTopColor: 'pink',
            transform: [
                {rotate: '180deg'}
              ]
          }}
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
