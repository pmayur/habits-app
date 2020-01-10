import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity, Picker } from 'react-native';
import { RadioButton, Appbar } from 'react-native-paper';
import { HabitsPage, Frequency } from "./Components/utils/selection";
import Icon from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'

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
      frequency: Frequency.Day,
      repetitions: "",
      repetitionsCompleted: 0,

      /* to control view of display/add habits */
      viewHabits: HabitsPage.DisplayHabits,
   };

   AddButtonPressed = () => {
      if (this.state.viewHabits == HabitsPage.DisplayHabits) {
         this.setState({
            viewHabits: HabitsPage.AddHabit
         })
      } else if (this.state.title.length > 0 && this.state.repetitions > 0) {

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
            frequency: Frequency.Day,
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

   handleRepetitionsChange = (e) => {
      console.log(e)
      if(e) {
         this.setState({
            repetitions: parseInt(e)
         })
      } else {
         this.setState({
            repetitions: 0
         })
      }
   }

   _goBack = () => {
      this.setState({
         viewHabits: HabitsPage.DisplayHabits
      })
   }

   categorizeHabits = (habitsArr) => {

      let categorizedHabits = {}
      let viewList = []
      let { habits } = this.state
      let thisReference = this

      Object.keys( Frequency ).forEach( (freq) => {
         categorizedHabits[freq] = []
      })

      /* Categorize Habits according to their frequency */
      habitsArr.forEach( (habit) => {
         categorizedHabits[habit.frequency].push(habit)
      })

      for ( var habit in categorizedHabits ) {

         const habitList = categorizedHabits[habit].map(
            function( item, key) {
               return <Habit
                  habit={item}
                  key={key}
                  updateRepetitionsCompleted={
                     (completedTimes) => {
                        var tempHabits = habits
                        tempHabits[habits.indexOf(item)]["repetitionsCompleted"] = completedTimes
                        thisReference.setState({
                           habits: tempHabits
                        })
                     }
                  }
               />
            }
         )

         if (habitList.length > 0) {
            viewList.push(
               <View>
                  <Text style={{ paddingLeft: 0, paddingBottom: 5, paddingTop: 10 }}>
                     {habit}
                  </Text>
                  {
                     habitList
                  }
               </View>
            )
         }
      }
      return viewList
   }

   incTimes = () => {
      this.setState({
         repetitions: this.state.repetitions + 1
      })
   }

   decTimes = () => {
      this.setState({
         repetitions: this.state.repetitions - 1
      })
   }

   render() {

      const categorizedHabits = this.categorizeHabits(this.state.habits)

      const displayAddHabit =

         <View>
            <View style={{margin: 5}}>
               <Text style={styles.homeText}>
                  I Want to
               </Text>
               {/* INPUT TEXT */}
               <TextInput
                  style={styles.titleInput}
                  value={this.state.habitTitle}
                  underlineColorAndroid="transparent"
                  placeholder="Add Habit.."
                  placeholderTextColor="#979681"
                  autoCapitalize="sentences"
                  onChangeText={this.handleHabitTitleChange}
               />
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', margin: 5}}>
               <View>
                  <TextInput
                     style={styles.repetitionsInput}
                     value={this.state.repetitions.toString() || "0"}
                     keyboardType='numeric'
                     textAlign={'center'}
                     underlineColorAndroid="transparent"
                     placeholder="0"
                     placeholderTextColor="#979681"
                     onChangeText={this.handleRepetitionsChange}
                  />
               </View>

               <Text style={{margin:20}}>times</Text>

               <View style={{flex: 1, flexDirection:'row'}}>
                  <TouchableOpacity style={styles.selectRepetitionIcons} onPress={this.decTimes}>
                     <Icon name={'minus'}  size={15} color="#01a699" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.selectRepetitionIcons} onPress={this.incTimes}>
                     <Icon name={'plus'}  size={15} color="#01a699" />
                  </TouchableOpacity>
               </View>
            </View>

            <View style={{margin: 5}}>
               <Text style={styles.homeText}>
                  Every
               </Text>

               <View style={{ backgroundColor: 'white',width:100, borderRadius: 5, overflow: 'hidden'}}>
                  <Picker
                     selectedValue={this.state.frequency}
                     style={{height: 50, width: 100,}}
                     onValueChange={(itemValue) =>
                        this.setState({frequency: itemValue})
                     }
                  >
                     <Picker.Item label={Frequency.Day} value={Frequency.Day} />
                     <Picker.Item label={Frequency.Week} value={Frequency.Week} />
                     <Picker.Item label={Frequency.Month} value={Frequency.Month}/>
                     <Picker.Item label={Frequency.Year} value={Frequency.Year} />
                  </Picker>
               </View>
            </View>

         </View>

      const displayHabits =
         <View>
            {
               categorizedHabits
            }
         </View>

      return (

         <View style={styles.container}>
            <StatusBar hidden />

            {/* TOP APPBAR */}
            <Appbar.Header style={styles.appBar}>
               {
                  this.state.viewHabits == HabitsPage.AddHabit ?
                  <Appbar.BackAction
                     onPress={this._goBack}
                  /> :
                  <View style={{width: 48}}></View>
               }
               <Appbar.Content
                  title="Habits"
               />
            </Appbar.Header>

            {/* CENTER ELEMENT */}
            <View style={{ alignSelf: 'stretch', padding: 10, marginLeft: 5 }}>
               {this.state.viewHabits == HabitsPage.DisplayHabits ? displayHabits : displayAddHabit}
            </View>


            {/* ADD BUTTON */}
            <TouchableOpacity activeOpacity={.8} style={styles.fullWidthButton} onPress={this.AddButtonPressed}>
               <Text style={styles.fullWidthButtonText}>
                  { this.state.viewHabits == HabitsPage.AddHabit ? "Save" : "Add Habit"}
               </Text>
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
   homeText: {
      marginBottom: 5
   },
   selectRepetitionIcons: {
      margin: 15,
      alignItems:'center',
      justifyContent:'center',
      width:40,
      height:40,
      backgroundColor:'#fff',
      borderRadius:50,
   },
   container: {
      flex: 1,
      backgroundColor: '#CBCCBE',
   },
   titleInput: {
      height: 50,
      width: "60%",
      backgroundColor: 'white',
      alignSelf: 'stretch',
      borderColor: '#E5E5D9',
      borderRadius: 5,
   },
   repetitionsInput: {
      width: 80,
      height: 50,
      backgroundColor: 'white',
      borderColor: '#E5E5D9',
      borderRadius: 5,
      alignContent:'center',
      justifyContent: 'center'
   },
   fullWidthButton: {
      backgroundColor: 'white',
      height: 50,
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
      fontSize: 16,
      color: '#979681'
   },
});