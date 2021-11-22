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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Profile, LoginButton} from 'react-native-fbsdk-next'

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

export const GlobalContext = React.createContext(null);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [date, setDate]:any = useState(0)
  const [diary, setDiary] = React.useState([]);
  const [infoData, setInfoData]:any = React.useState({})

  let user:any = auth().currentUser

  const value:any = {
    diary,
    infoData,
    user,
    date
  }

  
  let aaa: any = [];

  React.useEffect(() => {
    
    const getData = async() =>
    {email === null 
      ? 
        await firestore()
        .collection('Users')
        .doc(String(user?.uid))
        .collection('Diary')
        .orderBy('date', 'asc')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            aaa.push(doc.data());
          });
          setDiary(aaa.reverse());
        })
      :
        await firestore()
        .collection('Users')
        .doc(String(user?.email))
        .collection('Diary')
        .orderBy('date', 'asc')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            aaa.push(doc.data());
          });
          setDiary(aaa.reverse());
        });
    }
    getData()
  }, [firestore().collection('Users').doc('').collection('Diary').get()]);

  React.useEffect(() => {

    const getData = async() => 
    {user?.email === null
      ?
        await firestore()
          .collection("Users")
          .doc(String(user?.uid))
          .collection('Info')
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
                setInfoData(doc.data());
            });
          })
      :
        await firestore()
          .collection("Users")
          .doc(String(user?.email))
          .collection('Info')
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
                setInfoData(doc.data());
            });
          })
    }
    getData()
  },[firestore().collection("Users").doc(String(user?.email)).collection('Info').get()])

  useEffect(() => {
    SplashScreen.hide();
  }, []);


  const signinDate:any = new Date(user?.metadata.creationTime.slice(0,10))
  const currentDate:any = new Date(new Date().toISOString().slice(0,10))

  React.useEffect(() => {
    setDate((currentDate-signinDate)/(3600000*24))
  },[signinDate])


  auth().onAuthStateChanged((user) => {
    if (user) {
    	setIsLoggedIn(true);
    } else {
    	setIsLoggedIn(false);
    }
  });

    const email = user?.email
    // const arr = firestore().collection('Users').get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //         console.log('aaa',doc.data());
    //     });
    // })

  const client = new ApolloClient({
    uri: 'http://backend03.codebootcamp.co.kr/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <GlobalContext.Provider value={value}>
      <ApolloProvider client={client}>
        {isLoggedIn ? (
          <NavigationContainer>
            <View style={{
              // backgroundColor:'#ffd600',
              flexDirection:'row', 
              justifyContent:'flex-end', 
              alignItems:'center',
              height:50,
              borderBottomColor:'#ffd600',
              borderBottomWidth: 3
            }}>
                <View style={{width: 330, flexDirection: 'row', justifyContent:'space-between', marginBottom: 20}}>
                  <Text style={{position:'absolute', marginLeft: 10, fontSize:18, fontFamily:'Yangjin'}}>다이어트 {date+1}일째</Text>
                  <Text style={{position:'absolute', marginLeft: 200, fontFamily:'Yangjin'}}>{user?.displayName}님 환영합니다!</Text>
                </View>
              <View>
                <Ionicons style={{fontSize: 30, color:'#ffd600', marginLeft: 5, marginRight: 15}} name={'log-out-outline'}  onPress={() => auth().signOut()}/>
              </View>
            </View>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName:any;
      
                  if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Board'){
                    iconName = focused ? 'clipboard' : 'clipboard-outline';
                  } else if (route.name === 'Market'){
                    iconName = focused ? 'cart' : 'cart-outline';
                  } else if (route.name === 'Diary'){
                    iconName = focused ? 'checkbox' : 'checkbox-outline';
                  }

                  return <Ionicons name={iconName} size={size}  color={color}/>;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}
            >
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
    </GlobalContext.Provider>
  );
}
