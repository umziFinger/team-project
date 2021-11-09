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
        backgroundColor: "#58ccff",
        justifyContent: "center",
        alignItems: "center",
        margin: 30
    },
})

export default function GoalPage({navigation}:any) {
    const user = auth().currentUser;
    function onPressSignUp() {
      const user = auth().currentUser
        firestore().collection('Users').doc(user?.email).collection("Info").add({ goal: "11", height:"11" })
        //main으로
        
    }

    return(
        <View style={styles.WrapperView}>
            <View>
                <TextInput style={styles.SignupInput} placeholder="키(cm)를 입력해주세요." />
                <TextInput style={styles.SignupInput} placeholder="현재 몸무게를 입력해주세요." />
                <TextInput style={styles.SignupInput} placeholder="목표 몸무게를 입력해주세요."/>
            </View>
            <Pressable style={styles.SignupButton} onPress={onPressSignUp}>
                <Text>회원가입</Text>
            </Pressable>
        </View>
    )

}