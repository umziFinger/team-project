import * as React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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

  const [date, setDate] = React.useState(0)

  const [infoData, setInfoData]:any = React.useState({})
  const [diaryData, setDiaryData]:any = React.useState({})


  const user:any = auth().currentUser  
  const signinDate:any = new Date(user?.metadata.creationTime.slice(0,10))
  const currentDate:any = new Date(new Date().toISOString().slice(0,10))

  React.useEffect(() => {
    setDate((currentDate-signinDate)/(3600000*24))
  },[])

  React.useEffect(() => {
    {user?.email === null
      ?
        firestore().collection("Users").doc(String(user?.uid)).collection('Info').get()
          .then(snapshot => {
            snapshot.forEach(doc => {
                setInfoData(doc.data());
            });
          })
      :
        firestore().collection("Users").doc(String(user?.email)).collection('Info').get()
          .then(snapshot => {
            snapshot.forEach(doc => {
                setInfoData(doc.data());
            });
          })
    }
  },[firestore().collection("Users").doc(String(user?.email)).collection('Info').get()])

  
  // 다이어리에 쓴 내용(오늘의 식단, 오늘의 운동)을 불러와서 홈화면에 띄울려고 했는데 
  // 이거 쓰니까 속도가 현저히 떨어져서 일단 보류
  
  // React.useEffect(() => {
  //   firestore().collection("Users").doc(String(user?.email)).collection('Diary').where('date','==', date+1).get()
  //     .then(snapshot => {
  //       snapshot.forEach(doc => {
  //           setDiaryData(doc.data());
  //       });
  //     })
  // },[firestore().collection("Users").doc(String(user?.email)).collection('Diary').get()])


  return (
    <ScrollView>
      <Pressable
        style={styles.GoalView}
        onPress={() => navigation.navigate('GoalPage')}>
        <Text style={{fontSize:50}}>{infoData.goal ? `${infoData.goal}kg` : '목표!'}</Text>
      </Pressable>
      <Pressable
        style={styles.WeightView}
        onPress={() => navigation.navigate('WeightPage')}>
        <Text>weight</Text>
      </Pressable>
      <Pressable
        style={styles.ExerciseView}
        onPress={() => navigation.navigate('ExercisePage')}>
        {/* <Text>{diaryData.exercise ? diaryData.exercise : '오늘 할 운동'}</Text> */}
      </Pressable>
      <Pressable
        style={styles.MealView}
        onPress={() => navigation.navigate('MealPage')}>
        {/* <Text>{diaryData.food ? diaryData.food : '오늘 먹을 음식'}</Text> */}
      </Pressable>
    </ScrollView>
  );
}
