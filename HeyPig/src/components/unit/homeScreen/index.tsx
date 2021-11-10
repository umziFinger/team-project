import * as React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  GoalView: {
    height: 200,
    width: 350,
    margin: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  WeightView: {
    height: 200,
    width: 350,
    margin: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  ExerciseView: {
    height: 200,
    width: 350,
    margin: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  MealView: {
    height: 200,
    width: 350,
    margin: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default function HomePage({navigation}:any) {
  return (
    <ScrollView>
      <Pressable
        style={styles.GoalView}
        onPress={() => navigation.navigate('GoalPage')}>
        <Text style={{fontSize:50}}>13kg</Text>
      </Pressable>
      <Pressable
        style={styles.WeightView}
        onPress={() => navigation.navigate('WeightPage')}>
        <Text>weight</Text>
      </Pressable>
      <Pressable
        style={styles.ExerciseView}
        onPress={() => navigation.navigate('ExercisePage')}>
        <Text>exercise</Text>
      </Pressable>
      <Pressable
        style={styles.MealView}
        onPress={() => navigation.navigate('MealPage')}>
        <Text>meal</Text>
      </Pressable>
    </ScrollView>
  );
}
