import * as React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {Board1Main} from '../Main/Board1';
import {Board2Main} from '../Main/Board2';

const styles = StyleSheet.create({
  BoardView: {
    height: 50,
    width: 380,
    // borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    // elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BestText: {
    color: 'red',
  },
  ButtonStyle: {
    position: 'absolute',
    backgroundColor: '#FF69B4',
    right: 30,
    bottom: 30,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  DiaryTitle: {
    width: 150,
    height: 40,
    marginRight: 250,
    marginTop: 10,
    marginBottom: 10,
  },
});

export function BoardMain({navigation}: any) {
  const [isAnonymous, setisAnonymous] = useState(true);
  const user = auth().currentUser;

  return (
    <>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            margin: 15,
          }}>
          <Text
            style={{color: isAnonymous ? 'hotpink' : 'black'}}
            onPress={() => setisAnonymous(true)}>
            익명게시판
          </Text>
          <Text> | </Text>
          <Text
            style={{color: !isAnonymous ? 'hotpink' : 'black'}}
            onPress={() => setisAnonymous(false)}>
            자랑게시판
          </Text>
        </View>
        {isAnonymous ? (
          <Board1Main navigation={navigation} />
        ) : (
          <Board2Main navigation={navigation} />
        )}
      </ScrollView>
      <Pressable
        style={styles.ButtonStyle}
        onPress={() => navigation.navigate('BoardWrite', {isEdit: false})}>
        <Text style={{color: 'white'}}>글쓰기</Text>
      </Pressable>
    </>
  );
}
