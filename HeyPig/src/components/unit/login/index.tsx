import * as React from 'react'
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
const styles = StyleSheet.create({
    WrapperView: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },

    LoginInput: {
        width: 300,
        height: 50,
        borderRadius: 10,
        backgroundColor: "white",
        elevation: 4,
        margin: 10,
        paddingHorizontal: 10
    },

    LoginButton: {
        width: 250,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#58ccff",
        justifyContent: "center",
        alignItems: "center",
        margin: 30
    },

    LogoImage: {
        width: 150,
        height: 150,
        margin: 30,
    }
})

export function LoginScreen({navigation, props}:any) {

    function onPressLogin() {
    }

    return(
        <View style={styles.WrapperView}>
            <Image style={styles.LogoImage} source={require('../../../Assets/images/logo.png')} />
            <View>
                <TextInput style={styles.LoginInput} placeholder="아이디를 입력해주세요."/>
                <TextInput style={styles.LoginInput} secureTextEntry={true} placeholder="비밀번호를 입력해주세요."/>
            </View>
            <Pressable style={styles.LoginButton} onPress={onPressLogin}>
                <Text>로그인</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Signup')}>
                <Text>회원가입</Text>
            </Pressable>
        </View>
    )

}