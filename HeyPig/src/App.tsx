import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Button, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DiaryMain} from './components/unit/diary/diaryMain';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {BoardMain} from './components/unit/board/boardMain';
import {BoardWrite} from './components/unit/board/boardWrite';
import {BoardDetail} from './components/unit/board/boardDetail';
import {MarketMain} from './components/unit/market/marketMain';
import {MarketWrite} from './components/unit/market/marketWrite';
import {MarketDetail} from './components/unit/market/marketDetail';
import {DiaryWrite} from './components/unit/diary/diaryWrite';
import {DiaryDetail} from './components/unit/diary/diaryDetail';
import {LoginScreen} from './components/unit/login';
import {SignUpScreen} from './components/unit/signup';
import {useState, useEffect} from 'react';
import WeightPage from './components/unit/homeScreen/weight';
import GoalPage from './components/unit/homeScreen/goal';
import MealPage from './components/unit/homeScreen/meal';
import HomePage from './components/unit/homeScreen';
import ExercisePage from './components/unit/homeScreen/exercise';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GoalPage"
        component={GoalPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WeightPage"
        component={WeightPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExercisePage"
        component={ExercisePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MealPage"
        component={MealPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function LoginSignup(parentProps: any) {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="Login" options={{headerShown: false}}>
        {props => <LoginScreen {...props} {...parentProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function Board() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BoardMain"
        component={BoardMain}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BoardWrite"
        component={BoardWrite}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BoardDetail"
        component={BoardDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function Market() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MarketMain"
        component={MarketMain}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MarketWrite"
        component={MarketWrite}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MarketDetail"
        component={MarketDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function Diary() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DiaryMain"
        component={DiaryMain}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DiaryWrite"
        component={DiaryWrite}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DiaryDetail"
        component={DiaryDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const user = auth().currentUser;


  auth().onAuthStateChanged((user) => {
    if (user) {

    	setIsLoggedIn(true);
    } else {
    	setIsLoggedIn(false);
    }
  });

    const email = user?.email
    const arr = firestore().collection('Users').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
            console.log('aaa',doc.data());
        });
    })

  const client = new ApolloClient({
    uri: 'http://backend03.codebootcamp.co.kr/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {isLoggedIn ? (
        <NavigationContainer>
          <View style={{
            flexDirection:'row', 
            justifyContent:'flex-end', 
            alignItems:'center',
            marginBottom:5
          }}>
            <Text>{user?.displayName}님 환영합니다!</Text>
            <View>
              <Text style={{
                backgroundColor: '#58ccff', 
                width: 60, 
                height: 30, 
                textAlign: 'center', 
                fontSize: 15, 
                fontWeight:'bold', 
                color:'white', 
                padding:3, 
                borderRadius: 3,
                marginLeft: 5,
                marginRight: 5
              }} onPress={() => auth().signOut()}>Logout</Text>
            </View>
          </View>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="Board"
              component={Board}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="Market"
              component={Market}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="Diary"
              component={Diary}
              options={{headerShown: false}}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <LoginSignup
            setIsLoggedIn={setIsLoggedIn}
            setAccessToken={setAccessToken}
          />
        </NavigationContainer>
      )}
    </ApolloProvider>
  );
}
