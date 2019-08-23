import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import VolumeModule from './volumeModule';
import { Audio } from 'expo-av';

export default class AudioModule extends React.Component {
  constructor(props) {
    super(props);
    this.sound = new Audio.Sound();
    this.isPlaying = false;
    this.state = {
      profile: props.profile,
      volume: props.volume,
      imageOpacity: 0.1,
    };
  }

  render() {
    return (
      <View style={styles.audioContainer}>
        <TouchableOpacity onPress={this.activateButton}>
          <View style={styles.button} opacity={this.state.imageOpacity}>
            <Text>audio button</Text>
          </View>
        </TouchableOpacity>
        <VolumeModule
          ref={instance => {
            this.volumeSlider = instance;
          }}
        />
      </View>
    );
  }
  activateButton = async () => {
    if (!this.isPlaying) {
      await this.playAudio();
      this.highlightBox();
    //   this.volumeSlider.disabled(false);
    } else {
      this.sound.stopAsync();
      this.sound.unloadAsync();
      this.isPlaying = false;
      this.unHighlightBox();
    //   this.volumeSlider.disabled(true);
    }
  };
  highlightBox() {
    this.setState({
      imageOpacity: 0.9,
    });
  }

  unHighlightBox() {
    this.setState({
      imageOpacity: 0.2,
    });
  }

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
    } else if (this.state.profile === '4') {
      return require('../assets/audio/4.mp3');
    } else if (this.state.profile === '5') {
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
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'pink',
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
