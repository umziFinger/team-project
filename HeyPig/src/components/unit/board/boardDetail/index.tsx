import * as React from 'react';
import {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {BoardComment} from '../boardComment';

const styles = StyleSheet.create({
  Wrapper: {
    margin: 10,
    flex: 1,
  },
  BoardTitle: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'purple',
  },
  Title: {
    fontSize: 30,
    marginBottom: 10,
  },
  Context: {
    fontSize: 20,
    margin: 10,
  },
  CommentText: {
    margin: 10,
  },
  CommentInput: {
    height: 50,
    width: 320,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 5,
  },
  EditButton: {
    width: 40,
    height: 30,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  CommentButton: {
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CommentDiv: {
    margin: 10,
  },
  DeleteCommentButton: {
    width: 40,
    height: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export function BoardDetail({navigation, route}: any) {
  function when(then: any) {
    const now = new Date();
    let date = '방금전';
    if (
      now.getFullYear() - then?.slice(0, 4) > 0 ||
      now.getMonth() - then?.slice(5, 7) >= 0
    ) {
      date = String(then?.slice(0, 10));
      return date;
    } else if (now.getDate() - then?.slice(8, 10) > 0) {
      date = String(now.getDate() - then?.slice(8, 10));
      date += '일전';
      return date;
    } else if (now.getHours() - (then?.slice(11, 13) + 9) > 0) {
      date = String(now.getHours() - (then?.slice(11, 13) + 9));
      date += '시간전';
      return date;
    } else if (now.getMinutes() - then?.slice(14, 16) > 0) {
      date = String(now.getMinutes() - then?.slice(14, 16));
      date += '분전';
      return date;
    }
    return date;
  }

  const user: any = auth().currentUser;
  const [comment, setComment] = useState('');
  function submitComment() {
    if (comment !== '') {
      firestore()
        .collection(route.params.el[1].board)
        .doc(route.params.el[1].id)
        .collection('Comments')
        .add({writer: user?.email, contents: comment, createdAt: new Date()});
    }
  }
  const isWriter = user.email === route.params.el[0].writer;
  function onClickdelete() {
    try {
      firestore()
        .collection(route.params.el[1].board)
        .doc(route.params.el[1].id)
        .delete();
      navigation.navigate('BoardMain');
    } catch (error) {
      console.log(error);
    }
  }

  //   React.useEffect(() => {

  //   }, []);

  //   console.log(comments);

  return (
    <>
      <ScrollView>
        <Text style={styles.BoardTitle}>익명게시판</Text>
        <View style={styles.Wrapper}>
          <View
            style={{
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.Title}>{route.params.el[0].title}</Text>
            {isWriter && (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Pressable
                  style={styles.EditButton}
                  onPress={() =>
                    navigation.navigate('BoardWrite', {
                      isEdit: true,
                      el: route.params.el,
                    })
                  }>
                  <Text>수정</Text>
                </Pressable>
                <Pressable
                  style={styles.EditButton}
                  onPress={() => onClickdelete()}>
                  <Text>삭제</Text>
                </Pressable>
              </View>
            )}
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.Context}>글쓴이</Text>
        </View> */}

          <Text style={styles.Context}>{route.params.el[0].contents}</Text>
          <BoardComment el={route.params.el} />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          right: 10,
          left: 10,
          bottom: 0,
        }}>
        <TextInput
          style={styles.CommentInput}
          placeholder="댓글내용을 입력해주세요"
          onChangeText={text => setComment(text)}
        />
        <Pressable style={styles.CommentButton} onPress={() => submitComment()}>
          <Text>입력</Text>
        </Pressable>
      </View>
    </>
  );
}
