import * as React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
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
});

export function CommentWrite(props: any) {
  const user: any = auth().currentUser;
  const [comment, setComment] = useState('');
  const isWriter = user.email === props.el.writer;
  function submitComment() {
    if (comment !== '') {
      firestore()
        .collection(props.el.board)
        .doc(props.el.id)
        .collection('Comments')
        .add({
          writer: user?.email,
          contents: comment,
          createdAt: new Date(),
        });
    }
  }
  return (
    <>
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
