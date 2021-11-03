import * as React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

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

export function SignUpScreen() {

    return(
        <View style={styles.WrapperView}>
            <View>
                <TextInput style={styles.SignupInput} placeholder="아이디를 입력해주세요." />
                <TextInput style={styles.SignupInput} placeholder="이름을 입력해주세요."/>
                <TextInput style={styles.SignupInput} secureTextEntry={true} placeholder="비밀번호를 입력해주세요."/>
                <TextInput style={styles.SignupInput} secureTextEntry={true} placeholder="비밀번호를 다시한번 입력해주세요."/>
            </View>
            <Pressable style={styles.SignupButton}>
                <Text>회원가입</Text>
            </Pressable>
        </View>
    )

}