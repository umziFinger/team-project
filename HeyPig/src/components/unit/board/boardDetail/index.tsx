import {useQuery} from '@apollo/client';
import {useMutation} from '@apollo/react-hooks';
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
import {
  CREATE_BOARD_COMMENT,
  FETCH_BOARD,
  FETCH_BOARD_COMMENTS,
} from '~/components/commons/board.queries';

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
});

export function BoardDetail(props) {
  const {data} = useQuery(FETCH_BOARD, {
    variables: {boardId: props.route.params.boardId},
  });
  const {data: comments} = useQuery(FETCH_BOARD_COMMENTS, {
    variables: {boardId: props.route.params.boardId},
  });
  function when(then) {
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

  const [comment, setComment] = useState('');
  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  function submitComment() {
    if (comment !== '') {
      createBoardComment({
        variables: {
          boardId: props.route.params.boardId,
          createBoardCommentInput: {
            writer: '익명',
            password: '1234',
            contents: comment,
            rating: 5,
          },
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: {boardId: props.route.params.boardId},
          },
        ],
      });
    }
  }

  return (
    <ScrollView>
      <Text style={styles.BoardTitle}>자유게시판</Text>
      <View style={styles.Wrapper}>
        <View style={{marginBottom: 20}}>
          <Text style={styles.Title}>
            {data ? data.fetchBoard.title : 'loading...'}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.Context}>
              익명(글쓴이)
              {/* {data ? data.fetchBoard.title : 'loading...'} */}
            </Text>

            <Text style={styles.Context}>
              {when(data?.fetchBoard?.createdAt)}
            </Text>
          </View>
          {/* <Text style={styles.Context}>
            {data ? data.fetchBoard.createdAt : 'loading...'}
          </Text> */}
          {data &&
            data.fetchBoard.images
              ?.filter((el: string) => el)
              .map((el: string) => (
                <Image
                  style={{width: 300, height: 300}}
                  source={{uri: `https://storage.googleapis.com/${el}`}}
                />
              ))}
          <Text style={styles.Context}>{data && data.fetchBoard.contents}</Text>
        </View>
        <Text style={styles.CommentText}>
          댓글({comments?.fetchBoardComments.length})
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
        {comments?.fetchBoardComments.map((el, index) => (
          <View key={el._id} style={styles.CommentDiv}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>익명{index + 1}</Text>
              <Text>{when(el.createdAt)}</Text>
            </View>

            <Text>{el.contents}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
