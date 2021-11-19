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

import {BoardComment} from '../boardComment';
import {CommentWrite} from '../commentWrite';

const styles = StyleSheet.create({
  Wrapper: {
    margin: 10,
    flex: 1,
  },
  BoardTitle: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'purple',
    color: 'white',
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
  EditButton: {
    width: 40,
    height: 30,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
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

export default function BoardDetailUI(props: any) {
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
            <Text style={styles.Title}>{props.el.title}</Text>
            {props.isWriter && (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Pressable
                  style={styles.EditButton}
                  onPress={() =>
                    props.navigation.navigate('BoardWrite', {
                      isEdit: true,
                      el: props.el,
                    })
                  }>
                  <Text>수정</Text>
                </Pressable>
                <Pressable
                  style={styles.EditButton}
                  onPress={() => props.onClickdelete()}>
                  <Text>삭제</Text>
                </Pressable>
              </View>
            )}
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.Context}>글쓴이</Text>
        </View> */}

          <Text style={styles.Context}>{props.el.contents}</Text>
          <BoardComment el={props.el} />
        </View>
      </ScrollView>
      <CommentWrite el={props.el} />
    </>
  );
}
