import * as React from 'react';
import { Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyPageScreen } from './components/unit/diary'
import { BoardScreen } from './components/unit/board';
import { MarketScreen } from './components/unit/market';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Board" component={BoardScreen} />
        <Tab.Screen name="Market" component={MarketScreen} />
        <Tab.Screen name="Diary" component={MyPageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}