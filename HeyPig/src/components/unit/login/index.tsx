import * as React from 'react';
import {useState} from 'react';
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

import {gql, useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;
const styles = StyleSheet.create({
  WrapperView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  LoginInput: {
    width: 300,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 4,
    margin: 10,
    paddingHorizontal: 10,
  },

  LoginButton: {
    width: 250,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#58ccff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },

  LogoImage: {
    width: 150,
    height: 150,
    margin: 30,
  },
});

export function LoginScreen({navigation, setIsLoggedIn, setAccessToken}: any) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loginUser] = useMutation(LOGIN_USER);

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '516372818226-seegpa8dim5dmlevehf8d3an5dh17pmh.apps.googleusercontent.com'
    });
  }, []);

  async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  async function onPressLogin() {
    try {
      const result = await loginUser({
        variables: {email: id, password: pw},
      });
      AsyncStorage.setItem('accessToken', result.data?.loginUser.accessToken);
      setIsLoggedIn(true);
      setAccessToken(result.data?.loginUser.accessToken);
    } catch (error:any) {
      setError(error.message);
    }
  }

  
  // auth().onAuthStateChanged((user) => {
  //     if(user) {
  //     navigation.navigate('SignUp')
  //   }
  // });

  return (
    <View style={styles.WrapperView}>
      <Image
        style={styles.LogoImage}
        source={require('../../../Assets/images/logo.png')}
      />
      <Text style={{color: 'red', margin: 5, fontSize: 15}}>{error}</Text>
      <View>
        <TextInput
          style={styles.LoginInput}
          placeholder="아이디를 입력해주세요."
          onChangeText={text => setId(text)}
        />
        <TextInput
          style={styles.LoginInput}
          secureTextEntry={true}
          placeholder="비밀번호를 입력해주세요."
          onChangeText={text => setPw(text)}
        />
      </View>

      <Pressable style={styles.LoginButton} onPress={onPressLogin}>
        <Text>로그인</Text>
      </Pressable>
      <View>
          <GoogleSigninButton onPress={onGoogleButtonPress} />
      </View>
      <Pressable onPress={() => navigation.navigate('SignUp')}>
        <Text>회원가입</Text>
      </Pressable>
    </View>
  );
}