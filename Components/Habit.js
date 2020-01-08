import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TouchableOpacityBase } from 'react-native';

export default class Habits extends React.Component {
  constructor(props) {
    super(props);
  }

  addCompleted = () => {
    var updatedRepetitions = this.props.habit.repetitionsCompleted + 1
    this.props.updateRepetitionsCompleted(updatedRepetitions);
  }

  decreaseCompleted = () => {
    var updatedRepetitions = this.props.habit.repetitionsCompleted - 1
    this.props.updateRepetitionsCompleted(updatedRepetitions);
  }

  render() {
    const completion = `${this.props.habit.repetitionsCompleted / this.props.habit.repetitions * 100}%`

    return (
      <View style={styles.container}>
        <View style={[styles.completionBar, {width: completion}]}>
        </View>
        <View style={{ width: "100%", backgroundColor: 'transparent', height: '100%', position: "absolute", flexDirection: 'row'}}>
          <TouchableOpacity style={{ width: '50%', height: '100%'}} onPress={this.decreaseCompleted}></TouchableOpacity>
          <TouchableOpacity style={{ width: '50%', height: '100%'}} onPress={this.addCompleted}></TouchableOpacity>
        </View>
        <View style={styles.text} pointerEvents="none">
          <Text>
            {this.props.habit.title}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 10,
    height: 60,
    borderRadius: 10,
    alignSelf: "stretch",
    backgroundColor: '#FFF',
    overflow: "hidden",
    justifyContent: "center"
  },
  text: {
    position: "absolute",
    marginLeft: 40,
  },
  completionBar: {
    backgroundColor: '#378F36',
    height: '100%',
  }
})