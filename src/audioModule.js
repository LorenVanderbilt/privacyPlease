import React from 'react';
import { View, StyleSheet } from 'react-native';
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
      buttonTextColor: 'white',
    //   opacity: 0.3
    };
  }

  activateButton = async () => {
    if (!this.isPlaying) {
      await this.playAudio();
      this.volumeSlider.enabled(true);
      this.setState({ buttonTextColor: 'pink'});
    } else {
      this.sound.stopAsync();
      this.sound.unloadAsync();
      this.isPlaying = false;
      this.volumeSlider.enabled(false);
      this.setState({ buttonTextColor: 'white'});

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
    } else if (this.state.profile === 'hair dryer') {
      return require('../assets/audio/hairdryer.mp3');
    } else if (this.state.profile === 'washing machine') {
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

  /*style={[
    styles.preview,
    props.cameraProps.flip ? styles.mirror : styles.preview,
  ]}
  */

  /* COMPONENT */
  render() {
    return (
      <View style={styles.audioContainer}>
        <AwesomeButton
          onPress={this.activateButton}
          style={styles.button}
          width={75}
          textColor={this.state.buttonTextColor} // color of text
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
        //   opacity={this.state.opacity}
          volumeChanged={this.volumeChanged}
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
