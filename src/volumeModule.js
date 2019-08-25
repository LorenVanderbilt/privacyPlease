import React from 'react';
import { View, StyleSheet, MaskedViewIOS, Text } from 'react-native';
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

  sliderValueChanged(volume) {
    this.setState({ volume: volume });
    this.props.volumeChanged(volume[0]);
  }

  /* COMPONENT */
  render() {
    return (
      <View style={[styles.volumeContainer, { opacity: this.props.opacity }]}>
        <MaskedViewIOS
          style={{ flex: 1, flexDirection: 'row', height: '100%' }}
          maskElement={
            <View
              style={{
                backgroundColor: 'transparent',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 40,
                  color: 'black',
                  fontWeight: 'bold',
                  marginBottom: 0
                }}
              >
                IIIIIIIIIIIIIIIIII
              </Text>
            </View>
          }
        >
          {/* this slider stays behind the mask */}
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
            //   containerStyle={{
            //     //pushed track down
            //     margin: 10,
            //   }}
            trackStyle={{
              // make track thicker
              height: 70,
            }}
            customMarker={() => {
              return null; // 
            }}
          />
        </MaskedViewIOS>

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
          containerStyle={{
            //aligns the top and bottom slider
            marginTop: -60
          }}
          trackStyle={{
            // make track thicker
            height: 1,
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
    height: 60,
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
