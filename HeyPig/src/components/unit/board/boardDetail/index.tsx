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
    marginBottom: 10,
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
        .collection('Board')
        .doc(route.params.el.id)
        .collection('Comments')
        .add({writer: user?.email, contents: comment, createdAt: new Date()});
    }
  }
  function onClickdelete() {
    try {
      firestore()
        .collection('Board')
        .doc(route.params.el.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        });
      navigation.navigate('BoardMain');
    } catch (error) {
      console.log(error);
    }
  }

  function onClickDeleteComment() {
    try {
    } catch (error) {
      console.log(error);
    }
  }
  const temp: any = [];
  const [comments, setComments] = React.useState([]);
  const id: any = [];
  React.useEffect(() => {
    firestore()
      .collection('Board')
      .doc(route.params.el.id)
      .collection('Comments')
      .orderBy('createdAt', 'desc')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const a = doc.data();
          a.push(doc.id);
          temp.push(a);
        });
        setComments(temp);
      });
  }, []);
  console.log(comments);

  return (
    <ScrollView>
      <Text style={styles.BoardTitle}>익명게시판</Text>
      <View style={styles.Wrapper}>
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.Title}>
            {route.params.el.title}
            {/* {route ? route.params.el.title : 'loading'} */}
          </Text>
          <Pressable
            style={styles.CommentButton}
            onPress={() => onClickdelete()}>
            <Text>삭제</Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.Context}>익명(글쓴이)</Text>

          {/* <Text style={styles.Context}>{route.params.el.createdAt}</Text> */}

          {/* <Text style={styles.Context}>
            {data ? data.fetchBoard.createdAt : 'loading...'}
          </Text> */}
        </View>
        {/* {data &&
          data.fetchBoard.images
            ?.filter((el: string) => el)
            .map((el: string) => (
              <Image
                style={{width: 300, height: 300}}
                source={{uri: `https://storage.googleapis.com/${el}`}}
              />
            ))} */}
        <Text style={styles.Context}>{route.params.el.contents}</Text>

        <Text style={styles.CommentText}>
          댓글({comments && comments.length})
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            style={styles.CommentInput}
            placeholder="댓글내용을 입력해주세요"
            onChangeText={text => setComment(text)}
          />
          <Pressable
            style={styles.CommentButton}
            onPress={() => submitComment()}>
            <Text>입력</Text>
          </Pressable>
        </View>

        {comments?.map((el, index) => (
          <View key={index} style={styles.CommentDiv}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>익명{index + 1}</Text>
              {/* <Text>{el.createdAt}</Text> */}
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>{el.contents}</Text>
              <Pressable
                style={styles.DeleteCommentButton}
                onPress={() => onClickDeleteComment()}>
                <Text style={{fontSize: 15, color: 'white'}}>삭제</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
