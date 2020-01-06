import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity, Image } from 'react-native';

import Frequency from './Components/utils/selection'

export default class App extends React.Component {

   buttonPressed() {
      var atta = Frequency.Daily
      console.log(atta)
   }

   handleHabit(e) {
      console.log(e)
   }

   render() {
      return (

         <View style={styles.container}>
            <StatusBar hidden />

            <TextInput
               style={styles.input}
               underlineColorAndroid="transparent"
               placeholder="Add Habit.."
               placeholderTextColor="#979681"
               autoCapitalize="none"
               onChangeText={this.handleHabit}
            />

            <TouchableOpacity activeOpacity={.8} style={styles.fullWidthButton} onPress={this.buttonPressed}>
               <Text style={styles.fullWidthButtonText}>+</Text>
            </TouchableOpacity>

         </View>

      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#CBCCBE',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   input: {
      margin: 15,
      height: 80,
      backgroundColor: 'white',
      alignSelf: 'stretch',
      borderColor: '#E5E5D9',
      borderRadius: 5,
      borderWidth: 1
   },
   fullWidthButton: {
      backgroundColor: 'white',
      height: 50,
      margin: 10,
      alignSelf: 'stretch',
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: "center",
   },
   fullWidthButtonText: {
      fontSize: 24,
      color: '#979681'
   },
});