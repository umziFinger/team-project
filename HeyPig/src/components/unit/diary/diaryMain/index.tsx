import {gql, useQuery} from '@apollo/client';
import * as React from 'react';
import { Image, Text, TextInput, View, ScrollView, StyleSheet, Button, Pressable } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

const FETCH_BOARDS = gql`
    query {
        fetchBoards{
            writer
            title
            contents
            images
        }
    }
`

const styles = StyleSheet.create({

    DiaryTitle: {
        width: 150,
        height: 40,
        marginRight: 250,
        marginTop: 10,
        marginBottom: 10
    },

    DiaryView: {
        flexDirection: 'row',

        height: 100, 
        width: 350, 
        borderRadius:10, 
        backgroundColor: "white", 
        margin: 10, 
        justifyContent:'flex-start', 
        alignItems: 'center',
        paddingHorizontal: 30,
        elevation: 3,
    },

    DiaryImage: {
        justifyContent:'center', 
        alignItems:'center',
        marginRight: 30
    },

    ButtonStyle: {
        position: 'absolute',
        backgroundColor: '#58ccff',
        right: 30,
        bottom: 30,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
})



export function DiaryMain({navigation}:any) {

    const [diary, setDiary] = React.useState([])
    let aaa:any = []
    const user = auth().currentUser

    React.useEffect(() => {
        const doc = firestore().collection('Users').doc(String(user?.email)).collection("Diary").orderBy("date","asc").get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    aaa.push(doc.data());
                });
                setDiary(aaa.reverse())
            })
    },[firestore().collection('Users').doc("").collection("Diary").get()])

    return(
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <Image style={styles.DiaryTitle} source={require('../../../../Assets/images/diary.png')}/>
        <ScrollView>
            <View>
                {diary.map((el:any,i:number) => 
                <Pressable key={i} onPress={() => navigation.navigate('DiaryDetail',{el})}>
                    <View style={styles.DiaryView}>
                        <Image style={styles.DiaryImage} source={require('../../../../Assets/images/add.png')} />
                        <View>
                            <Text>제목 : {el.title}</Text>
                            <Text>체중 : {el.weight}</Text>
                        </View>
                        <Text style={{position: 'absolute',fontSize: 18, fontWeight:'bold', marginLeft:280}}>{el.date}일차</Text>
                    </View>
                </Pressable>
                )}
            </View>
        </ScrollView>
        <Pressable
            style={styles.ButtonStyle}
            onPress={() => navigation.navigate('DiaryWrite')}>
            <Text style={{color: 'white', fontWeight: "bold"}}>New</Text>
        </Pressable>
      </View>
    )
  }