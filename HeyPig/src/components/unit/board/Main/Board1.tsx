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
});
export function Board1Main(props: any) {
  let temp: any = [];
  const [board, setBoard] = useState([]);
  firestore()
    .collection('Board')
    .orderBy('createdAt', 'desc')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        temp.push({...doc.data(), id: doc.id, board: 'Board'});
      });
      setBoard(temp);
    });
  return (
    <View>
      {board?.map(function aaa(el: any, i: number) {
        return (
          <Pressable
            key={i}
            style={styles.BoardView}
            onPress={() => props.navigation.navigate('BoardDetail', {el})}>
            <Text>{el.title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
