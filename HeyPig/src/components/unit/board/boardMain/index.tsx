import * as React from 'react';
import {Button, Text, View, StyleSheet, ScrollView} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {
  FETCH_BOARDS,
  FETCH_BOARD_COMMENTS,
} from '~/components/commons/board.queries';

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

export function BoardMain({navigation}) {
  const {data} = useQuery(FETCH_BOARDS);
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: 15,
        }}>
        <Text>익명게시판</Text>
        <Text> | </Text>
        <Text>자랑게시판</Text>
      </View>
      <ScrollView>
        {data?.fetchBoards.map(function aaa(el: any) {
          return (
            <View key={el._id} style={styles.BoardView}>
              <Text>{el.title}</Text>
              <Text>{el.likeCount}</Text>
            </View>
          );
        })}
      </ScrollView>
      {/* <Button
        title="detail"
        onPress={() => navigation.navigate('MarketDetail')}
      /> */}
      <Button title="write" onPress={() => navigation.navigate('BoardWrite')} />
    </ScrollView>
  );
}
