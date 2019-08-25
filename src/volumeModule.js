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
      enabled: false,
    //   opacity: props.opacity
    };
  }
  /* LIFECYCLE */
  componentDidMount() {
    this.enabled(this.state.enabled);
  }

  /* FUNCTIONS */
  enabled(bool) {
    this.setState({ enabled: bool });
  }
  getVal(val) {
    this.props.volumeChanged(val);
  }
  sliderValueChanged(volume) {
    this.setState({ volume: volume });
    this.getVal(volume[0]);
    console.log('state', this.state)
  }

  /* COMPONENT */
  render() {
    return (
      <View  style={[styles.volumeContainer, {opacity: this.props.opacity}]}>
        <MultiSlider
          values={this.state.volume}
          sliderLength={200}
          onValuesChange={this.sliderValueChanged.bind(this)}
          min={0}
          max={1}
          step={0.1}
          enabledOne={this.state.enabled}
          selectedStyle={{
            backgroundColor: 'darkcyan',
          }}
          unselectedStyle={{
            backgroundColor: 'pink',
          }}
            containerStyle={{ //pushed track down
              marginTop: 10,
            }}
          trackStyle={{
            // make track thicker
            height: 10,
            
          }}
          customMarker={() => {
            return <CustomThumb />;
          }}
          imageBackgroundSource={require('../assets/raiden.jpg')}
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
     // change this when enable/disable
    // width: 0,
    // height: 0,
    // marginTop: 10,
    // backgroundColor: 'transparent',
    // borderStyle: 'solid',
    // borderRightWidth: 200,
    // borderTopWidth: 50,
    // borderRightColor: 'transparent',
    // borderTopColor: 'red',
    // transform: [
    //     {rotate: '180deg'}
    //   ]
  },
});
