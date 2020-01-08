import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default class Habits extends React.Component {
  constructor(props) {
    super(props);
  }

  addCompleted = () => {
    var markComplete = this.props.habit.repetitionsCompleted + 1
    this.props.callBackFunc(markComplete);
  }

  render() {
    const rows = [...Array(this.props.habit.repetitionsCompleted)].map(
      function (item, key) {
        return <View style={styles.singleItem}></View>
      }
    )

    return (
      <View style={{ alignSelf: 'stretch' }}>
        <Text style={{ margin: 5 }}>
          {this.props.habit.title}
        </Text>
        <TouchableOpacity onPress={this.addCompleted}>
          <View style={styles.completion}>
            {
              rows
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  singleItem: {
    borderRadius: 2,
    height: 48,
    width: 48,
    marginRight: 1,
    backgroundColor: '#33B021'
  },
  completion: {
    padding: 1,
    height: 50,
    width: '100%',
    backgroundColor: "#FFF",
    flexDirection: 'row',
    alignItems: "center",
  },
})