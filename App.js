import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import { RadioButton, Appbar } from 'react-native-paper';
import { HabitsPage, Frequency } from "./Components/utils/selection";

import Habit from './Components/Habit';

export default class App extends React.Component {

   constructor(props) {
      super(props)
   }

   state = {
      /* collection of all the habits */
      habits: [],

      /* attributes of a single habit */
      title: "",
      frequency: Frequency.Daily,
      repetitions: 0,
      repetitionsCompleted: 0,

      /* to control view of display/add habits */
      viewHabits: HabitsPage.DisplayHabits,
   };

   AddButtonPressed = () => {
      if (this.state.viewHabits == HabitsPage.DisplayHabits) {
         this.setState({
            viewHabits: HabitsPage.AddHabit
         })
      } else if (this.state.title.length > 0) {

         var tempHabits = this.state.habits
         tempHabits.push({
            title: this.state.title,
            frequency: this.state.frequency,
            repetitions: this.state.repetitions,
            repetitionsCompleted: this.state.repetitionsCompleted
         })
         this.setState({
            habits: tempHabits,
            title: "",
            frequency: Frequency.Daily,
            repetitions: 0,
            repetitionsCompleted: 0,
            viewHabits: HabitsPage.DisplayHabits
         })

      }
   }

   handleHabitTitleChange = (e) => {
      this.setState({
         title: e
      })
   }

   _goBack = () => {
      this.setState({
         viewHabits: HabitsPage.DisplayHabits
      })
   }

   render() {
      onTimesCompletedChange = (key, completedTimes) => {
         var tempHabits = this.state.habits
         tempHabits[key]["repetitionsCompleted"] = completedTimes
         this.setState({
            habits: tempHabits
         })
      }

      const { checked } = this.state;
      const habits = this.state.habits.map(
         function (item, key) {
            return <Habit
               habit={item}
               callBackFunc={(data) => {
                  onTimesCompletedChange(key, data)
               }}
            />
         }
      )

      const displayAddHabit =
         <View>
            {/* INPUT TEXT */}
            <TextInput
               style={styles.input}
               value={this.state.habitTitle}
               underlineColorAndroid="transparent"
               placeholder="Add Habit.."
               placeholderTextColor="#979681"
               autoCapitalize="none"
               onChangeText={this.handleHabitTitleChange}
            />

            {/* RADIO BUTTON SELECTION */}
            <View>

               <View style={styles.radio}>
                  <RadioButton
                     color="white"
                     value={Frequency.Daily}
                     status={checked == Frequency.Daily ? 'checked' : 'unchecked'}
                     onPress={() => { this.setState({ checked: Frequency.Daily }); }}
                  />
                  <Text>
                     {Frequency.Daily}
                  </Text>
               </View>
               <View style={styles.radio}>
                  <RadioButton
                     color="white"
                     value={Frequency.Weekly}
                     status={checked == Frequency.Weekly ? 'checked' : 'unchecked'}
                     onPress={() => { this.setState({ checked: Frequency.Weekly }); }}
                  />
                  <Text>
                     {Frequency.Weekly}
                  </Text>
               </View>
               <View style={styles.radio}>
                  <RadioButton
                     color="white"
                     value={Frequency.Monthly}
                     status={checked === Frequency.Monthly ? 'checked' : 'unchecked'}
                     onPress={() => { this.setState({ checked: Frequency.Monthly }); }}
                  />
                  <Text>
                     {Frequency.Monthly}
                  </Text>
               </View>
               <View style={styles.radio}>
                  <RadioButton
                     color="white"
                     value={Frequency.Yearly}
                     status={checked === Frequency.Yearly ? 'checked' : 'unchecked'}
                     onPress={() => { this.setState({ checked: Frequency.Yearly }); }}
                  />
                  <Text>
                     {Frequency.Yearly}
                  </Text>
               </View>

            </View>
         </View>

      const displayHabits =
         <View>
            {
               habits
            }
         </View>

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
            </Appbar.Header>

            {/* CENTER ELEMENT */}
            <View style={{ alignSelf: 'stretch' }}>
               {this.state.viewHabits == HabitsPage.DisplayHabits ? displayHabits : displayAddHabit}
            </View>


            {/* ADD BUTTON */}
            <TouchableOpacity activeOpacity={.8} style={styles.fullWidthButton} onPress={this.AddButtonPressed}>
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