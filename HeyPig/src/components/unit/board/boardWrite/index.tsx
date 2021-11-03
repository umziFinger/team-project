import {useMutation} from '@apollo/react-hooks';
import * as React from 'react';
import {useState} from 'react';
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import styled from 'styled-components';
import {CREATE_BOARD} from '~/components/commons/board.queries';

const styles = StyleSheet.create({
  Title: {
    height: 100,
    width: 350,
    backgroundColor: 'white',
    margin: 10,
  },
});

export function BoardWrite() {
  const [mywriter, setWriter] = useState('');
  const [mypassword, setPassword] = useState('');
  const [mytitle, setTitle] = useState('');
  const [mycontents, setContents] = useState('');

  const [createBoard] = useMutation(CREATE_BOARD);

  async function onClickSubmit() {
    if (
      mywriter !== '' &&
      mypassword !== '' &&
      mytitle !== '' &&
      mycontents !== ''
    ) {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: mywriter,
            password: mypassword,
            title: mytitle,
            contents: mycontents,
          },
        },
      });
    }
  }

  return (
    <View>
      <Text>writer</Text>
      <TextInput style={styles.Title} onChangeText={text => setWriter(text)} />
      <Text>password</Text>
      <TextInput
        style={styles.Title}
        onChangeText={text => setPassword(text)}
      />
      <Text>title</Text>
      <TextInput style={styles.Title} onChangeText={text => setTitle(text)} />
      <Text>contents</Text>

      <TextInput
        style={styles.Title}
        onChangeText={text => setContents(text)}
      />

      <Button title="write" onPress={() => onClickSubmit()} />
    </View>
  );
}
