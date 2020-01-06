import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity, Image } from 'react-native';
import { RadioButton, Appbar } from 'react-native-paper';

import Frequency from './Components/utils/selection'

export default class App extends React.Component {

   constructor(props) {
      super(props)
   }

   state = {
      checked: Frequency.Daily,
   };

   buttonPressed() {
      var atta = Frequency.Daily
      console.log(atta)
   }

   handleHabit(e) {
      console.log(e)
   }

   render() {
      const { checked } = this.state;

      return (

         <View style={styles.container}>
            <StatusBar hidden />

            {/* TOP APPBAR */}
            <Appbar.Header style={styles.appBar}>
               <Appbar.BackAction
                  onPress={this._goBack}
               />
               <Appbar.Content
                  title="Habits"
               />
               <Appbar.Action icon="magnify" onPress={this._handleSearch} />
            </Appbar.Header>

            {/* INPUT TEXT */}
            <TextInput
               style={styles.input}
               underlineColorAndroid="transparent"
               placeholder="Add Habit.."
               placeholderTextColor="#979681"
               autoCapitalize="none"
               onChangeText={this.handleHabit}
            />

            {/* RADIO BUTTON SELECTION */}
            <View style={{ alignSelf: 'stretch' }}>

               <View style={styles.radio}>
                  <RadioButton
                     color="white"
                     value="first"
                     status={checked === 'first' ? 'checked' : 'unchecked'}
                     onPress={() => { this.setState({ checked: 'first' }); }}
                  />
                  <Text>
                     First
                  </Text>
               </View>
               <View style={styles.radio}>
                  <RadioButton
                     color="white"
                     value="second"
                     status={checked === 'second' ? 'checked' : 'unchecked'}
                     onPress={() => { this.setState({ checked: 'second' }); }}
                  />
                  <Text>
                     Second
                  </Text>
               </View>

            </View>

            {/* ADD BUTTON */}
            <TouchableOpacity activeOpacity={.8} style={styles.fullWidthButton} onPress={this.buttonPressed}>
               <Text style={styles.fullWidthButtonText}>+</Text>
            </TouchableOpacity>

         </View>

      );
   }
}

const styles = StyleSheet.create({
   appBar: {
      alignSelf: 'stretch',
      width: "100%",
      height: 70,
   },
   radio: {
      paddingLeft: 20,
      alignSelf: 'stretch',
      flexDirection: 'row',
      alignItems: "center",
   },
   container: {
      flex: 1,
      backgroundColor: '#CBCCBE',
      alignItems: 'center',
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
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
   },
   fullWidthButtonText: {
      fontSize: 24,
      color: '#979681'
   },
});