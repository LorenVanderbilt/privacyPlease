import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import VolumeModule from './volumeModule';
import { Audio } from 'expo-av';
import AwesomeButton from 'react-native-really-awesome-button';

export default class AudioModule extends React.Component {
  constructor(props) {
    super(props);
    this.sound = new Audio.Sound();
    this.isPlaying = false;
    this.state = {
      profile: props.profile,
      volume: props.volume,
    };
  }

  activateButton = async () => {
    if (!this.isPlaying) {
      await this.playAudio();
      this.volumeSlider.disabled(false);
    } else {
      this.sound.stopAsync();
      this.sound.unloadAsync();
      this.isPlaying = false;
      this.volumeSlider.disabled(true);
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
      return require('../assets/audio/1.mp3');
    } else if (this.state.profile === 'shower') {
      return require('../assets/audio/2.mp3');
    } else if (this.state.profile === 'hairdryer') {
      return require('../assets/audio/3.mp3');
    } else if (this.state.profile === 'washing machine') {
      return require('../assets/audio/4.mp3');
    } else if (this.state.profile === 'crowd') {
      return require('../assets/audio/5.mp3');
    } else if (this.state.profile === '6') {
      return require('../assets/audio/6.mp3');
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
        <AwesomeButton
          onPress={this.activateButton}
          style={styles.button}
          width={75}
          textColor={'pink'} // color of text
          raiseLevel={6} // button height
          backgroundActive={'gray'} //color flash when press
          backgroundColor={'darkcyan'} //color of button
        >
          {this.state.profile}
        </AwesomeButton>
        <VolumeModule
          ref={instance => {
            this.volumeSlider = instance;
          }}
          defaultVolume={this.state.volume}
          onVolumeChange={this.volumeChanged}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
  },
  audioContainer: {
    flexDirection: 'row',
    width: 300,
    height: 65,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
