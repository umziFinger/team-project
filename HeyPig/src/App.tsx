import * as React from 'react';
import {Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyPageScreen} from './components/unit/diary';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {DiaryDetailScreen} from './components/unit/diaryDetail';
import {BoardMain} from './components/unit/board/boardMain';
import {BoardWrite} from './components/unit/board/boardWrite';
import {BoardDetail} from './components/unit/board/boardDetail';
import {MarketMain} from './components/unit/market/marketMain';
import {MarketWrite} from './components/unit/market/marketWrite';
import {MarketDetail} from './components/unit/market/marketDetail';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
function Board() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BoardMain" component={BoardMain} />
      <Stack.Screen name="BoardWrite" component={BoardWrite} />
      <Stack.Screen name="BoardDetail" component={BoardDetail} />
    </Stack.Navigator>
  );
}

function Market() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MarketMain" component={MarketMain} />
      <Stack.Screen name="MarketWrite" component={MarketWrite} />
      <Stack.Screen name="MarketDetail" component={MarketDetail} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const client = new ApolloClient({
    uri: 'http://backend03.codebootcamp.co.kr/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Board" component={Board} />
          <Tab.Screen name="Market" component={Market} />
          <Tab.Screen name="Diary" component={MyPageScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
