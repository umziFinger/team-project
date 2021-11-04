import * as React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  BoardView: {
    height: 200,
    width: 350,
    margin: 20,
    // borderRadius: 10,
    backgroundColor: 'green',
    paddingHorizontal: 15,
    // elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default function HomePage({navigation}) {
  return (
    <ScrollView>
      <Text>home</Text>
      <Pressable
        style={styles.BoardView}
        onPress={() => navigation.navigate('GoalPage')}>
        <Text>goal</Text>
      </Pressable>
      <Pressable
        style={styles.BoardView}
        onPress={() => navigation.navigate('WeightPage')}>
        <Text>weight</Text>
      </Pressable>
      <Pressable
        style={styles.BoardView}
        onPress={() => navigation.navigate('ExercisePage')}>
        <Text>exercise</Text>
      </Pressable>
      <Pressable
        style={styles.BoardView}
        onPress={() => navigation.navigate('MealPage')}>
        <Text>meal</Text>
      </Pressable>
    </ScrollView>
  );
}
