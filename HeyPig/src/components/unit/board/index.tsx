import * as React from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  BoardView: {
    height: 50,
    width: 380,
    // borderRadius: 10,
    backgroundColor: 'white',
    margin: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    // elevation: 3,
  },

  DiaryImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export function BoardMain({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>익명게시판</Text>
        <Text> | </Text>
        <Text>자랑게시판</Text>
      </View>
      <ScrollView>
        <View>
          <View style={styles.BoardView}>
            <Text>배고파</Text>
          </View>
          <View style={styles.BoardView}>
            <Text>뭐먹지</Text>
          </View>

          {/* {new Array(5).fill(1).map((el, i) => (
            <View key={i} style={styles.BoardView}></View>
          ))} */}
        </View>
      </ScrollView>
      <Button title="작성" onPress={() => navigation.navigate('BoardWrite')} />
    </View>
  );
}

// function BoardWrite() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>작성페이지</Text>
//     </View>
//   );
// }
// const Stack = createNativeStackNavigator();
