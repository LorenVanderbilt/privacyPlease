import React from 'react';
import { View, StyleSheet, MaskedViewIOS, Text } from 'react-native';
import CustomCurser from './customCurser';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

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
      <View style={styles.volumeContainer}>
        {this.props.fontLoaded ? (
          <MaskedViewIOS //this is the container shape layer
            style={{flex: 1, flexDirection: 'row', height: '100%', marginLeft: 90}}
            maskElement={
                <View style={styles.mask} />
            }
          >
            <MaskedViewIOS // this is the text layer
              maskElement={
                <View
                  style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // alignContent: 'flex-end',
                    marginLeft: -19,
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
                      marginLeft: -3 // push letters left
                    }}
                  >
                       ''/////////////////////
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
                step={0.01}
                enabledOne={this.state.enabled}
                selectedStyle={{
                  backgroundColor: 'darkcyan',
                }}
                unselectedStyle={{
                  backgroundColor: 'pink',
                }}
                trackStyle={{
                  // make track thicker
                  height: 100,
                }}

              />
            </MaskedViewIOS>
            {/* <View style={styles.triangle} /> */}
          </MaskedViewIOS>
        ) : null}
        {/* forground slider used only for curser */}
        <MultiSlider
          values={this.state.volume}
          sliderLength={195}
          onValuesChange={this.sliderValueChanged.bind(this)}
          min={0}
          max={1}
          step={0.01}
          enabledOne={this.state.enabled}
          selectedStyle={{
            // backgroundColor: 'pink',
            marginTop: -4,
          }}
          unselectedStyle={{
            // backgroundColor: 'darkcyan',
            marginTop: -4,
          }}
          containerStyle={{
            //aligns the top and bottom slider
            marginTop: -60,
            marginLeft: 5
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
    position: 'absolute',
    width: '97%',
    height: '90%',
    backgroundColor: 'darkgray',
    borderRadius: 50,
    marginLeft: 5, // gap between edge and boarder
    // alignContent: 'flex-end',
    // marginLeft: -90 // change to -30
  

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
  mask: {
    width: '100%',
    height: '85%',
    backgroundColor: 'black',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginLeft: -0.5,
    opacity: 1,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 45,
    borderTopWidth: 58,
    borderRightColor: 'transparent',
    borderTopColor: 'darkcyan',
    zIndex: 2,
    position: 'absolute',
    opacity: 1
  }
});
