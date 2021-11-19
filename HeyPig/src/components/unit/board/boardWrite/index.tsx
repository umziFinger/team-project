import {useMutation} from '@apollo/react-hooks';
import * as React from 'react';
import {useState} from 'react';
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  TextSelect: {
    marginBottom: 5,
  },
  TextWrite: {
    marginTop: 10,
    marginBottom: 10,
  },
  Wrapper: {
    margin: 10,
    flex: 1,
  },
  Title: {
    height: 50,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 5,
  },
  Contents: {
    height: 300,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    flexShrink: 1,
    textAlignVertical: 'top',
  },
  ButtonStyle: {
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
  },
  Gray: {
    backgroundColor: 'gray',
  },
  Blue: {
    backgroundColor: '#58ccff',
  },
});

export function BoardWrite({navigation, route}: any) {
  const user = auth().currentUser;
  const [isBoard1, setisBoard1] = useState(true);
  const writer = user?.email;
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  async function onClickSubmit() {
    if (title !== '' && contents !== '') {
      let boardNum: any;
      if (isBoard1) {
        boardNum = 'Board';
      } else {
        boardNum = 'Board2';
      }
      firestore()
        .collection(boardNum)
        .add({writer, title, contents, createdAt: new Date()});

      navigation.navigate('BoardMain', {isAnonymous: isBoard1});
    }
  }
  async function onClickEdit() {
    firestore()
      .collection(route.params.el[1].board)
      .doc(route.params.el[1].id)
      .update({title, contents});

    navigation.navigate('BoardDetail', {el: route.params.el});
  }

  if (route.params.isEdit) {
    return (
      <ScrollView style={styles.Wrapper}>
        <Text style={styles.TextWrite}>글 수정하기</Text>
        <TextInput
          style={styles.Title}
          onChangeText={text => setTitle(text)}
          defaultValue={route.params.el[0].title}
        />

        <TextInput
          multiline={true}
          style={styles.Contents}
          onChangeText={text => setContents(text)}
          defaultValue={route.params.el[0].contents}
        />

        <Button title="edit" onPress={() => onClickEdit()} />
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.Wrapper}>
        <Text style={styles.TextSelect}>게시판 선택</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={[styles.ButtonStyle, isBoard1 ? styles.Blue : styles.Gray]}
            onPress={() => setisBoard1(true)}>
            <Text style={{color: 'white'}}>익명게시판</Text>
          </Pressable>
          <Pressable
            style={[styles.ButtonStyle, isBoard1 ? styles.Gray : styles.Blue]}
            onPress={() => setisBoard1(false)}>
            <Text style={{color: 'white'}}>자랑게시판</Text>
          </Pressable>
        </View>
        <Text style={styles.TextWrite}>글작성</Text>
        <TextInput
          style={styles.Title}
          onChangeText={text => setTitle(text)}
          placeholder="제목을 입력해주세요"
        />

        <TextInput
          multiline={true}
          style={styles.Contents}
          onChangeText={text => setContents(text)}
          placeholder="내용을 입력해주세요"
        />

        <Button title="write" onPress={() => onClickSubmit()} />
      </ScrollView>
    );
  }
}
