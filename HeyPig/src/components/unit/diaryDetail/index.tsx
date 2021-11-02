import {gql, useQuery} from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Image, Text, TextInput, View, ScrollView, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    DiaryView: {
        flexDirection: 'row',

        height: 100, 
        width: 350, 
        borderRadius:10, 
        backgroundColor: "white", 
        margin: 10, 
        justifyContent:'flex-start', 
        alignItems: 'center',
        paddingHorizontal: 30,
        elevation: 3,
    },

    DiaryImage: {
        justifyContent:'center', 
        alignItems:'center',
        marginRight: 30
    }
})

const Stack = createNativeStackNavigator();

export function DiaryDetailScreen() {

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Diary">
                <Stack.Screen name="DiaryDetails" component={DiaryDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
  }