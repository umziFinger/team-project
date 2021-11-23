import * as React from 'react';
import {
    Image,
    Text,
    View,
    ScrollView,
    Pressable,
  } from 'react-native';
import {styles} from './diaryMain.styles'

export default function DiaryMainUI(props:any){

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
          <Image
            style={styles.DiaryTitle}
            source={require('../../../../Assets/images/diary.png')}
          />
          <ScrollView>
            <View>
              {props.diary.map((el: any, i: number) => (
                <Pressable
                  key={i}
                  onPress={() => props.navigation.navigate('DiaryDetail', {el})}>
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
            onPress={() => props.navigation.navigate('DiaryWrite')}>
            <Text style={{ fontFamily:'Yangjin'}}>New</Text>
          </Pressable>
        </View>
      );

}
