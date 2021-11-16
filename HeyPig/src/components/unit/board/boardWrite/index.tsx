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
    backgroundColor: 'pink',
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
  },
  Button: {
    backgroundColor: 'gray',
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
  },
});

export function BoardWrite({navigation, route}: any) {
  const user = auth().currentUser;

  const writer = user?.email;
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  async function onClickSubmit() {
    if (title !== '' && contents !== '') {
      firestore()
        .collection('Board')
        .add({writer, title, contents, createdAt: new Date()});

      navigation.navigate('BoardMain');
    }
  }
  async function onClickEdit() {
    firestore()
      .collection('Board')
      .doc(route.params.el[1].id)
      .update({title, contents});

    navigation.navigate('BoardDetail', {el: route.params.el});
  }

  if (route.params.isEdit) {
    return (
      <ScrollView style={styles.Wrapper}>
        <Text style={styles.TextSelect}>게시판 선택</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable style={styles.ButtonStyle}>
            <Text style={{color: 'white'}}>익명게시판</Text>
          </Pressable>
        </View>
        <Text style={styles.TextWrite}>글작성</Text>
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

        <Button title="write" onPress={() => onClickEdit()} />
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.Wrapper}>
        <Text style={styles.TextSelect}>게시판 선택</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable style={styles.ButtonStyle}>
            <Text style={{color: 'white'}}>익명게시판</Text>
          </Pressable>
          <Pressable style={styles.Button}>
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
