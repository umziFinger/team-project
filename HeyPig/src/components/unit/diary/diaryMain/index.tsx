import {gql, useQuery} from '@apollo/client';
import * as React from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Button,
  Pressable,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { GlobalContext } from '~/App';

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      writer
      title
      contents
      images
    }
  }
`;

const styles = StyleSheet.create({
  DiaryTitle: {
    width: 150,
    height: 40,
    marginRight: 250,
    marginTop: 10,
    marginBottom: 10,
  },

  DiaryView: {
    flexDirection: 'row',

    height: 100,
    width: 350,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 3,
  },

  DiaryImage: {
    width:80,
    height:80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },

  ButtonStyle: {
    position: 'absolute',
    backgroundColor: '#ffd600',
    right: 30,
    bottom: 30,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});

export function DiaryMain({navigation}: any) {

  const {diary, user}:any = React.useContext(GlobalContext)

  const email = user?.email

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
      <Image
        style={styles.DiaryTitle}
        source={require('../../../../Assets/images/diary.png')}
      />
      <ScrollView>
        <View>
          {diary.map((el: any, i: number) => (
            <Pressable
              key={i}
              onPress={() => navigation.navigate('DiaryDetail', {el})}>
              <View style={styles.DiaryView}>
                <Image
                  style={styles.DiaryImage}
                  source={el.image ? {uri:`${el.image}`} : {uri:'https://storage.googleapis.com/codecamp-file-storage/2021/10/26/banner4.jpeg'}}
                />
                <View>
                  <Text>제목 : {el.title}</Text>
                  <Text>체중 : {el.weight}kg</Text>
                </View>
                <Text
                  style={{
                    position: 'absolute',
                    fontSize: 16,
                    marginLeft: 280,
                    fontFamily:'Yangjin'
                  }}>
                  {el.date}일차
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Pressable
        style={styles.ButtonStyle}
        onPress={() => navigation.navigate('DiaryWrite')}>
        <Text style={{ fontFamily:'Yangjin'}}>New</Text>
      </Pressable>
    </View>
  );
}
