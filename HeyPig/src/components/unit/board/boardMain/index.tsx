import * as React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {
  FETCH_BOARDS,
  FETCH_BOARDS_OF_THE_BEST,
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
  BestText: {
    color: 'red',
  },
  ButtonStyle: {
    position: 'absolute',
    backgroundColor: 'hotpink',
    right: 30,
    bottom: 30,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});

export function BoardMain({navigation}) {
  const {data, fetchMore} = useQuery(FETCH_BOARDS);
  const {data: best} = useQuery(FETCH_BOARDS_OF_THE_BEST);
  let page = 1;
  function onScroll() {
    if (!data) return;
    page++;

    fetchMore({
      variables: {
        page,
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <>
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            onScroll();
          }
        }}
        scrollEventThrottle={100}>
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
        {best?.fetchBoardsOfTheBest.map(function aa(el: any) {
          return (
            <View key={el._id} style={styles.BoardView}>
              <Text style={styles.BestText}>BEST</Text>
              <Text>{el.title}</Text>
              <Text>{el.likeCount}</Text>
            </View>
          );
        })}
        {data?.fetchBoards.map(function aaa(el: any) {
          return (
            <View key={el._id} style={styles.BoardView}>
              <Text>{el.title}</Text>
              <Text>{el.likeCount}</Text>
            </View>
          );
        })}
        {/* <Button
        title="detail"
        onPress={() => navigation.navigate('MarketDetail')}
      /> */}
      </ScrollView>
      <Pressable
        style={styles.ButtonStyle}
        onPress={() => navigation.navigate('BoardWrite')}>
        <Text style={{color: 'white'}}>글쓰기</Text>
      </Pressable>
    </>
  );
}
