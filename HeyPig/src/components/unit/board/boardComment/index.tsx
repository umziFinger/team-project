import * as React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';

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
export function BoardComment(props: any) {
  const user: any = auth().currentUser;
  const [comment, setComment] = useState('');
  const isWriter = user.email === props.el[0].writer;
  const [comments, setComments] = useState([]);
  let tt: any = [];
  React.useEffect(() => {
    let isComponentMounted = true;
    const fetchData = () => {
      firestore()
        .collection(props.el[1].board)
        .doc(props.el[1].id)
        .collection('Comments')
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const temp: any = [];
            temp.push(doc.data());
            temp.push({id: doc.id});
            tt.push(temp);
          });
          if (isComponentMounted) {
            setComments(tt);
          }
        });
    };
    fetchData();
    return () => {
      isComponentMounted = false;
    };
  }, [
    firestore()
      .collection(props.el[1].board)
      .doc(props.el[1].id)
      .collection('Comments')
      .get(),
  ]);

  function onClickDeleteComment(commentid: any) {
    try {
      firestore()
        .collection(props.el[1].board)
        .doc(props.el[1].id)
        .collection('Comments')
        .doc(commentid)
        .delete();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View>
      <Text style={styles.CommentText}>
        댓글({comments && comments.length})
      </Text>

      {comments?.map((el, index) => (
        <View key={index} style={styles.CommentDiv}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>익명{index + 1}</Text>
            {/* <Text>{el.createdAt}</Text> */}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{el[0].contents}</Text>
            {user.email === el[0].writer && (
              <Pressable
                style={styles.DeleteCommentButton}
                onPress={() => onClickDeleteComment(el[1].id)}>
                <Text style={{fontSize: 15, color: 'white'}}>삭제</Text>
              </Pressable>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
