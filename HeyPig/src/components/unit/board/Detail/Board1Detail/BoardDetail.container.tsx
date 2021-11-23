import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import BoardDetailUI from './BoardDetail.presenter';
import * as React from 'react';
import {Board2Detail} from '../Board2Detail/Board2Detail';

export function BoardDetailContainer({navigation, route}: any) {
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

  const isWriter = user.email === route.params.el.writer;
  function onClickdelete() {
    try {
      firestore().collection('Board').doc(route.params.el.id).delete();
      navigation.navigate('BoardMain');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BoardDetailUI
      el={route.params.el}
      isWriter={isWriter}
      navigation={navigation}
      onClickdelete={onClickdelete}
      setcomment={setComment}
    />
  );
}
