import React from 'react';
import { View, StyleSheet } from 'react-native';
import VolumeModule from './volumeModule';
import { Audio } from 'expo-av';
import AwesomeButton from 'react-native-really-awesome-button';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../selection.json';
const expoAssetId = require('../assets/fonts/Privacy.ttf')
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'Privacy', expoAssetId);

export default class AudioModule extends React.Component {
  constructor(props) {
    super(props);
    this.sound = new Audio.Sound();
    this.isPlaying = false;
    this.state = {
      profile: props.profile,
      volume: props.volume,
      buttonTextColor: 'lightgray',
      //   opacity: 0.3
    };
  }

  activateButton = async () => {
    if (!this.isPlaying) {
      await this.playAudio();
      this.volumeSlider.enabled(true);
      this.setState({ buttonTextColor: 'pink' });
      // this.props.toggleModule()
    } else {
      this.sound.stopAsync();
      this.sound.unloadAsync();
      this.isPlaying = false;
      this.volumeSlider.enabled(false);
      this.setState({ buttonTextColor: 'lightgray' });
    }
  };

  volumeChanged = async vol => {
    if (this.isPlaying) {
      this.state.volume = vol;
      await this.sound.setVolumeAsync(vol);
    }
  };

  getAudio() {
    if (this.state.profile === 'sink') {
      return require('../assets/audio/sink.mp3');
    } else if (this.state.profile === 'shower') {
      return require('../assets/audio/shower.mp3');
    } else if (this.state.profile === 'hairdryer') {
      return require('../assets/audio/hairdryer.mp3');
    } else if (this.state.profile === 'washer') {
      return require('../assets/audio/washingmachine.mp3');
    } else if (this.state.profile === 'crowd') {
      return require('../assets/audio/crowd.mp3');
    } else if (this.state.profile === 'party') {
      return require('../assets/audio/party.mp3');
    }
  }
  
  playAudio = async () => {
    this.isPlaying = true;
    await Audio.setIsEnabledAsync(true);
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      });
    } catch (error) {
      console.log(error);
    }
    await this.sound.loadAsync(this.getAudio());
    this.volumeChanged(this.state.volume);
    await this.sound.playAsync();
    this.sound.setIsLoopingAsync(true);
    this.sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
  };

  onPlaybackStatusUpdate(status) {
    this.isPlaying = status.isPlaying;
  }

  /* COMPONENT */
  render() {
    return (
      <View style={styles.audioContainer}>
        {this.props.fontLoaded ? (
          <AwesomeButton
            onPress={this.activateButton}
            style={styles.button}
            width={75}
            textColor={this.state.buttonTextColor} // color of text
            textFontFamily={'Neon'}
            textSize={17}
            raiseLevel={5} // button height
            backgroundActive={'darkcyan'} //color flash when press
            backgroundColor={'cadetblue'} //color of button
            borderRadius={50}
            left={5}
            // ExtraContent={<Icon name={this.state.profile} size={32} color={'red'} />}
          >
            <Icon name={this.state.profile} size={48} color={this.state.buttonTextColor} />
            {/* {this.state.profile} */}
          </AwesomeButton>
        ) : null}
        <VolumeModule
          ref={instance => {
            this.volumeSlider = instance;
          }}
          defaultVolume={this.state.volume}
          //   opacity={this.state.opacity}
          volumeChanged={this.volumeChanged}
          fontLoaded={this.props.fontLoaded}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    height: 45,
    resizeMode: 'contain',

  },
  button: {
    marginLeft: 5,
  },
  audioContainer: {
    backgroundColor: 'lightgray',
    height: '90%',
    flexDirection: 'row',
    // width: 100%,
    borderRadius: 50,
    marginRight: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
});
