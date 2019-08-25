import React from 'react';
import { View, StyleSheet } from 'react-native';
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
    this.props.volumeChanged(val);
  }
  sliderValueChanged(volume) {
    this.setState({ volume: volume });
    this.getVal(volume[0]);
  }
  render() {
    return (
      <View style={styles.volumeContainer}>
        <MultiSlider
          values={this.state.volume}
          sliderLength={200}
          onValuesChange={this.sliderValueChanged.bind(this)}
          min={0}
          max={1}
          step={0.1}
          selectedStyle={{
            backgroundColor: 'darkcyan',
          }}
          unselectedStyle={{
            backgroundColor: 'pink',
          }}
          customMarker={() => {
            return <CustomThumb />;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  volumeContainer: {
    width: 200,
    height: 50,
    backgroundColor: 'white',
  },
  thumb: {
    width: 20,
    height: 30,
    borderRadius: 1,
    backgroundColor: '#838486',
  },
});
