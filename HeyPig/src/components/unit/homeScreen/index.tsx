import * as React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  LineChart,
} from "react-native-chart-kit";
import WeightPage from './weight';
import { GlobalContext } from '~/App';
import { Draggable } from './draggable';

const styles = StyleSheet.create({
  GoalView: {
    height: 200,
    width: 350,
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#ffd600',
    paddingHorizontal: 15,
    elevation: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  WeightView: {
    height: 200,
    width: 350,
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#ffd600',
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
    backgroundColor: '#ffd600',
    paddingTop: 20,
    paddingLeft: 20,
    elevation: 3,
  },

  MealView: {
    height: 200,
    width: 350,
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#ffd600',
    paddingTop: 20,
    paddingLeft: 20,
    elevation: 3,
  },

});

export default function HomePage({navigation}:any) {

  const {infoData, user, diary, date}:any = React.useContext(GlobalContext)

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  const screenWidth = 400
  // const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: [],
    datasets: [
      {
        data: [23, 45, 28, 80, 99, 43],
        color: (opacity = 0) => `rgba(0,0,0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: [] // optional
  };

  const leftWeight = Number(diary[0]?.weight)-Number(infoData?.goal)

  const today = diary.filter((el:any) => el.date===date+1)

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <WeightPage/>
      <Pressable
        style={styles.GoalView}
        onPress={() => navigation.navigate('GoalPage')}>
        {diary[0]?.weight && <Text style={{position:'absolute', width: 300, height:160, color:'#ec407a', fontWeight:'bold'}}>
          {leftWeight > 0 ? `${leftWeight}kg 남았습니다!` : `목표달성(현재 : ${diary[0]?.weight}kg)`}
        </Text>}
        <Text style={{fontSize:50, fontFamily: 'Yangjin'}}>{infoData.goal ? `${infoData.goal}kg` : '목표!'}</Text>
      </Pressable>
      <Draggable/>
      {/* <Pressable
        style={styles.WeightView}
        onPress={() => navigation.navigate('WeightPage')}>
        <Text>weight</Text>
      </Pressable> */}
      {/* <Pressable
        style={styles.ExerciseView}
        // onPress={() => navigation.navigate('ExercisePage')}
      >
        <Text style={{fontSize:20, fontFamily: 'Yangjin'}}>오늘 할 운동</Text>
        <View style={{marginLeft: 170, marginTop: 30}}>
          <Text style={{margin:5, fontSize:17, fontWeight:'bold'}}>▶︎ {today[0] ? today[0]?.exercise : '입력해주세요'}</Text>
          <Text style={{margin:5, fontSize:17, fontWeight:'bold'}}>▶︎ 윗몸일으키기</Text>
          <Text style={{margin:5, fontSize:17, fontWeight:'bold'}}>▶︎ 팔굽혀펴기</Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.MealView}
        // onPress={() => navigation.navigate('MealPage')}
      >
        <Text style={{fontSize:20, fontFamily: 'Yangjin'}}>오늘 먹을 음식</Text>
        <View style={{marginLeft: 170, marginTop: 30}}>
          <Text style={{margin:5, fontSize:17, fontWeight:'bold'}}>▶︎ {today[0] ? today[0]?.food : '입력해주세요'}</Text>
          <Text style={{margin:5, fontSize:17, fontWeight:'bold'}}>▶︎ 토마토</Text>
          <Text style={{margin:5, fontSize:17, fontWeight:'bold'}}>▶︎ 닭가슴살</Text>
        </View>
      </Pressable> */}
    </ScrollView>
  );
}
