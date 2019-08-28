import React from 'react';
import { View, StyleSheet, MaskedViewIOS, Text } from 'react-native';
import CustomCurser from './customCurser';
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
        {this.props.fontLoaded ? (
          <MaskedViewIOS //this is the container shape layer
            style={{ flex: 1, flexDirection: 'row', height: '100%' }}
            maskElement={
                <View style={styles.volumeContainer} />
            }
          >
            <MaskedViewIOS // this is the text layer
              style={{ flex: 1, flexDirection: 'row', height: '100%' }}
              maskElement={
                <View
                  style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginLeft: -30,
                    marginTop: -2, // centers the mask text in the container
                  }}
                >
                  <Text
                    style={{
                      fontSize: 55,
                      color: 'black',
                      fontWeight: 'bold',
                      marginBottom: 0,
                      fontFamily: 'Neon',
                    }}
                  >
                    ///////////////////
                  </Text>
                </View>
              }
            >
              {/* this is the background slider layer */}
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
                //     // margin: 10,
                //   }}
                trackStyle={{
                  // make track thicker
                  height: 100,
                }}
                // customMarker={() => {
                //   return null; //
                // }}
              />
            </MaskedViewIOS>
            <View style={styles.triangle} />

          </MaskedViewIOS>
        ) : null}
        {/* forground slider used for just curser */}
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
            marginTop: -4,
          }}
          unselectedStyle={{
            backgroundColor: 'pink',
            marginTop: -4,
          }}
          containerStyle={{
            //aligns the top and bottom slider
            marginTop: -60,
          }}
          trackStyle={{
            // make track thicker
            height: 0,
          }}
          customMarker={() => {
            return <CustomCurser />;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  volumeContainer: {
    width: 200,
    height: '90%',
    backgroundColor: 'black',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginRight: 5,

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
  trap: {
    width: 200,
    height: 0,
    borderBottomWidth: 100,
    borderBottomColor: 'red',
    borderLeftWidth: 50,
    borderLeftColor: 'transparent',
    // borderRightWidth: 50,
    // borderRightColor: 'transparent',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    // borderStyle: 'solid'
  },
  mask: {
    width: 170,
    height: 60,
    backgroundColor: 'red',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginLeft: -230,
  },
  mask2: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 60,
    borderTopWidth: 100,
    borderLeftWidth: 200,
    borderRightColor: 'transparent',
    borderTopColor: 'red',
    borderBottomLeftRadius: 50,
    transform: [{ rotate: '180deg' }],
    marginLeft: -30,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 45,
    borderTopWidth: 65,
    borderRightColor: 'transparent',
    borderTopColor: 'gray',
    marginRight: -45,
  }
});
