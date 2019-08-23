import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: [1, 2, 3, 4, 5, 6],
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Privacy Please</Text>
        {this.renderModules()}
      </View>
    );
  }

  renderModules() {
    return this.state.modules.map(item => {
      return (
        <View key={item} style={styles.module}>
          <Text>{item}</Text>
        </View>
      );
    });
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  module: {
    backgroundColor: 'darkcyan',
    height: 75,
    width: 300,
    marginBottom: 10,
  },
});
