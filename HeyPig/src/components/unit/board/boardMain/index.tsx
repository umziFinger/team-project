import * as React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  DatePickerIOSBase,
} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {
  FETCH_BOARDS,
  FETCH_BOARDS_OF_THE_BEST,
  FETCH_BOARD_COMMENTS,
} from '~/components/commons/board.queries';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {useState} from 'react';

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
  let tt: any = [];
  const [board, setBoard] = useState([]);
  firestore()
    .collection('Board')
    .orderBy('createdAt', 'desc')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let temp: any = [];
        temp.push(doc.data());
        temp.push({id: doc.id, board: 'Board'});
        tt.push(temp);
      });
      setBoard(tt);
    });
  let t: any = [];
  const [board2, setBoard2] = useState([]);
  firestore()
    .collection('Board2')
    .orderBy('createdAt', 'desc')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let temp: any = [];
        temp.push(doc.data());
        temp.push({id: doc.id, board: 'Board2'});
        t.push(temp);
      });
      setBoard2(t);
    });

  //   const {data, fetchMore, refetch} = useQuery(FETCH_BOARDS);
  //   refetch();
  //   const {data: best, refetch: refetchBest} = useQuery(FETCH_BOARDS_OF_THE_BEST);
  //   refetchBest();
  //   let page = 1;
  //   function onScroll() {
  //     if (!data) return;
  //     page++;

  //     fetchMore({
  //       variables: {
  //         page,
  //       },
  //       updateQuery: (prev, {fetchMoreResult}) => {
  //         return {
  //           fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
  //         };
  //       },
  //     });
  //   }

  //   const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  //     const paddingToBottom = 20;
  //     return (
  //       layoutMeasurement.height + contentOffset.y >=
  //       contentSize.height - paddingToBottom
  //     );
  //   };
  //   function comment(boardId: String) {
  //     const comments = useQuery(FETCH_BOARD_COMMENTS, {
  //       variables: {boardId: String(boardId)},
  //     });
  //     return comments;
  //   }
  return (
    <>
      {/* <Image
        style={styles.DiaryTitle}
        source={require('../../../../Assets/images/Board.png')}
      /> */}
      <ScrollView>
        {/* onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            onScroll();
          }
        }}
        scrollEventThrottle={100}> */}
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
        {/* {best?.fetchBoardsOfTheBest.map(function aa(el: any) {
          //   const comments = comment(el._id);

          return (
            <Pressable
              key={el._id}
              style={styles.BoardView}
              onPress={() =>
                navigation.navigate('BoardDetail', {
                  boardId: el._id,
                })
              }>
              <Text style={styles.BestText}>BEST</Text>
              <Text>{el.title}</Text>
              <Text>{el.likeCount}</Text>
              {/* <Text>{comments}</Text> 
            </Pressable>
          );
        })} */}
        {isAnonymous
          ? board?.map(function aaa(el: any, i: number) {
              return (
                <Pressable
                  key={i}
                  style={styles.BoardView}
                  onPress={() => navigation.navigate('BoardDetail', {el})}>
                  <Text>{el[0].title}</Text>
                </Pressable>
              );
            })
          : board2?.map(function aaa(el: any, i: number) {
              return (
                <Pressable
                  key={i}
                  style={styles.BoardView}
                  onPress={() => navigation.navigate('BoardDetail', {el})}>
                  <Text>{el[0].title}</Text>
                </Pressable>
              );
            })}
      </ScrollView>
      <Pressable
        style={styles.ButtonStyle}
        onPress={() => navigation.navigate('BoardWrite', {isEdit: false})}>
        <Text style={{color: 'white'}}>글쓰기</Text>
      </Pressable>
    </>
  );
}
