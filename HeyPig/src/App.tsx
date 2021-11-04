import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Text, TextInput, View} from 'react-native';
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
import { LoginScreen } from './components/unit/login';
import { SignUpScreen } from './components/unit/signup';
import AsyncStorage from "@react-native-community/async-storage"


function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function LoginSignup(props:any) {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{headerShown: false}}
      />
      <Stack.Screen name="Signup" component={SignUpScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

function Board() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BoardMain" component={BoardMain} options={{headerShown: false}}/>
      <Stack.Screen name="BoardWrite" component={BoardWrite} options={{headerShown: false}}/>
      <Stack.Screen name="BoardDetail" component={BoardDetail} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

function Market() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MarketMain" component={MarketMain} options={{headerShown: false}}/>
      <Stack.Screen name="MarketWrite" component={MarketWrite} options={{headerShown: false}}/>
      <Stack.Screen name="MarketDetail" component={MarketDetail} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

function Diary() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DiaryMain" component={DiaryMain} options={{headerShown: false}}/>
      <Stack.Screen name="DiaryWrite" component={DiaryWrite} options={{headerShown: false}}/>
      <Stack.Screen name="DiaryDetail" component={DiaryDetail} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();



export default function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(true)



  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  const client = new ApolloClient({
    uri: 'http://backend03.codebootcamp.co.kr/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>

      {isLoggedIn ? 
      <NavigationContainer>
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
      :     
      <NavigationContainer>
        <LoginSignup
          setIsLoggedIn={setIsLoggedIn}
        />
      </NavigationContainer>
      }
    </ApolloProvider>
  );
}
