import * as React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
const styles = StyleSheet.create({

    WrapperView: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },

    SignupInput: {
        width: 300,
        height: 50,
        borderRadius: 10,
        backgroundColor: "white",
        elevation: 4,
        margin: 10,
        paddingHorizontal: 10
    },

    SignupButton: {
        width: 250,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#ffd600",
        justifyContent: "center",
        alignItems: "center",
        margin: 30
    },
})

export default function GoalPage({navigation}:any) {

    const [height, setHeight] = React.useState('')
    const [currentWeight, setCurrentWeight] = React.useState('')
    const [goal, setGoal] = React.useState('')

    function onChangeHeight (event:any) {
        setHeight(event.target.value)
    }

    function onChangeCurrentWeight (event:any) {
        setCurrentWeight(event.target.value)
    }

    function onChangeGoal (event:any) {
        setGoal(event.target.value)
    }

    const user = auth().currentUser;
    function onPressSignUp() {
      const user = auth().currentUser
        {user?.email === null
            ?
                firestore()
                    .collection('Users')
                    .doc(String(user?.uid))
                    .collection("Info")
                    .doc("myInfo")
                    .set({ goal, height, currentWeight })
            :
                firestore()
                    .collection('Users')
                    .doc(String(user?.email))
                    .collection("Info")
                    .doc("myInfo")
                    .set({ goal, height, currentWeight })
        }   
        navigation.navigate('HomePage')
        
    }

    return(
        <View style={styles.WrapperView}>
            <View>
                <TextInput style={styles.SignupInput} placeholder="키(cm)를 입력해주세요." onChangeText={text => setHeight(text)}/>
                <TextInput style={styles.SignupInput} placeholder="현재 몸무게를 입력해주세요." onChangeText={text => setCurrentWeight(text)}/>
                <TextInput style={styles.SignupInput} placeholder="목표 몸무게를 입력해주세요." onChangeText={text => setGoal(text)}/>
            </View>
            <Pressable style={styles.SignupButton} onPress={onPressSignUp}>
                <Text style={{fontFamily:'Yangjin'}}>목표 설정</Text>
            </Pressable>
        </View>
    )

}